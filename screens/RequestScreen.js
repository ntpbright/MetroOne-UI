import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { ExpoLinksView } from '@expo/samples';

import Colors from '../constants/Colors'
import { Appbar, List } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab'

//Components
// import Pending from '../components/request/Pending'
// import Approved from '../components/request/Approved';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // componentDidMount() {
  //   console.log('linksscreen', this.props)
  // }

  constructor(){
    super()
    this.state = {
      selectedIndex: 0,
      customStyleIndex: 0,
    };
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  }

  handleCustomIndexSelect = (index: number) => {
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }))
  }

  render() {
    return (
      <View style={styles.backgroundColorWhite}>
        <Appbar.Header style={{backgroundColor:Colors.navBarColor}}>
          <Appbar.Content
            title="MetroOne"
            titleStyle={{textAlign:'center'}}
          />
        </Appbar.Header>
        <View style={styles.TabContainer}>
          <SegmentedControlTab
              values={['Pending', 'Approved']}
              selectedIndex={this.state.customStyleIndex}
              onTabPress={this.handleCustomIndexSelect}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
            />
        </View>
        <View style={listOfRequest.flexWidthOne}>
          {this.state.customStyleIndex === 0
            &&
            //This view must move to another class
            <ScrollView style={styles.container}>
              <View style={listOfRequest.listContainner}>
                <View style={listOfRequest.flexWidthTwo}>
                  <Text style={listOfRequest.timeText}>
                    19:00
                  </Text>
                </View>
                <View style={listOfRequest.flexWidthOne}>

                </View>
                <View style={listOfRequest.flexWidthTwo}>

                </View>
              </View>
            </ScrollView>
          }
          {this.state.customStyleIndex === 1
            &&
            <Text>
              02
            </Text>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColorWhite: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  TabContainer:{
    padding: 10
  },
  tabStyle:{
    borderColor: 'gray',
    height: 40,
  },
  activeTabStyle:{
    backgroundColor: Colors.navBarColor,
  }
});

const listOfRequest = StyleSheet.create({
  flexWidthTwo: {
    flex: 2
  },
  flexWidthOne: {
    flex: 1
  },
  listContainner: {
    flex: 1,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    borderTopColor: 'gray',
    borderTopWidth: 0.5
  },
  timeText:{
    fontSize: 50,
    fontWeight: 'bold'
  }
});