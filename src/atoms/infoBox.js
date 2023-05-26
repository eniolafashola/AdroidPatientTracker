import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../utils/colors";

const InfoBox = ({
    date, 
    doctor, 
    diagnosis, 
    prescriptions, 
    bill
    }) => {
    
    return (
        <View style={styles.container}>
            <Text 
                style={styles.date}
            >{date}</Text>
            <Text 
                style={styles.entities}
            >Doctor : {doctor}</Text>
            <Text 
                style={styles.entities}
            >Diagnosis : {diagnosis}</Text>
            <Text 
                style={styles.entities}
            >Prescriptions : {prescriptions}</Text>
            <Text 
                style={styles.entities}
            >Bill : {bill}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height:"auto",
        width: "98%",
        padding: 10,
        backgroundColor: Colors.transparent,
        alignSelf: 'center',
        margin: 3,
        justifyContent: 'space-around',
        borderColor: Colors.highlight,
        borderWidth: .2,
        borderRadius: 1
    },
    entities: {
        // color: Colors.highlight,
        fontSize: 18,
        marginTop: 10,
    }
  
});


export default InfoBox;
