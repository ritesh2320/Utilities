import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
// import { translate } from '../../assets';
// import BackArrow from '../../assets/images/ic_back_arrow.svg';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
// import Pressable from '../pressable';
// import colors from '../../utils/colors';
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
const Header = ({
  title,
  showBack = true,
  onBackPress,
  rightSideButtons,
  ...rest
}: Props) => {
  const navigation = useNavigation();
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation?.goBack();
    }
  };
  const renderPlaceholderButtonView = () => {
    return <View style={styles.placeholderView} />;
  };
  const renderRHSAppControlls = () => {
    return (
      <View style={styles.placeholderView}>
        {rightSideButtons &&
          rightSideButtons?.length > 0 &&
          rightSideButtons?.slice(0, 3)?.map((item, index) => {
            return (
              <Pressable
                key={`${item?.title}+${index}`}
                style={styles.appControls}
                onPress={item?.onPress}
                accessible
                accessibilityRole="button"
                accessibilityLabel={item?.title}
              >
                {item?.icon}
              </Pressable>
            );
          })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable style={styles.backBtn} onPress={handleBack}>
          {/* <BackArrow width={32} height={32} color={colors.text} /> */}
          <Text>{' < '}</Text>
        </Pressable>
      ) : (
        renderPlaceholderButtonView()
      )}
      {title?.length ? <Text style={styles.headerTitle}>{title}</Text> : null}
      {rightSideButtons?.length
        ? renderRHSAppControlls()
        : renderPlaceholderButtonView()}
    </View>
  );
};
export default Header;
