import { useState, useEffect, useContext } from 'react';
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import PatientBar from "../atoms/patientBar";
import { PatientInfoContext } from '../contexts/contexts';
import { Colors } from "../utils/colors";

const HomePage = ({navigation}) => {
  const { currentPatientInfo } = useContext(PatientInfoContext);
  const [ searched, setSearched ] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [ view, setView ] = useState(patientsNonAvailableView);

  const onChangeSearch = query => setSearchQuery(query);
  
  useEffect(() => {
  	if(searchQuery == " ") {
	  	return
	  }
  	setSearched(currentPatientInfo.filter(
	  	(c) => c.name.toLowerCase()
			.includes(searchQuery.toLowerCase())
	  ));
  },[searchQuery]);
  
  useEffect(() => {
  	if(!searched.length) {
  		return setView(patientsNonAvailableView)
	  }
  	setView(patientsSearchedView)
  }, [searched]);
  
  useEffect(() => {
  	if(!currentPatientInfo.length) {
  		return setView(patientsNonAvailableView)
	};
  	setView(patientsAvailableView)
  }, [currentPatientInfo]);

  const patientBarClickHandler = (index) => {
  	navigation.navigate('Patient Info', {
     	 index,
	  });
  }

  const addNewPatient = () => {
  	navigation.navigate('Add New Patient');
  	setSearchQuery("");
  }

  const patientsNonAvailableView = <View style={styles.emptyBox} >
    <MaterialCommunityIcons 
      name="flask-empty-minus-outline" 
      size={105} 
      color={Colors.darkTransparent} 
    />
  </View>;

  const patientsAvailableView = <ScrollView 
    style={styles.list} 
    contentContainerStyle={{alignItems: "center"}}
  >
    {
    currentPatientInfo.map((bar, index) => {
      return (
        <PatientBar 
          key={index}
          name={bar.name}
          id={bar.id}
          date={bar.date}
          clickHandler={() => patientBarClickHandler(index)}
        />
      )
    })
  }  
  </ScrollView>;

  const patientsSearchedView = <ScrollView 
    style={styles.list} 
    contentContainerStyle={{alignItems: "center"}}
  >
    {
    searched.map((bar) => {
      return (
        <PatientBar 
          key={bar.id}
          name={bar.name}
          id={bar.id}
          date={bar.date}
          clickHandler={() => 
            patientBarClickHandler(currentPatientInfo.indexOf(bar))
          }
        />
      )
    })
  }  
  </ScrollView>;

  return (
      <KeyboardAvoidingView behavior="height" style={styles.container}>
          <TouchableWithoutFeedback 
			  onPress={Keyboard.dismiss}
		  >
		  	<View style={styles.search}>
              	<Searchbar
				  	iconColor={Colors.highlight}
					style={styles.searchBar}
     				placeholder="Search"
  				    onChangeText={onChangeSearch}
 				    value={searchQuery}
  			    />
              </View>
          </TouchableWithoutFeedback>
          
          	{view}
         
          <View style={styles.footer}>
              <TouchableOpacity onPress={addNewPatient}>
                    <Ionicons name="person-add" size={25} color={Colors.highlight} />
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
  searchBar: {
  	backgroundColor: Colors.ordinary
  },
  emptyBox: {
  	flex: 0.76,
  	alignItems: "center",
  	justifyContent: "center",
  	marginBottom: 40
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
