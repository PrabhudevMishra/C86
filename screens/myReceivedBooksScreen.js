import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/myHeader";
import { ListItem, Icon } from "react-native-elements";

export default class MyReceivedBookScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      receivedBookList: [],
      userId: firebase.auth().currentUser.email,
    };
    this.requestRef = null;
  }
  getReceivedBookslist = () => {
    this.requestRef = db
      .collection("requested_books")
      .where("user_id", "==", this.state.userId)
      .where("book_status", "==", "received")
      .onSnapshot((snapShot) => {
        var receivedBooksList = snapShot.docs.map((doc) => doc.data());
        this.setState({
          receivedBookList: receivedBooksList,
        });
      });
  };

  componentDidMount() {
    this.getReceivedBookslist();
  }

  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.book_status}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        bottomDivider
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Received Books" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.receivedBookList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List of all received books</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.receivedBookList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
  },
});
