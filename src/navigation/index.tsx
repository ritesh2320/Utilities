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
import UtilityLanding from '../screens/cropperLanding/UtilityLanding';
import ImageResizer from '../screens/imageResizer';
import Passwordmanager from '../screens/PasswordManager';
import Landing from '../screens/landing';
import List from '../screens/list';
import Add from '../screens/add';
import DocScanner from '../screens/documentScanner';
import Routes from '../utils/constants/routes';
import { AddDetailsScreenRouteProps, RootStackParamList } from '../utils/types';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Landing'} component={UtilityLanding} />
        <Stack.Screen name={'ImageResizer'} component={ImageResizer} />
        <Stack.Screen name={'PasswordManager'} component={Passwordmanager} />
        <Stack.Screen name={'Home'} component={Landing} />
        <Stack.Screen name={'List'} component={List} />
        <Stack.Screen name={'Add'} component={Add} />
        <Stack.Screen name={'Scanner'} component={DocScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
