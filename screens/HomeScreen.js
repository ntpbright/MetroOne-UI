import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import { Location } from 'expo'

import post_attendance from '../Functions/api/post_m_attendance'

// front-end
import moment from 'moment'
import { Appbar } from 'react-native-paper';

const timer = require('react-native-timer');

export default class HomeScreen extends React.Component {

  constructor(){
    super()
    this.BETWEEN_DEGREE = 15.00;
    this.THOUSAND_METER = 1000;
    this.SURFACE_DISTANCE_PER_ONE_DEGREE = [
      { latitude : 110.574, longitude : 111.320 }, //0  degree
      { latitude : 110.649, longitude : 107.551 }, //15 degree
      { latitude : 110.852, longitude : 96.486 },  //30 degree
      { latitude : 111.132, longitude : 78.847 },  //45 degree
      { latitude : 111.412, longitude : 55.800 },  //60 degree
      { latitude : 111.618, longitude : 28.902 },  //75 degree
      { latitude : 111.694, longitude : 0.000 }    //90 degree
   ];
  }

  state = {
    // 0 GPS
    // 1 Manual
    clockMethod: null,
    // 0 not clock in
    // 1 clock in
    // 2 clock out
    clockStatus: null,
    screenDetail: {
      "description": [
        "GPS clock in",
        "Manual clock in",
      ],
      "assetBtn": [
        "../assets/icons/btn_main_clock_in.png",
        "../assets/icons/btn_main_clock_out.png"
      ]
    },
    isLoadingComplete: false,
    coord: { latitude:13.789262, longitude:100.579949 },
    real_location: { latitude:13.789262, longitude:100.579949 },
    location: null,
    errorMessage: null,
    distance: null,
    radius: 20,
    counter: 0,
    workStatus: false,
  }

  static navigationOptions = {
    header: null,
    curTime: null,
    check: null,
  };

  getSurfaceDistance(location){
    return this.SURFACE_DISTANCE_PER_ONE_DEGREE[parseInt(location.latitude / this.BETWEEN_DEGREE)]; //depend on latitude
  }

  getLatitudeDistance(location){
    return this.getSurfaceDistance(location).latitude * this.THOUSAND_METER;
  }

  getLongitudeDistance(location){
    return this.getSurfaceDistance(location).longitude * this.THOUSAND_METER;
  }

  updateLocation = async() => {
    let location = await Location.getCurrentPositionAsync({});
    let real_location = {}
    this.setState({ location });
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      real_location.latitude = this.state.location.coords.latitude
      real_location.longitude = this.state.location.coords.longitude
    }
    this.setState({real_location})
  }

  findDistance(){
    var latitudeDistance1 = this.getLatitudeDistance(this.state.real_location); //a1
    var latitudeDistance2 = this.getLatitudeDistance(this.state.coord); //a2
    var longitudeDistance1 = this.getLongitudeDistance(this.state.real_location); //b1
    var longitudeDistance2 = this.getLongitudeDistance(this.state.coord); //b2
    // (X2 * a2 - X1 * a1) ^ 2
    var power1 = Math.pow((this.state.coord.latitude * latitudeDistance2) - (this.state.real_location.latitude * latitudeDistance1), 2);
    // (Y2 * b2 - Y1 * b1) ^ 2
    var power2 = Math.pow((this.state.coord.longitude * longitudeDistance2) - (this.state.real_location.longitude * longitudeDistance1), 2);
    let distance = Math.sqrt(power1 + power2);
    this.setState({ distance })
  };

  checkStatus(){
    this.updateLocation()
    this.findDistance()
    if(this.state.distance<=20){
      this.setState({
        clockMethod:0,
        clockStatus:1,
      })
      this.callApiAttendance()
      console.log("clock status : "+this.state.clockStatus)
      console.log("btn path : "+this.state.screenDetail.assetBtn[this.state.clockMethod])
    }
    else if(this.state.distance>20){
      this.setState({ clockMethod:1 })
    }
  }

  callApiAttendance(){
    console.log("callApiAttendance")
    post_attendance()
    .then(result => {
      this.setState({clockStatus : result.clock_event})
    })
    .catch(error => {

    })
  }

  componentWillMount = () => {
    this.checkStatus()
    this.setState({
      curTime: moment().format("h:mm:ss"),
    })
  }

  componentDidMount(){
    timer.setInterval('UpdateTime', () => {
      this.setState( {curTime : moment().format("h:mm:ss")})
    }, 1000);
    console.log("DidMount")
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
            {this.state.screenDetail.description[this.state.clockMethod]}
          </Text>
          <Text style={styles.timeText}>
            {this.state.curTime}
          </Text>
          <TouchableOpacity
            onPress= {() => this.props.navigation.navigate('Manual')}
            style={styles.clockBtn}
          >
            <Image style={styles.clockBtnImage}
              source= {this.state.screenDetail.assetBtn[this.state.clockStatus]}
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
