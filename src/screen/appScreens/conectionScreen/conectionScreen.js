import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ScrollView,
  AppState,
  FlatList,
  Dimensions,
  Button,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';

import {storeHeartRate, getPrediction} from '../../../redux/backEnd/actions';
import ConnectedItem from './connectedItem';

const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class ConnectionScreen extends Component {
  state = {
    scanning: false,
    peripherals: new Map(),
    appState: '',
    heartRate: null,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({showAlert: false, forceLegacy: true});

    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );
    this.handlerDisconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectedPeripheral,
    );
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic,
    );
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then((result) => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then((result) => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  }

  handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({appState: nextAppState});
  };

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  handleDisconnectedPeripheral = (data) => {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
    console.log('Disconnected from ' + data.peripheral);
  };

  handleUpdateValueForCharacteristic = (data) => {
    console.log(
      'Received data from ' +
        data.peripheral +
        ' characteristic ' +
        data.characteristic,
      data.value,
    );
    if (data.value) {
      if (data.value[1] !== 0) {
        this.props.storeHeartRate({heartRate: data.value[1]});
        this.props.getPrediction();
      }
    }
  };

  handleStopScan = () => {
    console.log('Scan is stopped');
    this.setState({scanning: false});
  };

  startScan = () => {
    if (!this.state.scanning) {
      BleManager.scan([], 3, true).then((results) => {
        console.log('Scanning...');
        this.setState({scanning: true});
      });
    }
  };

  retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length === 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      let peripherals = this.state.peripherals;
      for (let i = 0; i < results.length; i++) {
        let peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({peripherals});
      }
    });
  };

  handleDiscoverPeripheral = (peripheral) => {
    let peripherals = this.state.peripherals;
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    } else {
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
  };

  connectPeripheral = (peripheral) => {
    console.log('peripheral:', peripheral);
    if (peripheral) {
      BleManager.connect(peripheral.id)
        .then(() => {
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            this.setState({peripherals});
          }
          console.log('Connected to ' + peripheral.id);

          BleManager.retrieveServices(peripheral.id)
            .then((peripheralInfo) => {
              console.log('PeripheralInfo', peripheralInfo);
            })
            .catch((error) => {
              console.log('error:', error);
            });
        })
        .catch((error) => {
          console.log('Connection error', error);
        });
    }
  };
  startNotify = (item) => {
    console.log('item:', item);
    BleManager.startNotification(item.id, '180D', '2A37')
      .then(() => {
        console.log('notify started');
      })
      .catch((error) => {
        console.log('error notify:', error);
      });
  };

  renderItem = (item) => {
    return (
      <ConnectedItem
        device={item}
        connectPeripheral={this.connectPeripheral}
        startNotify={this.startNotify}
      />
    );
  };

  render() {
    const list = Array.from(this.state.peripherals.values());

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={{margin: 10, alignItems: 'flex-end'}}>
            <ToggleSwitch
              isOn={this.state.scanning}
              onColor="#80ff80"
              offColor="grey"
              label="Scan Device"
              labelStyle={{color: '#FFF', fontWeight: '900'}}
              size="medium"
              onToggle={(isOn) => this.startScan()}
            />
          </View>

          <View style={{margin: 10}}>
            <Button
              title="Retrieve connected peripherals"
              onPress={() => this.retrieveConnected()}
            />
          </View>

          <ScrollView style={styles.scroll}>
            {list.length == 0 && (
              <View style={{flex: 1, margin: 20}}>
                <Text style={{textAlign: 'center', color: '#FFF'}}>
                  No peripherals
                </Text>
              </View>
            )}
            <FlatList
              data={list}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f33',
    width: window.width,
    height: window.height,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#002e4d',
    margin: 10,
  },
  row: {
    margin: 10,
  },
});

export default connect(null, {storeHeartRate, getPrediction})(ConnectionScreen);
