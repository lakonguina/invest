import { useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import styles from '../style';
import { getData } from './storage';
import KeyboardView from './KeyboardView';

import FormikInput from './FormikInput';
import { Formik } from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const LoginSchema = Yup.object().shape({
	phone: Yup.string().matches(phoneRegExp, 'Invalid phone number'),
	password: Yup.string().required('Password is required'),
});

const Home = ({ navigation }) => {
	const checkAccessToken = async () => {
		const accessToken = await getData("accessToken");

		if (accessToken) {
			console.log("Check access token", accessToken);
			const bearer = `Bearer ${accessToken}`;

            fetch("http://192.168.1.64:3000/user/information", {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": bearer,
                },
            })

			.then(response => response.json())
			.then(response => {
				console.log(response);
				if (response.status.slug == "waiting-for-address") {
					console.log(response)
					navigation.navigate('Address');
				} else if (response.status.slug == "waiting-for-document") {
					console.log(response)
					navigation.navigate('Document');
				}
			})
			.catch(error => {
				console.error(error);
			});

		} else {
			console.log("There is no access token")
		}
	}

	useEffect(() => {
		checkAccessToken();
	}, []);

	return (
		<KeyboardView>
			<View style={[styles.container]}>
				<Formik
					initialValues={{
						phone: '',
						password: '',
					}}
					onSubmit={values => register(values)}
					validationSchema={LoginSchema}
				>
					{({ handleChange, setFieldTouched, handleSubmit, values, errors, touched}) => (
						<View>
							<FormikInput
								label="Téléphone"
								value={values.phone}
								name="phone" handleChange={handleChange('phone')}
								setFieldTouched={() => setFieldTouched('phone')}
								errors={errors}
								touched={touched}
							/>
							<FormikInput
								label="Mot de passe"
								value={values.password}
								name="password"
								handleChange={handleChange('password')}
								setFieldTouched={() => setFieldTouched('password')}
								errors={errors}
								touched={touched}
							/>
							<View style={[styles.button]}>
								<Button onPress={handleSubmit} title="Se connecter" color="white"/>
							</View>
						</View>
					)}
   				</Formik>
				<View style={[styles.label]}>
					<Text
						style={[styles.link]} 
						onPress={() => navigation.navigate("Register")}
					>
						S'inscrire
					</Text>
				</View>
			</View>
		</KeyboardView>
	);
}

export default Home;