import { View, Text, Button, StyleSheet } from "react-native";
import { Colors } from "../utils/colors";

const PatientAboutPage = () => {

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.entities}>Patient Id: 30568</Text>
                <Text style={styles.entities}>Sex: Male</Text>
                <Text style={styles.entities}>Date Of Birth: 20-Jan-1998</Text>
                <Text style={styles.entities}>Address: 30 Ajiowo, Akute, Nigeria</Text>
                <Text style={styles.entities}>Contact: 08052459024</Text>
            </View>
            <View style={styles.buttonBox}>
                    <Button 
                        title="Edit" 
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
        marginTop: 10,
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

export default PatientAboutPage;