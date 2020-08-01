import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import CreateEmploye from './screens/CreateEmploye'
import Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

const myoptions = {
title:"Home",
headerTintcolor:"white",
headerStyle:{
backgroundColor:"#9e3695"
   }
}

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
           <Stack.Screen style={styles.navbar}
           name="Home" 
           component={Home} 
           options={myoptions}/>
           <Stack.Screen 
           name="Create" 
           component={CreateEmploye} 
           options={{...myoptions,title:"Personal info"}}/>
           <Stack.Screen 
           name="Profile" 
           component={Profile}
           options={{...myoptions,title:"Profile"}} />
      </Stack.Navigator>
    </View>
   );
}

export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4c4c4',
  },
  navbar:{
   flex:1,
   marginTop:25
  }
});


