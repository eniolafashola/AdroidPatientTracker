import { useState, useContext } from "react";
import { 
	KeyboardAvoidingView, 
	View, 
	Text, 
	StyleSheet,
	ScrollView,
} from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";

import PopUpPage from "./popUpPage";

import { PopUpContext, PatientInfoContext } from '../contexts/contexts';

import { Colors } from  "../utils/colors";

const AddPatient = () => {
	const { currentPopUp, setCurrentPopUp } = useContext(PopUpContext);
	const { currentPatientInfo, setCurrentPatientInfo } = useContext(PatientInfoContext);
	
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [address, setAddress] = useState("");
	const [contact, setContact] = useState(""); 
	
	const [checked, setChecked] = useState('male');
	
	const selectHandler = () => alert(999);
    const cancelHandler = () => setCurrentPopUp(null);
	
	const onSubmit = () => {
		
		setCurrentPatientInfo(
			[...currentPatientInfo, {
				id: 3000 + currentPatientInfo.length,
				name,
				age,
				address,
				contact
			}]
		);

		setCurrentPopUp(
			<PopUpPage 
				select={selectHandler}
				cancel={cancelHandler}
			/>
		);
	}
	
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
					label="Age"
					value={age}
					style={styles.input}
					onChangeText={age => setAge(age)}
				/>
				<TextInput
					label="Address"
					value={address}
					style={styles.input}
					onChangeText={address => setAddress(address)}
				/>
				<TextInput
					label="Contact"
					value={contact}
					style={styles.input}
					onChangeText={contact => setContact(contact)}
				/>
				<Button 
					contentStyle={styles.button}
					mode="contained" 
					buttonColor={Colors.highlight}
					onPress={onSubmit}>
					Submit
				</Button>
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
  }
});

export default AddPatient;