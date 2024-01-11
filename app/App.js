import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {
 	const [phone, onChangePhone] = React.useState('');
 	const [password, onChangePassword] = React.useState('');

	return (
		<View style={styles.container}>
			<Text style={[styles.bold]}>Connexion</Text>
			<Text style={[styles.label]}>Phone</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangePhone}
				value={phone}
			/>
			<Text style={[styles.label]}>Password</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangePassword}
				value={password}
			/>
			<View style={[styles.button]}>
				<Button title="Se connecter" color="white"/>
			</View>
			<View style={[styles.button]}>
				<Button title="Continuer avec l'adresse email" color="white"/>
			</View>
			<View style={[styles.button]}>
			    <Button
      				title="Créer un compte"
					color="white"
      				onPress={() => navigation.navigate('Register')}
    			/>
			</View>
			<StatusBar style="auto"/>
		</View>
	);
}

const Register = ({navigation}) => {
  return <Text>This is my profile</Text>;
};

const App = () => {
  return (
    <NavigationContainer>
    	<Stack.Navigator>
        	<Stack.Screen
          		name="Home"
          		component={Home}
          		options={{title: 'Welcome'}}
        	/>
			<Stack.Screen name="Register" component={Register} />
		</Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
	container: {
        paddingTop: 200,
		paddingLeft: 30,
		paddingRight: 30,
	},
	label: {
        marginTop: 10,
	},
	bold: {
		fontWeight: "bold",
	},
	input: {
    	borderWidth: 1,
		padding: 10,
	},
	button: {
		backgroundColor: "black",
		marginTop: 10,
	}
});

export default App;
