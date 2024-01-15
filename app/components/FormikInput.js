import {
    View,
    TextInput,
    Text,
} from "react-native";

import styles from '../style';

const FormikInput = ({label, value, name, handleChange, setFieldTouched, errors, touched}) => {
    return (
        <View>
            <Text style={[styles.label]}>
                {label}
                <Text style={[styles.red]}>*</Text>
            </Text>
            <TextInput
                style={[styles.input, styles.label]}
                onChangeText={handleChange}
                onBlur={setFieldTouched}
                value={value}
            />
            {touched[name] && errors[name] && <Text style={{ fontSize: 10, color: 'red' }}>{errors[name]}</Text>}
        </View>
    )
}

export default FormikInput;