import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
        paddingTop: 100,
		paddingLeft: 30,
		paddingRight: 30,
	},
	link: {
		color: "blue",
		textDecorationLine:'underline',
	},
	flex: {
		flexGrow: 1
	},
	red: {
		color: "red",
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
	select: {
    	borderWidth: 1,
		paddingLeft: 10,
	},
	button: {
		backgroundColor: "black",
		marginTop: 10,
	}
});

export default styles;