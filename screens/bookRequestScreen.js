import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/myHeader";

export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: "",
      reasonForRequest: "",
      requestId: "",
      requestedBookName: "",
      bookStatus: "",
      docId: "",
      userDocId: "",
      isBookRequestActive: false,
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = async (bookName, reasonForRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("requested_books").add({
      user_id: userId,
      book_name: bookName,
      reason_for_request: reasonForRequest,
      request_id: randomRequestId,
      book_status: "requested",
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
    await this.getBookRequest();
    db.collection("users")
      .where("username", "==", this.state.userId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({
            isBookRequestActive: true,
          });
        });
      });
    this.setState({
      bookName: "",
      reasonForRequest: "",
      requestId: randomRequestId,
    });
    return Alert.alert("Book Requested Sucessfully.");
  };

  getBookRequest = async () => {
    db.collection("requested_books")
      .where("user_id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().book_status !== "received") {
            this.setState({
              requestId: doc.data().request_id,
              requestedBookName: doc.data().book_name,
              bookStatus: doc.data().book_status,
              docId: doc.id,
            });
          }
        });
      });
  };

  getIsBookRequestActive = () => {
    db.collection("user")
      .where("username", "==", this.state.userId)
      .onSnapshot((qry) => {
        qry.forEach((doc) => {
          this.setState({
            isBookRequestActive: doc.data().isBookRequestActive,
            userDocId: doc.id,
          });
        });
      });
  };

  sendNotification = () => {
    db.collection("users")
      .where("username", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var firstName = doc.data().first_name;
          var lastName = doc.data().last_name;

          db.collection("all_notifications")
            .where("request_id", "==", this.state.requestId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var donorId = doc.data().donor_id;
                var bookName = doc.data().book_name;
                db.collection("all_notifications").add({
                  targeted_user_id: donorId,
                  message:
                    firstName +
                    " " +
                    lastName +
                    " received the book " +
                    bookName,
                  notifications_status: "unread",
                  book_name: bookName,
                });
              });
            });
        });
      });
  };

  updateBookRequestStatus = () => {
    db.collection("requested_books").doc(this.state.docId).update({
      book_status: "received",
    });

    db.collection("users")
      .where("username", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({
            isBookRequestActive: false,
          });
        });
      });
  };

  receivedBooks = (bookName) => {
    db.collection("received_books").add({
      user_id: this.state.userId,
      book_name: bookName,
      request_id: this.state.requestId,
      book_status: "received",
    });
  };

  componentDidMount() {
    this.getBookRequest();
    this.getIsBookRequestActive();
  }

  render() {
    if (this.state.isBookRequestActive === true) {
      return (
        //status screen
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              justifyContent: "center",
              borderColor: "orange",
              borderWidth: 2,
              alignItems: "center",
              padding: 10,
              margin: 10,
            }}
          >
            <Text>Book Name:</Text>

            <Text>{this.state.requestedBookName}</Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              borderColor: "orange",
              borderWidth: 2,
              alignItems: "center",
              padding: 10,
              margin: 10,
            }}
          >
            <Text>Book status:</Text>

            <Text>{this.state.bookStatus}</Text>
          </View>

          <TouchableOpacity
            style={{
              borderColor: "orange",
              borderWidth: 1,
              backgroundColor: "orange",
              widht: 360,
              alignSelf: "center",
              alignItems: "center",
              height: 30,
              marginTop: 30,
            }}
            onPress={() => {
              this.sendNotification();
              this.updateBookRequestStatus();
              this.receivedBooks(this.state.requestedBookName);
            }}
          >
            <Text>I received the book</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader title="Request Book" navigation={this.props.navigation} />
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TextInput
              style={styles.formTextInput}
              placeholder={"Enter Book Name"}
              onChangeText={(txt) => {
                this.setState({
                  bookName: txt,
                });
              }}
              value={this.state.bookName}
            />

            <TextInput
              style={[styles.formTextInput, { height: 300 }]}
              placeholder={"Why do you need the book?"}
              multiline={true}
              numberOfLines={8}
              onChangeText={(txt) => {
                this.setState({
                  reasonForRequest: txt,
                });
              }}
              value={this.state.reasonForRequest}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addRequest(
                  this.state.bookName,
                  this.state.reasonForRequest
                );
              }}
            >
              <Text>Request</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: "75%",
    height: 35,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
  },
  button: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#956",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
