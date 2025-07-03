import React from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './src/navigation';
import Toast, { ToastConfig } from 'react-native-toast-message';
import ConfirmationToast from './src/components/confirmationToast';

function App() {
  const toastConfig: ToastConfig = {
    confirmationToast: ({ text1, props }) => {
      return <ConfirmationToast />;
    },
  };
  return (
    <>
      <Navigator />
      <Toast
        position="bottom"
        visibilityTime={3000}
        type="success"
        bottomOffset={70}
        config={toastConfig}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
