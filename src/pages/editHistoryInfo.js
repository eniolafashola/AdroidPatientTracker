import { useState, useEffect, useContext } from "react";
import { 
	KeyboardAvoidingView, 
	Text, 
	Alert,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";

import { PopUpContext, PatientInfoContext } from '../contexts/contexts';

import { Colors } from  "../utils/colors";

const EditHistoryInfo = ({navigation, route}) => {
	const { currentPopUp, setCurrentPopUp } = useContext(PopUpContext);
	const { 
		currentPatientInfo, 
		setCurrentPatientInfo,
	} = useContext(PatientInfoContext);
	
	const { index, key, lastEdited } = route.params;
	
	const about = currentPatientInfo[JSON.stringify(index)];
	const history = currentPatientInfo[JSON.stringify(index)].history;
	
	const [diagnosis, setDiagnosis] = useState(history[key].diagnosis);
	const [prescriptions, setPrescription] = useState(history[JSON.stringify(key)].prescriptions);
	const [bill, setBill] = useState(history[JSON.stringify(key)].bill); 
	
	useEffect(() => {
		navigation.setOptions({ 
            title: about.name,
        })
	}, []);
	
	const onSubmit = () => {
		if(!diagnosis || !prescriptions || !bill) {
			return Alert.alert("", "Cannot submit empty fields");
		}
		console.log('info: ', JSON.stringify(index), key)
		setCurrentPatientInfo(
			currentPatientInfo.map((patient, i) => patient = i === index
				? {
					...currentPatientInfo[index],
					history: history.map((details, j) => details = j === key
						? {
							...currentPatientInfo[index].history[key],
							diagnosis,
							prescriptions,
							bill
						} 
						
						: details
					)
				}
				
				: patient
			)
		);
		
		navigation.navigate('Patient Info', {
     	 index,
     	 edited: !lastEdited ? true : false
	    });
	}
	
	useEffect (() => {
		console.log('aaa: ', currentPatientInfo)
	},[currentPatientInfo])
	
	return (
		<>
			<ScrollView style={styles.scrollView}>
				<KeyboardAvoidingView 
					behavior="height"
					style={styles.container}
				>
					<Text style={styles.id}>Patient Id: {about.id}</Text>
					<Text>Diagnosis:</Text>
					<TextInput
						//label="Name"
						multiline={true}
						value={diagnosis}
						//placeholder="Place Of God"
						style={styles.input}
						onChangeText={diagnosis => setDiagnosis(diagnosis)}
					/>
					<Text>Prescriptions:</Text>
					<TextInput
						//label="Date Of Birth"
						multiline={true}
						value={prescriptions}
						//placeholder="29-Jul-2000"
						style={styles.input}
						onChangeText={prescriptions => setPrescription(prescriptions)}
					/>
					<Text>Bill:</Text>
					<TextInput
						//label="Address"
						value={bill}
						//placeholder="21 Akinmurele strt, Akure"
						style={styles.input}
						onChangeText={bill => setBill(bill)}
					/>
					<TouchableOpacity style={styles.button} onPress={onSubmit}>
						<Text style={styles.btnT}>Submit</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</ScrollView>
			{currentPopUp}
		</>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
  },
  scrollView: {
     flex: 1,
    width: "100%",
    //marginTop: 50
  },
  id: {
  	fontSize: 25,
  	margin: 40,
  },
  input: {
  	backgroundColor: Colors.ordinary,
  	width: "85%",
  	marginBottom: 25,
  },
  radioBox: {
  	flexDirection: "row",
  	alignItems: "center",
  	justifyContent: "center",
  	marginBottom: 15,
  },
  button: {
  	height: 50,
  	width: "85%",
  	alignSelf: "center",
  	backgroundColor: Colors.highlight,
  	alignItems: "center",
  	justifyContent: "center",
  	margin: 20
  },
  btnT: {
  	color: Colors.white,
  	fontSize: 20
  }
});

export default EditHistoryInfo;


/**
setCurrentPatientHistory(
			currentPatientHistory.map(
				(a, b) => a = b == index ? [{
					date: history[0].date,
					doctor: history[0].doctor,
					diagnosis,
					prescriptions,
					bill: bill
				}, ...currentPatientHistory[b]] : a
			)
		)
*/