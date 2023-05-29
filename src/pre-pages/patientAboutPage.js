import { View, Text, Button, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

const PatientAboutPage = ({id, sex, dob, address, contact}) => {

    return (
    	<View style={styles.container}>
        	<Text style={styles.entities}>Patient Id: {id}</Text>
            <Text style={styles.entities}>Sex: {sex}</Text>
            <Text style={styles.entities}>Date Of Birth: {dob}</Text>
            <Text style={styles.entities}>Address: {address}</Text>
            <Text style={styles.entities}>Contact: {contact}</Text>
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