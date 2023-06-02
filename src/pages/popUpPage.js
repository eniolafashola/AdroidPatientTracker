import { useState, useContext , useEffect} from "react";
import { View, Text, Button, StyleSheet, StatusBar } from "react-native";

import DoctorSelectBox from "../atoms/doctorSelectBox";


import { PopUpContext, PatientInfoContext } from '../contexts/contexts';

import { Colors } from "../utils/colors";

const PopUpPage = ({submitInfo, goToPageInfo, index, shiftIndex}) => {
	const months = [
		 "Jan", "Feb", "Mar", "Apr", 
		"May", "Jun", "Jul", "Aug",
		"Sep", "Oct", "Nov", "Dec"
	];
	
	const { 
		currentPatientInfo,
		setCurrentPatientInfo, 
		currentPatientHistory, 
		setCurrentPatientHistory
	 } = useContext(PatientInfoContext);
	const { currentPopUp, setCurrentPopUp } = useContext(PopUpContext);
	
	const [doc, setDoc] = useState(null); 
	
	const cancel = () => {
		setCurrentPopUp(null);
		/**setCurrentPatientInfo(
			currentPatientInfo.slice(1)
		)*/
	};
	
	const select = () => {
		if(submitInfo) {
		 	setCurrentPatientHistory([
			 	 [{
            			date: `${
								new Date().getDate()
							} ${months[new Date().getMonth()]} ${
							new Date().getFullYear()
						}`,
            			doctor: doc,
            		/**	diagnosis: "Tuberculosis",
            			prescriptions: "Aspirin",
            			bill: "$500"*/
       			}
       		 ], ...currentPatientHistory
    	   ]);
    		submitInfo();
    		setCurrentPopUp(null); 
    		goToPageInfo();
       }else  {
       	setCurrentPatientHistory([
			 	 [{
            			date: `${
								new Date().getDate()
							} ${months[new Date().getMonth()]} ${
							new Date().getFullYear()
						}`,
            			doctor: doc,
            		/**	diagnosis: "Tuberculosis",
            			prescriptions: "Aspirin",
            			bill: "$500"*/
       			}, ...currentPatientHistory[index]
       		 ], ...currentPatientHistory
   	    ]);
   		shiftIndex();
           setCurrentPopUp(null); 
       }
	};
	
	const getDoc = (d) => {
		setDoc(d);
	};
	
	//const select = () => getDoc("eni")
    return (
      <View style={styles.container}>
        <View style={styles.pickBox}>
          <View style={styles.titleBox}>
            <Text 
                style={styles.title}
            >Select Doctor</Text>
          </View>
          <View style={styles.selectSection}>
          <DoctorSelectBox 
			getDoc={getDoc}
		  />
          </View>
          <View style={styles.buttonBox}>
            <Button 
              title="Select" 
              color={Colors.highlight}
              onPress={select}
            />
            <Button 
              title="Cancel" 
              color={Colors.ordinary}
              onPress={cancel}
            />
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: "100%",
    width: "100%",
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 1000
  },
  pickBox: {
    height: 300,
    width: "88%",
    backgroundColor: Colors.white,
    borderColor: Colors.highlight,
    borderEndWidth: 0.5,
    borderBottomWidth: 0.5,
   
  },
  titleBox: {
   // height: 40,
    flex: 0.15,
    borderColor: Colors.highlight,
    borderBottomWidth: 2,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    color: Colors.highlight,
    marginLeft: 5
  },
  selectSection: {
    flex: 0.7,
  },
  radioBox: {
  	flexDirection: "row",
  	alignItems: "center"
  },
  buttonBox: {
    flex: 0.15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  }
  
});

export default PopUpPage;
