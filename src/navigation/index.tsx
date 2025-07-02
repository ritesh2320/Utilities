// import { createStaticNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ImageResizer from '../screens/imageResizer/ImageResize';
// import Landing from '../screens/landing/UtilityLanding';

// const RootStack = createNativeStackNavigator({
//   screens: {
//     Landing: {
//       screen: Landing,

//       options: {
//         title: 'Awesome app',
//       },
//     },
//     ImageResizer: ImageResizer,
//   },
// });

// const Navigation = createStaticNavigation(RootStack);

// export default Navigation;

import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import * as React from 'react';
import Landing from '../screens/landing/UtilityLanding';
import ImageResizer from '../screens/imageResizer';
import Passwordmanager from '../screens/PasswordManager';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Landing'} component={Landing} />
        <Stack.Screen name={'ImageResizer'} component={ImageResizer} />
        <Stack.Screen name={'PasswordManager'} component={Passwordmanager} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
