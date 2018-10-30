/**
 * @flow
 */

import React from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Text, SectionList,FlatList, View, Alert, AppState } from 'react-native';
import {
  SafeAreaView,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

import { SearchScreen } from '../screens/Search';
import { ProfileScreen } from '../screens/Profile';
import { PublishScreen } from '../screens/Publish';

const TabNav = createBottomTabNavigator(
  {
    Search: SearchScreen,
    Publish: PublishScreen,
    Profile: ProfileScreen,
    /*Publish: {
      screen: PublishScreen,
    },*/
    /*Profile: {
      screen: PublishScreen,
    },*/
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);

TabNav.navigationOptions = ({ navigation }) => {
  return {
    title: 'YOUMATTER',
  };
};

const MenuNavigation = createStackNavigator({
  Root: {
    screen: TabNav,
  },
  /*Lesson: {
    screen: LessonScreen,
    path: '/clase/:name',
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      headerRight: (
        <Button
          onPress={() =>
            Alert.alert(
              '¡Atención!',
              'No podrás salir del examen antes de finalizar el mismo. Tampoco podrás cambiar de pestaña o el examen se anulará',
              [
                {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Continuar', onPress: () => navigation.navigate('Exam')},
              ],
              { cancelable: false }
            )}
          title="Examen"
        />
      ),
    }),
  },*/
});

export default createStackNavigator(
  {
    Main: {
      screen: MenuNavigation,
    },
    /*Exam: {
      screen: ExamScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },*/
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
