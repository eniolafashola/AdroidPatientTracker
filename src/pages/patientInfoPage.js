import { useState, useEffect, useContext } from "react";

import PatientAboutPage from "../pre-pages/patientAboutPage";
import PatientHistoryPage from "../pre-pages/patientHistoryPage";

import { PatientInfoContext } from "../contexts/contexts";

import { Button, Menu, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const PatientInfoPage = ({navigation}) => {
    const { currentPatientInfo } = useContext(PatientInfoContext);

    console.log(navigation.index)

    const [view, setView] = useState(<PatientHistoryPage />);

    const [visible, setVisible] = useState(false);
    
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const goToAbout = () => {
        setView(<PatientAboutPage />);
        setVisible(false);
    };

    const goToHistory = () => {
        setView(<PatientHistoryPage />);
        setVisible(false);
    };

    useEffect(() => {
        navigation.setOptions({ 
            title: currentPatientInfo[0].name,
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
    return view;
};

export default PatientInfoPage;
