import React from 'react';
import {
    Pressable as NativePressable,
    PressableProps,
    StyleProp,
    ViewStyle
} from 'react-native';
import colors from '../../utils/colors';
interface Props extends PressableProps {
    useSafeArea?: boolean;
    children?: any;
    style?: StyleProp<ViewStyle>;
}
const Pressable = (props: Props) => {
    return (
        <NativePressable
            {...props}
            android_ripple={{
                color: colors.ripple,
                foreground: false
            }}
        />
    );
};
export default Pressable;
