import React, { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from './style';

type Props = {
  onPress: () => void;
  children: ReactNode;
};
const PrimaryButton = ({ onPress, children }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default PrimaryButton;
