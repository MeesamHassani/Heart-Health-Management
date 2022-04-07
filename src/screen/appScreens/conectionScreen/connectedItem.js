import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

class ConnectedItem extends Component {
  componentDidMount() {
    setInterval(this.LoopFunction, 60000);
  }
  LoopFunction = () => {
    this.props.startNotify(this.props.device);
  };
  render() {
    const {device} = this.props;
    console.log('device:', device);
    const color = device.connected ? '#66c2ff' : '#fff';
    return (
      <View style={[styles.row, {backgroundColor: color}]}>
        <Text
          style={{
            fontSize: 22,
            textAlign: 'center',
            color: '#333333',
            padding: 10,
          }}>
          {device.name}
        </Text>
        {device.connected ? (
          <Text style={{textAlign: 'center'}}>Device: Connected</Text>
        ) : null}
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            color: '#333333',
            padding: 2,
          }}>
          RSSI: {device.rssi}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            color: '#333333',
            padding: 2,
            paddingBottom: 20,
          }}>
          {device.id}
        </Text>
        <View style={{margin: 10}}>
          <Button
            title="Toggle Connection"
            onPress={() => this.props.connectPeripheral(device)}
          />
        </View>
        <View style={{margin: 10}}>
          <Button
            title="Start data Retrieval"
            onPress={() => this.props.startNotify(device)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    margin: 10,
  },
});

export default ConnectedItem;
