import { useState, useEffect, useContext } from "react";
import { 
	KeyboardAvoidingView, 
	View, 
	Text, 
	TextInput,
	Alert,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	BackHandler
} from "react-native";
import {  Button, RadioButton } from "react-native-paper";

import { PopUpContext, PatientInfoContext } from '../contexts/contexts';

import { Colors } from  "../utils/colors";

const MedInfoEditBox = ({getDoc}) => {
	const { currentPatientInfo, setCurrentPatientInfo } = useContext(PatientInfoContext);
	
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [address, setAddress] = useState("");
	const [contact, setContact] = useState(""); 
	
	return (
		<>
		<ScrollView style={styles.scrollView}>
			<KeyboardAvoidingView 
				behavior="height"
				style={styles.container}
			>
				<TextInput
					label="Name"
					value={name}
					placeholder="Place Of God"
					style={styles.input}
					onChangeText={name => setName(name)}
				/>
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
			</KeyboardAvoidingView>
		</ScrollView>
	</>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		//width: "80%",
		//backgroundColor: "red",
		alignSelf: "center",
		justifyContent: "center",
	},
   input: {
   	backgroundColor: Colors.ordinary,
   	width: 200,
   	borderColor: Colors.highlight,
   	borderBottomWidth: .5,
   	margin: 5
  },
 
});

export default MedInfoEditBox;