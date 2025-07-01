import React from 'react';
import { StatusBar, StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import colors from '../../utils/colors';
import styles from './style';
interface Props {
  useSafeArea?: boolean;
  children?: any;
  style?: StyleProp<ViewStyle>;
}
const RootView = ({ useSafeArea = true, children, style }: Props) => {
  if (useSafeArea) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          // { backgroundColor: colors.background },
          style,
        ]}
      >
        <StatusBar
          translucent={false}
          barStyle={'light-content'}
          // backgroundColor={colors.background}
        />
        {children}
      </SafeAreaView>
    );
  } else {
    return (
      <View style={[styles.container, style]}>
        <StatusBar
          barStyle={'light-content'}
          //   backgroundColor={colors.background}
        />
        {children}
      </View>
    );
  }
};
export default RootView;
