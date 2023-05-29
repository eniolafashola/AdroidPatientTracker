import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from "../utils/colors";

const PatientBar = ({name, id, date, clickHandler}) => {
  return (
    <TouchableOpacity 
		style={styles.container}
		onPress={clickHandler}
	>
        <View  style={styles.identityBox}>
            <Text style={styles.name}>
                {name}
            </Text>
            <Text style={{marginLeft: 5}}>{id}</Text>
        </View>
        <View style={styles.dateBox}>            
            <Text>{date}</Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "97%",
    flexDirection: "row",
    padding: 8,
    marginBottom: 8,
    backgroundColor: Colors.transparent,
    //alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.highlight,
    borderWidth: 1
  },
  identityBox: {
      flex: 1,
      width: "70%",
      alignItems: "flex-start",
      justifyContent: "space-around",
  },
  name: {
    //width: "100%",
    color: Colors.highlight,
    fontSize: 20,
    //fontFamily: "monospace"
  },
  dateBox: {
    width: "30%",
   // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }
});


export default PatientBar;
