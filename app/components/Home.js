import {useState, useEffect} from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import styles from '../style';
import { getData } from './storage';

const Home = ({ navigation }) => {
 	const [phone, onChangePhone] = useState('');
 	const [password, onChangePassword] = useState('');

	const checkAccessToken = async () => {
		const accessToken = await getData("accessToken");
		console.log("Check access token", accessToken);
	}

	useEffect(() => {
		checkAccessToken();
	}, []);

	return (
		<ScrollView style={styles.container}>
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
		</ScrollView>
	);
}

export default Home;