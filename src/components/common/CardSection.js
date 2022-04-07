import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children, style}) => {
  return (
    <View style={[styles.containerStyle, style]}>
      {children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#000',
    position: 'relative'
  }
};

export { CardSection };
