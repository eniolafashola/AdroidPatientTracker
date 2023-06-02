import { View, Text, Button, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

const PatientAboutPage = ({about}) => {

    return (
    	<View style={styles.container}>
        	<Text style={styles.entities}>Patient Id: {about.id}</Text>
            <Text style={styles.entities}>Sex: {about.sex}</Text>
            <Text style={styles.entities}>Date Of Birth: {about.dob}</Text>
            <Text style={styles.entities}>Address: {about.address}</Text>
            <Text style={styles.entities}>Contact: {about.contact}</Text>
     	</View>
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