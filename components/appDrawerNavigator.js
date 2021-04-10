import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./appTabNavigator";
import CustomSidebarMenu from "./customSidebarMenu";
import ProfileScreen from "../screens/profileScreen";
import MyDonationScreen from "../screens/myDonationScreen";
import NotificationScreen from "../screens/notificationScreen";
import MyReceivedBookScreen from "../screens/myReceivedBooksScreen";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: AppTabNavigator },
    MyDonations: { screen: MyDonationScreen },
    Notifications: { screen: NotificationScreen },
    MyReceivedBooks: { screen: MyReceivedBookScreen },
    Settings: { screen: ProfileScreen },
  },
  {
    contentComponent: CustomSidebarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
