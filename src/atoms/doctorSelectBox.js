import { useState } from "react";
import { View, Text, Button, StyleSheet, StatusBar } from "react-native";
import { RadioButton } from "react-native-paper";

const DoctorSelectBox = () => {
	const radios = [
			"Dr Mogaji Isaac",
			"Dr Segun Fagunwa",
			"Dr Usman Dauda",
			"Dr Elon Musk"
	];
	
	const [checked, setChecked] = useState(radios[0]);
	
	return (
		<View style={styles.container}>
			{
				radios.map((radio, index) => {
					return ( 
						<View style={styles.radioBox}>
        					<RadioButton
								key={index}
        						value={radio}
        						status={ checked === radio ? 'checked' : 'unchecked' }
        						onPress={() => setChecked(radio)}
      	  					/>
      	  				<Text style={{fontSize: 20}}>{radio}</Text>
        				</View>
         	 	 )
      		 })
      	}
       </View>
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
   radioBox: {
   	flexDirection: "row",
   	alignItems: "center"
   },
 
});

export default DoctorSelectBox;