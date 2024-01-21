import { View, ScrollView, Text, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../style';
import { Camera, CameraType } from 'expo-camera';


const Document = ({ navigation }) => {
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [type, setType] = useState(CameraType.front);
	const [selfie, setSelfie] = useState(false);

	const launchCamera = async() => {
		if (!permission.granted) {
			await requestPermission();
		} else {
			setSelfie(true);
		}
	}

	if (!selfie) {
		return (
			<View style={[styles.container]}>
				<TouchableOpacity onPress={launchCamera}>
					<Text style={[styles.link, styles.label]}>
						Demande la permission
					</Text>
				</TouchableOpacity>
			</View>
		);
	} else {
		return (
			<View style={{ flex: 1 }}>
				<Camera style={{ flex: 1 }} type={type}>
					<View
						style={{
							position: 'absolute',
							bottom: 0,
							flexDirection: 'row',
							flex: 1,
							width: '100%',
							padding: 20,
							justifyContent: 'space-between'
						}}
					>
						<View
							style={{
								alignSelf: 'center',
								flex: 1,
								alignItems: 'center'
							}}
						>
							<TouchableOpacity
								style={{
									width: 70,
									height: 70,
									bottom: 0,
									borderRadius: 50,
									backgroundColor: '#fff'
								}}
							/>
						</View>
    				</View>
				</Camera>
			</View>
		);
	}
}

export default Document;
