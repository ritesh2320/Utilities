import React, { Children } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

const Title = ({ children }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 10,
    borderWidth: 4,
    borderColor: '#254D70',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#254D70',
    textAlign: 'center',
  },
});
