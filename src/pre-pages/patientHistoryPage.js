import { View, ScrollView, Button, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import InfoBox from "../atoms/infoBox";

import { Colors } from "../utils/colors";

const PatientHistoryPage = ({goToEdit, history = []}) => {
	
    const infoBoxes = history.map((info) => {
        return (
            <InfoBox
                key={info.date}
                date={info.date}
                doctor={info.doctor}
                diagnosis={info.diagnosis}
                prescriptions={info.prescriptions}
                bill={info.bill}
                edit={goToEdit}
             />
         )
    });

    return (
    	<ScrollView style={styles.container}>
        	{infoBoxes}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    buttonBox: {
        backgroundColor: Colors.transparent,
        height: 70,
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-around",
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 200
    },
    
});

export default PatientHistoryPage;