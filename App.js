import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import HomePage from './src/pages/homePage';
import PatientInfoPage from './src/pages/patientInfoPage';
import AddPatient from "./src/pages/addPatient";

import { PaperProvider } from 'react-native-paper';
import { Colors } from "./src/utils/colors";

import { PopUpProvider, PatientInfoProvider } from './src/contexts/contexts';


const Stack = createStackNavigator();

const App = () => {

  return (
      <PopUpProvider>
        <PatientInfoProvider>
          <NavigationContainer>
            <PaperProvider>
              <Stack.Navigator
                screenOptions={{
                  headerMode: 'screen',
                  headerTintColor: 'white',
                  headerStyle: { backgroundColor: Colors.highlight },
                  }}
              >
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen 
                  name="Patient Info" 
                  component={PatientInfoPage}
                />
                <Stack.Screen 
                  name="Add New Patient" 
                  component={AddPatient} 
                />
              </Stack.Navigator>
            </PaperProvider>
          </NavigationContainer>
          <ExpoStatusBar style='hidden' />
        </PatientInfoProvider>
      </PopUpProvider>
  );
}

export default App;
