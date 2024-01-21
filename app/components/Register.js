import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../style';
import { Dropdown } from 'react-native-element-dropdown';

import KeyboardView from './KeyboardView';

import { Formik } from 'formik';
import FormikInput from './FormikInput';
import * as Yup from 'yup';
import { storeData } from './storage';
 
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const RegisterSchema = Yup.object().shape({
  firstname: Yup.string()
	.min(2, 'Too Short!')
	.max(50, 'Too Long!')
	.required('Required'),
  lastname: Yup.string()
	.min(2, 'Too Short!')
	.max(50, 'Too Long!')
	.required('Required'),
  phone: Yup.string().matches(phoneRegExp, 'Invalid phone number'),
  country: Yup.string().required('Required'),
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});


const Register = ({navigation}) => {
	const [countries, setCountries] = useState([]);

	const register = async (values) => {
		var payload = {
			first_name: values.firstname,
			last_name: values.lastname,
			password: values.password,
			phone: values.phone,
			country: {
				alpha3: values.country,
			},
		};

		await fetch('http://192.168.1.64:3000/user/register/person', {
			method: 'POST',
			headers: {"content-type": "application/json"},
			body: JSON.stringify(payload),
		})
		.then(response => response.json())
		.then(response => {
			if (response.status == 409) {
				console.error(response["detail"]);
			} else {
				storeData("accessToken", response.access_token);
				navigation.navigate('Address');
			}
		})
		.catch(error => {
			console.error(error);
		});
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
		<KeyboardView>
			<View style={[styles.container]}>
				<Text style={[styles.bold]}>Créer un compte</Text>
				<Formik
					initialValues={{
						firstname: '',
						lastname: '',
						phone: '',
						country: '',
						password: '',
						passwordConfirmation: '',
					}}
					onSubmit={values => register(values)}
					validationSchema={RegisterSchema}
				>
					{({ handleChange, setFieldTouched, setFieldValue, handleSubmit, values, errors, touched}) => (
						<View>
							<FormikInput
								label="Prénom"
								value={values.firstname}
								name="firstname"
								handleChange={handleChange('firstname')}
								setFieldTouched={() => setFieldTouched('firstname')}
								errors={errors}
								touched={touched}
							/>
							<FormikInput
								label="Nom"
								value={values.lastname}
								name="lastname" handleChange={handleChange('lastname')}
								setFieldTouched={() => setFieldTouched('lastname')}
								errors={errors}
								touched={touched}
							/>
							<FormikInput
								label="Téléphone"
								value={values.phone}
								name="phone" handleChange={handleChange('phone')}
								setFieldTouched={() => setFieldTouched('phone')}
								errors={errors}
								touched={touched}
							/>
							<Text style={[styles.label]}>Nationalité</Text>
							<Dropdown
								style={[styles.select, styles.label]}
								data={countries}
								search
								labelField="name"
								valueField="alpha3"
								placeholder="Choissisez un pays"
								searchPlaceholder="Recherche"
								value={values.country}
								onChange={item => {
									setFieldValue('country', item.alpha3)
								}}
							/>
            				{touched.country && errors.country && <Text style={{ fontSize: 10, color: 'red' }}>{errors.country}</Text>}
							<FormikInput
								label="Mot de passe"
								value={values.password}
								name="password"
								handleChange={handleChange('password')}
								setFieldTouched={() => setFieldTouched('password')}
								errors={errors}
								touched={touched}
							/>
							<FormikInput
								label="Confirmé le mot de passe"
								value={values.passwordConfirmation}
								name="passwordConfirmation"
								handleChange={handleChange('passwordConfirmation')}
								setFieldTouched={() => setFieldTouched('passwordConfirmation')}
								errors={errors}
								touched={touched}
							/>
							<View style={[styles.button]}>
								<Button onPress={handleSubmit} title="Créer un compte" color="white"/>
							</View>
						</View>
					)}
   				</Formik>
				<View style={[styles.label]}>
					<Text
						style={[styles.link]} 
						onPress={() => navigation.navigate("Home")}
					>
						Retour a la page de connexion
					</Text>
				</View>
			</View>
		</KeyboardView>
	)
};

export default Register;