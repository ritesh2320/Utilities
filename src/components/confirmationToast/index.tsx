import React from 'react';
import { PressableProps, StyleProp, Text, View, ViewStyle } from 'react-native';
import { translate } from '../../assets';
import BackArrow from '../../assets/images/ic_back_arrow.svg';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import Pressable from '../pressable';
import colors from '../../utils/colors';
export interface AppControlInterface extends PressableProps {
  title: string;
  icon: React.ReactNode;
}
interface Props {
  showBack?: boolean;
  onBackPress?: () => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
  rightSideButtons?: AppControlInterface[];
}
const ConfirmationToast = ({
  title,
  showBack = true,
  onBackPress,
  rightSideButtons,
  ...rest
}: Props) => {
  // const navigation = useNavigation();
  // const handleBack = () => {
  //     if (onBackPress) {
  //         onBackPress();
  //     } else {
  //         navigation?.goBack();
  //     }
  // };

  return (
    <View style={styles.container}>
      <Text>Delete?</Text>
      <Text>Are you sire you want to delete?</Text>
      <Pressable>
        <Text>Cancel</Text>
      </Pressable>
      <Pressable>
        <Text>Yes</Text>
      </Pressable>
    </View>
  );
};
export default ConfirmationToast;
