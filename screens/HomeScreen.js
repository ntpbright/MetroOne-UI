import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Icon,
} from 'react-native'
import { createStackNavigator } from 'react-navigation';

import post_attendance from '../Functions/api/post_m_attendance'
import get_status from '../Functions/api/get_user_staus'

// front-end
import moment from 'moment'
import { Appbar } from 'react-native-paper';
import Colors from '../constants/Colors'

const timer = require('react-native-timer');

export default class HomeScreen extends React.Component {

  constructor(){
    super()
  }

  static navigationOptions = {
    header: null,
    curTime: null,
    status: null, //0 not clock-in, 1 clock-in
    check: null,
  };

  componentWillMount = () => {
    this.setState({curTime : moment().format("h:mm:ss")})
  }

  componentDidMount(){
    timer.setInterval('UpdateTime', () => {
      this.setState( {curTime : moment().format("h:mm:ss")})
    }, 1000);
  }

  // checkStatus(){
  //   console.log("Check status")
  //   get_status()
  //   .then(result=> {
  //     this.setState({check: result})
  //   })
  //   .catch(error => {

  //   })
  //   // console.log("Check status: "+this.state.status)
  // }

  callApiAttendance(){
    post_attendance()
    .then(result => {
      this.setState({status : result.clock_event})
    })
    .catch(error => {

    })
    // console.log("Status: "+this.state.status)
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content
            title="MetroOne"
            titleStyle={{textAlign:'center'}}
          />
        </Appbar.Header>
        <View style={styles.timeContainer}>
          <Text style={styles.clockInTypeText}>
            Manual Clock-in
          </Text>
          <Text style={styles.timeText}>
            {this.state.curTime}
          </Text>
          <TouchableOpacity
            onPress= {() => this.props.navigation.navigate('Manual')}
            style={styles.clockBtn}
          >
            <Image style={styles.clockBtnImage}
              source={require('../assets/icons/btn_main_clock_in.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1}}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
            <View style={styles.LogTimeContainer}>
              <View style={styles.logContainer}>
                <Text style={styles.dateText}>Tue 16 Oct 18</Text>
                <Text style={styles.logTimeText}>09:25 ????</Text>
                <View style={styles.line}/>
              </View>
              <View style={styles.logContainer}>
                <Text style={styles.dateText}>Tue 15 Oct 18</Text>
                <Text style={styles.logTimeText}>09:25 19:30</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    borderWidth: 0.5,
    borderColor: '#000',
    height: 50,
    width: 1
  },
  clockBtn: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:175,
    height:175,
    backgroundColor:'#fff',
    borderRadius:200,
  },
  clockBtnImage: {
    width:175,
    height:175,
  },
  timeContainer: {
    paddingVertical: 20,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
  },
  clockInTypeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25
  },
  dateText: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  logTimeText: {
    fontSize: 20,
    paddingVertical: 15,
    textAlign: 'center'
  },
  logContainer: {
    paddingVertical: 15,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    flexGrow: 1
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  LogTimeContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
