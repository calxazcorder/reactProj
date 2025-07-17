  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { NavigationContainer } from '@react-navigation/native';
  import Index from './screens/home';
  import Details from './screens/details';
import { CriteriaResponse } from './types';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    criterias: CriteriaResponse[]; // Still expect array, but handle undefined in navigation
  };
};
  const Stack = createNativeStackNavigator<RootStackParamList>();

  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen name="Home" component={Index} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });