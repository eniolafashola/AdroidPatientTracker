import { useContext } from 'react';
import { Searchbar } from 'react-native-paper';
import { 
	StyleSheet, 
	View, 
	ScrollView,
  TouchableOpacity,
	KeyboardAvoidingView ,
	TouchableWithoutFeedback, 
	Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PatientBar from "../atoms/patientBar";
import { PatientInfoContext } from '../contexts/contexts';
import { Colors } from "../utils/colors";

const HomePage = ({navigation}) => {
  const { currentPatientInfo } = useContext(PatientInfoContext);

  const patientBarClickHandler = (id) => navigation.navigate('Patient Info', {
    index: id - 3000,
  });
  const addNewPatient = () => navigation.navigate('Add New Patient');

  return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
          <TouchableWithoutFeedback 
			  onPress={Keyboard.dismiss}
		  >
		  	<View style={styles.search}>
              	<Searchbar />
              </View>
          </TouchableWithoutFeedback>
          <ScrollView 
		  	style={styles.list} 
		  	contentContainerStyle={{alignItems: "center"}}
		  >
          	{
              currentPatientInfo.map((bar) => {
                return (
                  <PatientBar 
                    key={bar.id}
                    name={bar.name}
                    id={bar.id}
                    date={bar.name}
                    clickHandler={patientBarClickHandler}
                  />
                )
              })
            }
          </ScrollView>
          <View style={styles.footer}>
              <TouchableOpacity onPress={addNewPatient}>
                    <Ionicons name="person-add" size={30} color={Colors.highlight} />
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative",
    top: 0,
    left: 0,
    zIndex: -1
  },
  search: {
    flex: 0.15,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 0.76,
    width: "100%",
  },
  footer: {
    flex: 0.09,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
});

export default HomePage;
