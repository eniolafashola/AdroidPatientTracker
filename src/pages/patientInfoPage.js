import { useState, useEffect, useContext } from "react";

import PatientAboutPage from "../pre-pages/patientAboutPage";
import PatientHistoryPage from "../pre-pages/patientHistoryPage";

import PopUpPage from "./popUpPage";

import { PopUpContext, PatientInfoContext } from "../contexts/contexts";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Menu, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors } from "../utils/colors";

const PatientInfoPage = ({route, navigation}, a=[], b=[]) => {
	const [ toShift, setToShift ] = useState(false);
	const [ toReset, setToReset ] = useState(false);
    const { 
		currentPatientInfo, 
		setCurrentPatientInfo,
		currentPatientHistory, 
		setCurrentPatientHistory
	} = useContext(PatientInfoContext);
    const { currentPopUp, setCurrentPopUp } = useContext(PopUpContext);
    
    const { index , edited } = route.params;
    
    const about = currentPatientInfo[JSON.stringify(index)];
	const history = currentPatientHistory[JSON.stringify(index)];
	
	const goToEdit = (key) => {
		//console.log("Ed: ",edited, history)
		navigation.navigate('Edit Patient Info', {
     	 index,
     	 key,
     	 lastEdited: !edited ? false : true
		});
	}
	
    const [view, setView] = useState(<PatientHistoryPage 
			history={history} 
			goToEdit={goToEdit}
	/>);
	//let a = []
	useEffect (() => {
		a = currentPatientInfo;
		b = currentPatientHistory;
	},[history.length])
	
	useEffect (() => {
		if(!toShift) {
			return
		}
		a.unshift(a.splice(index, 1)[0]);
		b.unshift(b.splice(index, 1)[0]);
		//console.log("2a: ",index , " ", about.name)
		setCurrentPatientInfo(a);
		setCurrentPatientHistory(b);
		setToShift(false);
		setToReset(true);
	}, [toShift])
	
	useEffect (() => {
		console.log(111)
		if(!toReset) {
			return
		}
		setView(<PatientHistoryPage 
			history={history} 
			goToEdit={goToEdit}
		/>);
		setToReset(false);
	}, [toReset]);

    const [visible, setVisible] = useState(false);
    
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const goToAbout = () => {
        setView(<PatientAboutPage about={about}/>);
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
  /**  	if(!edited) {
    		return
		}*/
		goToHistory();
    //	console.log("edi: ", edited, history)
    },[edited]);
    
    const assignDoc = () => {
		setCurrentPopUp(
			<PopUpPage 
				index={index}
				shiftIndex={() => setToShift(true)}
				//submitInfo={submitInfo} 
				//goToPageInfo={goToPageInfo}
			/>
		);
	};

    useEffect(() => {
    //	console.log("3a: ",index , " ", about.name, "more: ", //currentPatientInfo)
        navigation.setOptions({ 
            title: about.name,
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
                    <TouchableOpacity style={styles.btn} onPress={assignDoc}>
                    	<Text>Add</Text>
              	  </TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={null}>
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
