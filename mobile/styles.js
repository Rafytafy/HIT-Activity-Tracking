import { StyleSheet } from "react-native";
var color1 = "#7E0F15";
var color2 = "#0F7E78";
var color3 = "#FAFAFA";
var color4 = "#333333";
const styles = StyleSheet.create({
  landContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: color1,
  },
  largeButton: {
    height: 60,
    width: 250,
    backgroundColor: color2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    height: 50,
    width: 300,
    backgroundColor: color2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  inputCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color3,
    height: 450,
    width: 350,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: color4,
    padding: 20,
    borderRadius: 8,
  },
  singupCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color3,
    width: 350,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: color4,
    padding: 20,
    borderRadius: 8,
  },
  loginInputBox: {
    padding: 10,
    borderRadius: 20,
    height: 70,
    fontSize: 22,
    width: 300,
    marginTop: 15,
    marginBottom: 20,
    color: color4,
    borderBottomColor: color2,
    borderBottomWidth: 2,
  },
  textInput: {
    padding: 7,
    borderRadius: 20,
    height: 53,
    fontSize: 18,
    width: 300,
    marginTop: 8,
    marginBottom: 8,
    color: color4,
    borderBottomColor: color2,
    borderBottomWidth: 2,
  },
  numberInput: {
    alignItems: "center",
    padding: 7,
    borderRadius: 20,
    height: 53,
    fontSize: 18,
    width: 100,
    marginTop: 8,
    marginBottom: 8,
    color: color4,
    borderBottomColor: color2,
    borderBottomWidth: 2,
  },
  signupTitle: { fontSize: 20, color: color2 },
  profileCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color3,
    width: 350,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: color4,
    padding: 20,
    borderRadius: 8,
  },
  stats: {
    color: "#333",
    fontSize: 24,
    marginHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: color2,
  },
  weightCard:{
  
    justifyContent: "center",
  alignItems: "center",
  height: 80,
  width: 300,
  backgroundColor: color3,
  borderRadius: 8,
  margin: 5,
  }
  
});

export default styles;