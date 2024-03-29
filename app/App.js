import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './components/Home';
import Register from './components/Register';
import Address from './components/Address';
import Document from './components/Document';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    	<Stack.Navigator
			screenOptions={{
				headerShown: false
  			}}
		>
        	<Stack.Screen name="Home" component={Home}/>
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Address" component={Address} />
			<Stack.Screen name="Document" component={Document} />
		</Stack.Navigator>
		<StatusBar style="auto"/>
    </NavigationContainer>
  );
};


export default App;
