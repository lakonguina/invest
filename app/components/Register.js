import { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import styles from '../style';
import { Dropdown } from 'react-native-element-dropdown';


const Register = ({navigation}) => {
 	const [firstname, onChangeFirstname] = useState('');
 	const [lastname, onChangeLastname] = useState('');
 	const [country, onChangeCountry] = useState(null);
	const [countries, setCountries] = useState([]);
 	const [email, onChangeEmail] = useState('');
 	const [phone, onChangePhone] = useState('');
 	const [password, onChangePassword] = useState('');

	const [errors, setErrors] = useState({});


	const register = async () => {
		let errorForm = {};

		// Validate name field 
		if (!firstname) {errorForm.firstname = 'Firstname is required';}
		if (!lastname) {errorForm.lastname = 'Lastname is required';}
		if (!country) {errorForm.country = 'Choose a country';}
		if (!password) {errorForm.password = 'Password is required';}
		if (!email && !phone) {errorForm.emailPhone = 'There must be phone or email';}


		console.log("LA")
		if (Object.keys(errorForm).length === 0) {
			console.log("ICI")

			var payload = {
				first_name: firstname,
				last_name: lastname,
				password: password,
				country: {
					alpha3: country,
				},
			};

			if (phone) {
				payload['phone'] = phone
			}

			if (email) {
				payload['email'] = email 
			}
			
			const response = await fetch('http://192.168.1.64:3000/user/register/person', {
				method: 'POST',
				headers: {"content-type": "application/json"},
				body: JSON.stringify(payload),
			})
			.then(response => response.json())
			.then(response => {
				if (response.status == 409) {
					console.error(response["detail"]);
				} else {
					console.log("Account created");
				}
			})
			.catch(error => {
				console.error("Une erreur a eu lieu lors de la création de compte");
			});
		}

		setErrors(errorForm);
	}
 
	const getCountries = async () => {
		try {
		  const response = await fetch('http://192.168.1.64:3000/countries');
		  const json = await response.json();
		  setCountries(json);
		} catch (error) {
		  console.error("Error while fetching countries");
		}
	};

	useEffect(() => {
		getCountries();
	}, []);

	return (
		<ScrollView style={styles.container}>
			<Text style={[styles.bold]}>Créer un compte</Text>
			<Text style={[styles.label]}>
				Prénom
				<Text style={[styles.red]}>*</Text>
			</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangeFirstname}
				value={firstname}
			/>
			{errors.firstname ? <Text style={[styles.red]}>{errors.firstname}</Text> : null}

			<Text style={[styles.label]}>
				Nom
				<Text style={[styles.red]}>*</Text>
			</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangeLastname}
				value={lastname}
			/>
			{errors.lastname ? <Text style={[styles.red]}>{errors.lastname}</Text> : null}

			<Text style={[styles.label]}>
				Nationalité
				<Text style={[styles.red]}>*</Text>
			</Text>
			<Dropdown
				style={[styles.select, styles.label]}
				data={countries}
				search
				labelField="name"
				valueField="alpha3"
				placeholder="Choissisez un pays"
				searchPlaceholder="Recherche"
				value={country}
				onChange={item => {
					onChangeCountry(item.alpha3);
				}}
			/>
			{errors.country? <Text style={[styles.red]}>{errors.country}</Text> : null}

			<Text style={[styles.label]}>Email</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangeEmail}
				value={email}
			/>
			<Text style={[styles.label]}>Phone</Text>
			<TextInput
				style={[styles.input, styles.label]}
				onChangeText={onChangePhone}
				value={phone}
			/>
			{errors.emailPhone? <Text style={[styles.red]}>{errors.emailPhone}</Text> : null}


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
			{errors.password ? <Text style={[styles.red]}>{errors.password}</Text> : null}

			<View style={[styles.button]}>
				<Button
					title="Créer un compte"
					color="white"
					onPress={register}
				/>
			</View>
			<View style={[styles.button]}>
			    <Button
      				title="Retour a la connexion"
					color="white"
      				onPress={() => navigation.navigate('Home')}
    			/>
			</View>
		</ScrollView>
	)
};

export default Register;