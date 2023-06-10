import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

const PatientAboutPage = ({patient, goToEditAbout}) => {
    return (
    	<TouchableOpacity 
			style={styles.container} 
			onPress={goToEditAbout}
		>
        	<Text style={styles.entities}>Patient Id: {patient.id}</Text>
            <Text style={styles.entities}>Sex: {patient.sex}</Text>
            <Text style={styles.entities}>Date Of Birth: {patient.dob}</Text>
            <Text style={styles.entities}>Address: {patient.address}</Text>
            <Text style={styles.entities}>Contact: {patient.contact}</Text>
     	</TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: "auto",
        width: "98%",
        padding: 10,
        backgroundColor: Colors.transparent,
        alignSelf: 'center',
        margin: 3,
        borderColor: Colors.highlight,
        borderWidth: .2,
        borderRadius: 1
    },
    entities: {
        // color: Colors.highlight,
        fontSize: 18,
        margin: 5,
    },
});

export default PatientAboutPage;