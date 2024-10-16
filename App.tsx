/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Frontpage from './front';
import Mainpage from './mainpage';
import Locksrn from './lock';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Trophy from './trophy';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <>
      {/* <Frontpage></Frontpage> */}
      {/* <Mainpage></Mainpage> */}
      {/* <Locksrn></Locksrn> */}

      <NavigationContainer>
        <Stack.Navigator initialRouteName='home'>
          <Stack.Screen name="home" component={Mainpage}  options={{ headerShown: false }}/>
          <Stack.Screen name="puzzlepage" component={Frontpage}  />
          <Stack.Screen name='trophypage' component={Trophy}/>
          <Stack.Screen name="level" component={Locksrn} />
        </Stack.Navigator>
      </NavigationContainer>
      

    </>
  )

}
export default App;