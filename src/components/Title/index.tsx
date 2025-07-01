import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import styles from './style';

type Props = {
  children: ReactNode;
};
const Title = ({ children }: Props) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

export default Title;
