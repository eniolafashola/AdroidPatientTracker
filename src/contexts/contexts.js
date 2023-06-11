import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
  
 export const PopUpContext = createContext({ 
    currentPopUp: null, 
    setCurrentPopUp: () => null, 
 }); 
  
 export const PopUpProvider = ({children}) =>{ 
    const [ currentPopUp, setCurrentPopUp ] = useState(null); 
  
    const value = { currentPopUp, setCurrentPopUp }; 
  
    useEffect(() => { 
  
    }, []); 
  
    return (
        <PopUpContext.Provider value={value} > 
            {children} 
        </PopUpContext.Provider> 
    ); 
 };


 const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key')
  //     return jsonValue != null ? JSON.parse(jsonValue) : [];
  //   } catch(e) {
  //     // error reading value
  //   }
  // }
  
  
  
 export const PatientInfoContext = createContext({ 
    currentPatientInfo: null, 
    setCurrentPatientInfo: () => null, 
    currentPatientHistory: [],
    setCurrentPatientHistory: () => null
 }); 
  
 export const PatientInfoProvider = ({children}) =>{ 
    const [ currentPatientInfo, setCurrentPatientInfo ] = useState([]); 
    const [ currentPatientHistory, setCurrentPatientHistory ] = useState([]); 
  
    const value = { 
		currentPatientInfo, 
		setCurrentPatientInfo,
		currentPatientHistory,
		setCurrentPatientHistory
	}; 
  
    useEffect(() => { 
        storeData(currentPatientInfo);
    }, [currentPatientInfo]); 
  
    return (
        <PatientInfoContext.Provider value={value} > 
            {children} 
        </PatientInfoContext.Provider> 
    ); 
 };
