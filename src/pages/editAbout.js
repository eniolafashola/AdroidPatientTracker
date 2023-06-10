import { useState, useEffect, useContext } from "react";
import { 
	KeyboardAvoidingView, 
	View, 
	Text, 
	Alert,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	BackHandler
} from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";

import PopUpPage from "./popUpPage";

import { PopUpContext, PatientInfoContext } from '../contexts/contexts';

import { Colors } from  "../utils/colors";

const EditAbout = ({navigation, route}) => {
	const { currentPopUp, setCurrentPopUp } = useContext(PopUpContext);
	const { currentPatientInfo, setCurrentPatientInfo } = useContext(PatientInfoContext);
	
	const { index } = route.params;
	
	const patient = currentPatientInfo[JSON.stringify(index)];
	
	useEffect(() => {
		navigation.setOptions({ 
            title: patient.name,
        })
	}, []);
	
	const [name, setName] = useState(patient.name);
	const [dob, setDob] = useState(patient.dob);
	const [address, setAddress] = useState(patient.address);
	const [contact, setContact] = useState(patient.contact); 
	
	const [checked, setChecked] = useState(patient.sex);
	
	const backAction = () => setCurrentPopUp(null);
	
	const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    
    const goToPageInfo = () => navigation.navigate('Home');
    
    const months = [
		 "Jan", "Feb", "Mar", "Apr", 
		"May", "Jun", "Jul", "Aug",
		"Sep", "Oct", "Nov", "Dec"
	]
		
	const submit = () => {
		if(!name) {
			return Alert.alert("", "Enter At Least Patient Name To Create A Profile");
		}
		
		setCurrentPatientInfo(
			currentPatientInfo.map((patient, i) => patient = i === index
				? {
					...currentPatientInfo[index],
					name,
					dob,
					address,
					contact,
					sex: checked
				}
				
				: patient
			)
		);
		
		navigation.navigate('Patient Info', {
			index
		});

	};
	
	return (
	<>
		<ScrollView style={styles.scrollView}>
			<KeyboardAvoidingView 
				behavior="height"
				style={styles.container}
			>
				<Text style={styles.id}>Patient Id: {patient.id}</Text>
				<TextInput
					label="Name"
					textColor={Colors.black}
					value={name}
					placeholder="Place Of God"
					style={styles.input}
					onChangeText={name => setName(name)}
				/>
				<View style={styles.radioBox}>
					<RadioButton
						color={Colors.highlight}
						unchecked color={Colors.highlight}
						value="male"
						status={ checked === 'male' ? 'checked' : 'unchecked' }
						onPress={() => setChecked('male')}
					/>
					<Text>Male</Text>
					<RadioButton
						color={Colors.highlight}
						unchecked color={Colors.highlight}
						value="female"
						status={ checked === 'female' ? 'checked' : 'unchecked' }
						onPress={() => setChecked('female')}
					/>
					<Text>Female</Text>
				</View>
				<TextInput
					label="Date Of Birth"
					value={dob}
					textColor={Colors.black}
					placeholder="29-Jul-2000"
					style={styles.input}
					onChangeText={dob => setDob(dob)}
				/>
				<TextInput
					label="Address"
					textColor={Colors.black}
					value={address}
					placeholder="21 Akinmurele strt, Akure"
					style={styles.input}
					onChangeText={address => setAddress(address)}
				/>
				<TextInput
					label="Contact"
					textColor={Colors.black}
					value={contact}
					placeholder="08032404351"
					style={styles.input}
					onChangeText={contact => setContact(contact)}
				/>
				<TouchableOpacity style={styles.button} onPress={submit}>
                	<Text style={styles.btnT}>Submit</Text>
                </TouchableOpacity>
			</KeyboardAvoidingView>
		</ScrollView>
	</>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
  },
  scrollView: {
     flex: 1,
    width: "100%",
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

export default EditAbout;