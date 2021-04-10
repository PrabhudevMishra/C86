import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import firebase from "firebase";

export default class CustomSidebarMenu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerItemContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              this.props.navigation.navigate("WelcomeScreen");
              firebase.auth().signOut();
            }}
          >
            <Text style={styles.logOutText}>Logout</Text>
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
  drawerItemContainer: {
    flex: 0.8,
  },
  logOutContainer: {
    flex: 2.2,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  logOutButton: {
    justifyContent: "center",
    width: "100%",
    height: 60,
    padding: 10,
  },
  logOutText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
