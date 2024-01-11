import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import styles from '../style';
import { Dropdown } from 'react-native-element-dropdown';

const Register = ({navigation}) => {
 	const [phone, onChangePhone] = useState('');
 	const [password, onChangePassword] = useState('');

	const [data, setData] = useState([]);
	const [value, setValue] = useState(null);
 
	const getCountries = async () => {
		try {
		  const response = await fetch('http://192.168.1.64:3000/countries');
		  const json = await response.json();
		  setData(json);
		} catch (error) {
		  console.error(error);
		}
	};

	useEffect(() => {
		getCountries();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={[styles.bold]}>Connexion</Text>
			<Text style={[styles.label]}>
				Prénom
				<Text style={[styles.red]}>*</Text>
			</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangePhone}
				value={phone}
			/>
			<Text style={[styles.label]}>
				Nom
				<Text style={[styles.red]}>*</Text>
			</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangePassword}
				value={password}
			/>
			<Text style={[styles.label]}>
				Nationalité
				<Text style={[styles.red]}>*</Text>
			</Text>
			<Dropdown
				style={[styles.input]}
				data={data}
				search
				labelField="name"
				valueField="alpha3"
				placeholder="Choissisez un pays"
				searchPlaceholder="Recherche"
				value={value}
				onChange={item => {
					setValue(item.value);
				}}
			/>
			<Text style={[styles.label]}>Email</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangePassword}
				value={password}
			/>
			<Text style={[styles.label]}>Phone</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangePassword}
				value={password}
			/>
			<Text style={[styles.label]}>
				Mot de passe
				<Text style={[styles.red]}>*</Text>
			</Text>
			<TextInput
				secureTextEntry={true}
				style={[styles.input, styles.label]}
				onChangeText={onChangePassword}
				value={password}
			/>
			<View style={[styles.button]}>
				<Button title="Créer un compte" color="white"/>
			</View>
			<View style={[styles.button]}>
			    <Button
      				title="Retour a la connexion"
					color="white"
      				onPress={() => navigation.navigate('Home')}
    			/>
			</View>
		</View>
	)
};

export default Register;