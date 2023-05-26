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
  
 export const PatientInfoContext = createContext({ 
    currentPatientInfo: null, 
    setCurrentPatientInfo: () => null, 
 }); 
  
 export const PatientInfoProvider = ({children}) =>{ 
    const [ currentPatientInfo, setCurrentPatientInfo ] = useState([]); 
  
    const value = { currentPatientInfo, setCurrentPatientInfo }; 
  
    useEffect(() => { 
  
    }, []); 
  
    return (
        <PatientInfoContext.Provider value={value} > 
            {children} 
        </PatientInfoContext.Provider> 
    ); 
 };
