import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/myHeader";

export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      address: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      docId: "",
      email: "",
    };
  }
  updateUserDetails = async () => {
    db.collection("users").doc(this.state.docId).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address: this.state.address,
      mobile_number: this.state.mobileNumber,
    });
    Alert.alert("Profile updated sucessfully.");
  };

  getUserDetails = async () => {
    var user = firebase.auth().currentUser;
    var email = user.email;

    db.collection("users")
      .where("username", "==", email)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            firstName: data.first_name,
            lastName: data.last_name,
            mobileNumber: data.mobile_number,
            address: data.address,
            email: data.username,
            docId: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <View style={styles.container}>
          <MyHeader title = 'Settings' navigation = {this.props.navigation}/>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder="First name"
            maxLength={16}
            onChangeText={(txt) => {
              this.setState({
                firstName: txt,
              });
            }}
            value={this.state.firstName}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder="Last name"
            maxLength={8}
            onChangeText={(txt) => {
              this.setState({
                lastName: txt,
              });
            }}
            value={this.state.lastName}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder="Mobile number"
            maxLength={10}
            onChangeText={(txt) => {
              this.setState({
                mobileNumber: txt,
              });
            }}
            value={this.state.mobileNumber}
            keyboardType={"numeric"}
          />

          <TextInput
            style={[styles.formTextInput, { height: 250 }]}
            placeholder="Address"
            multiline={true}
            onChangeText={(txt) => {
              this.setState({
                address: txt,
              });
            }}
            value={this.state.address}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "blue",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#67f54f",
  },
});
