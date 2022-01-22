import { StyleSheet, Platform } from "react-native";
import Color from "../config/Color";

export const Styles = StyleSheet.create({
    addTaskContainer:{
      width: '95%',
      margin: 10,
      padding: 5,
      flexDirection: 'row',
      backgroundColor: Color.pageBG,
      borderRadius: 10,
      alignItems: 'center',
    },
    addTaskInput: {
      margin: 5,
      paddingLeft: 10,
      color: Color.secondary,
      fontSize: 20,
    },
    btnText: {
      color: Color.active,
      fontSize: 18,
    },
    btnWrapper: {
      height: 40,
      backgroundColor: Color.active,
      borderRadius: 5,
      margin: 10
    },
    container: {
      flex: 1,
      backgroundColor: Color.primary,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      alignItems: 'center'
    },
    inputWrapper: {
      width: '95%',
      flexDirection: 'row',
      margin: 10,
      padding: 5,
      backgroundColor: Color.pageBG,
      borderRadius: 10,
      alignItems: 'center',
    },
    list: {
      width: '95%',
      margin: 10,
      padding: 10,
    },
    listItem: {
      marginVertical: 10,
      paddingLeft: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    searchInput: {
      width: '60%',
      margin: 5,
      color: Color.secondary,
      fontSize: 20,
    },
    taskInput: {
      margin: 5,
      color: Color.secondary,
      borderBottomWidth: 1,
      borderColor: Color.disative,
    },
    title:{
      height: 45,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      marginTop: 10,
    },
    titleText:{
      fontWeight: 'bold', 
      fontSize: 24, 
      color: Color.secondary,
    },
    titleTextSmall:{
      fontSize: 18, 
      color: Color.disative,
    }
  });
  