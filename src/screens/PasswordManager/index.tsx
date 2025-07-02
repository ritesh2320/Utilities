import React from 'react';
import { Text, View } from 'react-native';
import RootView from '../../components/RootView';
import Header from '../../components/Header';

const PasswordManager = () => {
  return (
    <RootView>
      <View>
        <Header title="Password Manager" />
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, color: '#333' }}>
            This is the Password Manager screen.
          </Text>
          <Text style={{ marginTop: 10, color: '#666' }}>
            Here you can manage your passwords securely.
          </Text>
        </View>
      </View>
    </RootView>
  );
};

export default PasswordManager;
