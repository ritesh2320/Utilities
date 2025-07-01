import React, { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';
import styles from './style';
type Props = {
  onPress: () => void;
  children: ReactNode;
};
const Card = ({ children, onPress }: Props) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        console.log('\n\n onPress');
        onPress();
      }}
    >
      <Text style={styles.cardText}>{children}</Text>
    </Pressable>
  );
};

export default Card;
