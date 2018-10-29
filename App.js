import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, Location, Permissions, Notifications } from 'expo';
import AppNavigator from './navigation/AppNavigator';

const timer = require('react-native-timer');

export default class App extends React.Component {
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
    isLoadingComplete: false,
    coord: { latitude:13.789262, longitude:100.579949 },
    real_location: { latitude:13.789262, longitude:100.579949 },
    location: null,
    errorMessage: null,
    distance: null,
    radius: 20,
    status: null,
    counter: 0,
    workStatus: false,
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

  componentWillMount = async () => {
    await this._getLocationAsync()
  }

  componentDidMount() {
    console.log("Did Mount")
    timer.setInterval('UpdateGPSInterval', () => {
      console.log("Interval"),
      this.updateLocation(),
      this.findDistance(),
      this.checkStatus(),
      console.log(this.state.real_location),
      console.log(this.state.distance),
      console.log(this.state.status)
    }, 60000);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

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
    counter = this.state.counter
    if(this.state.distance <= this.state.radius && !this.setState.workStatus){
      console.log("if")
      this.setState({status : true})
      this.setState({counter: ++counter})
      this.setState({workStatus: true})
      console.log("update counter : " + this.state.counter)
    } else if(this.state.distance > this.state.radius && this.setState.workStatus) {
      console.log("else if")
      this.setState({status : false})
      this.setState({counter: ++counter})
      this.setState({workStatus: false})
      console.log("update counter : " + this.state.counter)
    } else{
      console.log("else")
      this.setState({status : false})
      this.setState( {counter: 0})
      console.log("update counter : " + this.state.counter)
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator screenProps={{x:1}}/>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
