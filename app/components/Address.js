import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../style';
import { Dropdown } from 'react-native-element-dropdown';

import KeyboardView from './KeyboardView';

import { Formik } from 'formik';
import FormikInput from './FormikInput';
import * as Yup from 'yup';
import { getData } from './storage';
 

const AddressSchema = Yup.object().shape({
  street: Yup.string()
	.min(2, 'Too Short!')
	.max(50, 'Too Long!')
	.required('Required'),
  city: Yup.string()
	.min(2, 'Too Short!')
	.max(50, 'Too Long!')
	.required('Required'),
  zipCode: Yup.string()
	.min(2, 'Too Short!')
	.max(50, 'Too Long!')
	.required('Required'),
  country: Yup.string().required('Required'),
});


const Address = ({navigation}) => {
	const [countries, setCountries] = useState([]);

	const register = async (values) => {
		const accessToken = await getData("accessToken");
		const bearer = `Bearer ${accessToken}`;

		var payload = {
			city: values.city,
			street: values.street,
			zip_code: values.zipCode,
			alpha3: values.country,
		};

		await fetch('http://192.168.1.64:3000/user/register/address', {
			method: 'POST',
			headers: {
				"content-type": "application/json",
                "authorization": bearer,
			},
			body: JSON.stringify(payload),
		})
		.then(response => {
			if (response.status == 200) {
				navigation.navigate('Document');
			} else {
				console.error("An error occured during request");
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
			console.log(error);
			console.error("Error while fetching countries");
		}
	};

	useEffect(() => {
		getCountries();
	}, []);

	return (
		<KeyboardView>
			<View style={[styles.container]}>
				<Text style={[styles.bold]}>Addresse</Text>
				<Formik
					initialValues={{
						city: '',
						street: '',
						zipCode: '',
						country: '',
					}}
					onSubmit={values => register(values)}
					validationSchema={AddressSchema}
				>
					{({ handleChange, setFieldTouched, setFieldValue, handleSubmit, values, errors, touched}) => (
						<View>
							<FormikInput
								label="Rue"
								value={values.street}
								name="street" handleChange={handleChange('street')}
								setFieldTouched={() => setFieldTouched('street')}
								errors={errors}
								touched={touched}
							/>
							<FormikInput
								label="Ville"
								value={values.city}
								name="city"
								handleChange={handleChange('city')}
								setFieldTouched={() => setFieldTouched('city')}
								errors={errors}
								touched={touched}
							/>
							<FormikInput
								label="Code postal"
								value={values.zipCode}
								name="zipCode" handleChange={handleChange('zipCode')}
								setFieldTouched={() => setFieldTouched('zipCode')}
								errors={errors}
								touched={touched}
							/>
							<Text style={[styles.label]}>Pays</Text>
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
							<View style={[styles.button]}>
								<Button onPress={handleSubmit} title="Submit" color="white"/>
							</View>
						</View>
					)}
   				</Formik>
				<Text
					style={[styles.link, styles.label]} 
					onPress={() => navigation.navigate("Home")}
				>
					Retour a la page de connexion
				</Text>
			</View>
		</KeyboardView>
	)
};

export default Address;