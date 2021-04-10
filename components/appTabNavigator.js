import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import BookRequestScreen from "../screens/bookRequestScreen";
import {AppStackNavigator} from "./appStackNavigator";

export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../assets/request-list.png")}
        />
      ),
      tabBarLabel: "Donate Books",
    },
  },

  BookRequest: {
    screen: BookRequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../assets/request-book.png")}
        />
      ),
      tabBarLabel: "Book Request",
    },
  },
});
