import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DetailScreen from './src/components/DetailScreen';
import Search from './src/components/SearchScreen';
import Footer from './src/components/Footer';
import styles from './assets/styles';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.androidSafeArea}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Search" component={Search}/>
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
        <Footer/>
      </NavigationContainer>
    </View>
  );
};  
