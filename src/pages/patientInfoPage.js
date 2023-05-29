import { useState, useEffect, useContext } from "react";

import PatientAboutPage from "../pre-pages/patientAboutPage";
import PatientHistoryPage from "../pre-pages/patientHistoryPage";

import { PatientInfoContext } from "../contexts/contexts";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Menu, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors } from "../utils/colors";

const PatientInfoPage = ({route, navigation}) => {
    const { 
		currentPatientInfo, 
		currentPatientHistory, 
		setCurrentPatientHistory
	} = useContext(PatientInfoContext);
    
    const { index } = route.params;
    const { 
		id, name, dob, sex, address, contact 
	} = currentPatientInfo[
		JSON.stringify(index)
	];
	
	const history = currentPatientHistory[JSON.stringify(index)];
	
	const goToEdit = () => navigation.navigate('Add New Patient');
	
    const [view, setView] = useState(<PatientHistoryPage 
		history={history} 
		goToEdit={goToEdit}
	/>);

    const [visible, setVisible] = useState(false);
    
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const goToAbout = () => {
        setView(<PatientAboutPage 
			id= {id}
			sex= {sex}
			dob= {dob}
			address= {address}
			contact= {contact}
		/>);
        setVisible(false);
    };

    const goToHistory = () => {
        setView(<PatientHistoryPage history={history} />);
        setVisible(false);
    };

    useEffect(() => {
        navigation.setOptions({ 
            title: name,
            headerRight: () => ( 
                <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                <Button onPress={openMenu}>
                    <MaterialIcons name="more-vert" size={20} color="white" />
                </Button>
                }>
                <Menu.Item onPress={goToAbout} title="About" />
                <Divider />
                <Menu.Item onPress={goToHistory} title="History" />
                </Menu>
            ), })
    }, [visible]);  

    //RENDER
    return (
		<>
			{view}
			<View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.btn} onPress={() => {}}>
                    	<Text>Add</Text>
              	  </TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={null}>
                    	<Text>Delete</Text>
             	   </TouchableOpacity>
            </View>
		</>
	);
};

const styles = StyleSheet.create({
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
    btn: {
    	color: "red",
    	backgroundColor: Colors.hightlight
	}
    
});

export default PatientInfoPage;
