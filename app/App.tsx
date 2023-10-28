import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Slider from './components/Slider';
import FilePicker from './components/FilePicker';
import HomeScreen from './screens/HomeScreen';
import ControlScreen from './screens/ControlScreen';
import PredictionScreen from './screens/PredictionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName='Home'
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Control' component={ControlScreen} />
        <Stack.Screen name='Prediction' component={PredictionScreen} />
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
