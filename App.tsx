import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';

import {AuthProvider} from './src/context/AuthContext';
import QRCodeScannerScreen from './src/screens/QRCodeScannerScreen';
import PaymentReturnScreen from './src/screens/PaymentReturnScreen';

// import PaymentReturnScreen from './src/screens/PaymentReturnScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="QRScan"
            component={QRCodeScannerScreen}
            options={{animation: 'slide_from_right'}}
          />

          <Stack.Screen
            name="PaymentReturn"
            component={PaymentReturnScreen}
            options={{animation: 'slide_from_right'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
