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

const AddPatient = ({navigation}) => {
	const { currentPopUp, setCurrentPopUp } = useContext(PopUpContext);
	const { currentPatientInfo, setCurrentPatientInfo } = useContext(PatientInfoContext);
	
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [address, setAddress] = useState("");
	const [contact, setContact] = useState(""); 
	
	const [checked, setChecked] = useState('male');
	
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
	
	const submitInfo = () => {
		setCurrentPatientInfo(
			[{
				id: 3000 + currentPatientInfo.length,
				sex: checked,
				name,
				dob,
				address,
				contact,
				date: `
					${
						new Date().getDate()
					} ${months[new Date().getMonth()]} ${
					new Date().getFullYear()
				 }`,
			  }, ...currentPatientInfo
		  ]
		);
	};
		
	const assignDoc = () => {
		if(!name) {
			return Alert.alert("", "Enter At Least Patient Name To Create A Profile");
		}
		setCurrentPopUp(
			<PopUpPage 
				submitInfo={submitInfo} 
				goToPageInfo={goToPageInfo}
			/>
		);
	};
	
	return (
	<>
		<ScrollView style={styles.scrollView}>
			<KeyboardAvoidingView 
				behavior="height"
				style={styles.container}
			>
				<Text style={styles.id}>Patient Id: {3000 + currentPatientInfo.length}</Text>
				<TextInput
					label="Name"
					value={name}
					placeholder="Place Of God"
					style={styles.input}
					onChangeText={name => setName(name)}
				/>
				<View style={styles.radioBox}>
					<RadioButton
							value="male"
							status={ checked === 'male' ? 'checked' : 'unchecked' }
							onPress={() => setChecked('male')}
					/>
					<Text>Male</Text>
					<RadioButton
							value="female"
							status={ checked === 'female' ? 'checked' : 'unchecked' }
							onPress={() => setChecked('female')}
					/>
					<Text>Female</Text>
				</View>
				<TextInput
					label="Date Of Birth"
					value={dob}
					placeholder="29-Jul-2000"
					style={styles.input}
					onChangeText={dob => setDob(dob)}
				/>
				<TextInput
					label="Address"
					value={address}
					placeholder="21 Akinmurele strt, Akure"
					style={styles.input}
					onChangeText={address => setAddress(address)}
				/>
				<TextInput
					label="Contact"
					value={contact}
					placeholder="08032404351"
					style={styles.input}
					onChangeText={contact => setContact(contact)}
				/>
				<TouchableOpacity style={styles.button} onPress={assignDoc}>
                	<Text style={styles.btnT}>Submit</Text>
                </TouchableOpacity>
			</KeyboardAvoidingView>
		</ScrollView>
		{currentPopUp}
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

export default AddPatient;