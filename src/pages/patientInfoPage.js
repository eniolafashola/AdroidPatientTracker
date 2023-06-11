import { useState, useEffect, useContext } from "react";

import PatientAboutPage from "../pre-pages/patientAboutPage";
import PatientHistoryPage from "../pre-pages/patientHistoryPage";

import PopUpPage from "./popUpPage";

import { PopUpContext, PatientInfoContext } from "../contexts/contexts";
import { 
	View, 
	TouchableOpacity, 
	Text, 
	Alert, 
	StyleSheet 
} from "react-native";
import { Button, Menu, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors } from "../utils/colors";

const PatientInfoPage = ({route, navigation}, a=[], b=[]) => {
	const [ toShift, setToShift ] = useState(false);
  const { 
		currentPatientInfo, 
		setCurrentPatientInfo,
	} = useContext(PatientInfoContext);
  const { currentPopUp, setCurrentPopUp } = useContext(PopUpContext);
  
  const { index , edited } = route.params;
  const patient = currentPatientInfo[JSON.stringify(index)];
	const history = currentPatientInfo[JSON.stringify(index)]  === undefined
		? [] : currentPatientInfo[JSON.stringify(index)].history;
	
	const goToEdit = (key) => {
		navigation.navigate('Edit Patient Info', {
     	 index,
     	 key,
     	 lastEdited: !edited ? false : true
		});
	}
	
	const goToEditAbout = () => {
		navigation.navigate('Edit About', {
     	 index,
		});
	}
	
    const [view, setView] = useState(<PatientHistoryPage 
		history={history} 
		goToEdit={goToEdit}
	/>);

    const [visible, setVisible] = useState(false);
    
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const goToAbout = () => {
        setView(<PatientAboutPage 
			goToEditAbout={goToEditAbout} 
			patient={patient}
		/>);
        setVisible(false);
    };

    const goToHistory = () => {
        setView(<PatientHistoryPage 
			history={history} 
			goToEdit={goToEdit}
		/>);
        setVisible(false);
    };
    
    useEffect(() => {
    	goToAbout();
    },[patient])
    
    useEffect(() => {
		goToHistory();
    },[history]);
    
    const assignDoc = () => {
		setCurrentPopUp(
			<PopUpPage 
				index={index}
				shiftIndex={() => setToShift(true)}
			/>
		);
	};

    useEffect(() => {
        navigation.setOptions({ 
            title: patient.name,
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
    
    
    const deleteUser = () => {
    	navigation.navigate('Home');
    	if(index === currentPatientInfo.length - 1) {
    		return alert("Cannot delete this Patient at the moment");
		}
		
    	setCurrentPatientInfo(
    		currentPatientInfo.filter((patient, i) => i !== index)
    	);
    }
    
    const toDeleteUser = () => {
    	Alert.alert('Delete User', 'This action cannot be reversed', [{
        	text: 'Delete',
       	 onPress: deleteUser,
       	 style: 'cancel',
 	     },
    	  {text: 'Cancel', onPress: () =>{}},
  	 ]);
    }

    //RENDER
    return (
		<>
			{view}
			<View style={styles.buttonBox}>
				<TouchableOpacity style={styles.btn} onPress={assignDoc}>
					<Text>Add</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={toDeleteUser}>
					<Text>Delete</Text>
				</TouchableOpacity>
            </View>
            {currentPopUp}
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
