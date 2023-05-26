import { View, ScrollView, Button, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import InfoBox from "../atoms/infoBox";

import { Colors } from "../utils/colors";

const PatientHistoryPage = () => {
    const infos = [
        {
            date: "9-Jun-2020",
            doctor: "Dr Fagbuagun",
            diagnosis: "Tuberculosis",
            prescriptions: "Aspirin",
            bill: "$500"
        },
        {
            date: "9-Jun-2013",
            doctor: "Dr Fagbuagun",
            diagnosis: "Tuberculosis",
            prescriptions: "Aspirin",
            bill: "$500"
        },
        {
            date: "9-Jun-2015",
            doctor: "Dr Fagbuagun",
            diagnosis: "Tuberculosis",
            prescriptions: "Aspirin",
            bill: "$500"
        },
    ];

    const infoBoxes = infos.map((info) => {
        return (
            <InfoBox
                key={info.date}
                date={info.date}
                doctor={info.doctor}
                diagnosis={info.diagnosis}
                prescriptions={info.prescriptions}
                bill={info.bill}
             />
         )
    });

    return (
        <>
            <ScrollView style={styles.container}>
                {infoBoxes}
            </ScrollView>
            <View style={styles.buttonBox}>
                    <Button 
                        title="Add" 
                        color={Colors.highlight}
                    //  onPress={select}
                    />
                    <Button 
                        title="Delete" 
                        color={Colors.ordinary}
                    //  onPress={cancel}
                    />
            </View>
        </>
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