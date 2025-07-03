import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Text, View } from 'react-native';
import Pressable from '../../components/pressable';
import RootView from '../../components/RootView';
import { askForAuthentication } from '../../utils/biometricsHelper';
import { initializeMMKV } from '../../utils/storageHelper';
import styles from './style';
import Routes from '../../utils/constants/routes';
import Header from '../../components/Header';
import { translate } from '../../assets';
import { isEmulator } from 'react-native-device-info';
/* import { ComponentProps } from '../../utils/types'; */

const Landing = (/* props: ComponentProps */) => {
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const authState = useRef<boolean | undefined>(undefined);

  const updateIsAuthStatus = async (status: boolean) => {
    let emulator = await isEmulator();
    if (emulator) {
      authState.current = true;
    }
    authState.current = status;
  };

  const checkForAndroidBioMetrics = async (onStateChange: boolean = false) => {
    try {
      const isSuccess = await askForAuthentication();
      if (isSuccess) {
        updateIsAuthStatus(true);
      } else {
        updateIsAuthStatus(false);
        if (onStateChange) {
          // navigation?.popToTop();
        }
      }
    } catch (err) {
      updateIsAuthStatus(false);
      if (onStateChange) {
        // navigation?.popToTop();
      }
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      checkForAndroidBioMetrics(true);
    }

    if (
      nextAppState.match(/inactive|background/) &&
      appState.current === 'active'
    ) {
      authState.current = false;
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    initializeMMKV();
    checkForAndroidBioMetrics();

    const onChangeListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      onChangeListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLongPressHandle = () => {
    if (authState.current) {
      navigation.navigate(Routes.List);
    } else {
      checkForAndroidBioMetrics();
    }
  };

  return (
    <RootView>
      <Header title={translate('welcome')} showBack={false} />
      <View style={styles.container}>
        <Pressable
          style={styles.container}
          onLongPress={onLongPressHandle}
          delayLongPress={2000}
          onPress={() => navigation?.navigate(Routes.Scan)}
        >
          <Text style={styles.headingText}>Sample text</Text>
        </Pressable>
      </View>
    </RootView>
  );
};

export default Landing;
