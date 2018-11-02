import React from 'react';
import { Location, Permissions } from 'expo';

import post_attendance from './api/post_m_attendance'

function getSurfaceDistance(location) {
  var BETWEEN_DEGREE = 15.00;
  var THOUSAND_METER = 1000;
  var SURFACE_DISTANCE_PER_ONE_DEGREE = [
    { latitude : 110.574, longitude : 111.320 }, //0  degree
    { latitude : 110.649, longitude : 107.551 }, //15 degree
    { latitude : 110.852, longitude : 96.486 },  //30 degree
    { latitude : 111.132, longitude : 78.847 },  //45 degree
    { latitude : 111.412, longitude : 55.800 },  //60 degree
    { latitude : 111.618, longitude : 28.902 },  //75 degree
    { latitude : 111.694, longitude : 0.000 }    //90 degree
  ];
  var coord = { latitude:13.789262, longitude:100.579949 },
  var real_location = { latitude:13.789262, longitude:100.579949 },
  var location =  null,
  var errorMessage = null,
  var distance = null,
  var radius = 20,
  var status = null,
  var counter = 0,
  var workStatus = false,

  var getSurfaceDistance = SURFACE_DISTANCE_PER_ONE_DEGREE[parseInt(location.latitude / BETWEEN_DEGREE)]; //depend on latitude

  var getLatitudeDistance = getSurfaceDistance.latitude * this.THOUSAND_METER;

  var getLongitudeDistance = getSurfaceDistance.longitude * this.THOUSAND_METER;

  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    console.log('Permission to access location was denied'),
  }
  let location = await Location.getCurrentPositionAsync({});
  this.setState({ location });

  const updateLocation = async() => {
    let location = await Location.getCurrentPositionAsync({});
    let real_location = {}
    this.setState({ location });
    if (this.errorMessage) {
      text = this.errorMessage;
    } else if (this.location) {
      real_location.latitude = this.location.coords.latitude
      real_location.longitude = this.location.coords.longitude
    }
    this.setState({real_location})
  }

  const findDistance = () =>{
    var latitudeDistance1 = this.getLatitudeDistance(this.real_location); //a1
    var latitudeDistance2 = this.getLatitudeDistance(this.coord); //a2
    var longitudeDistance1 = getLongitudeDistance(this.real_location); //b1
    var longitudeDistance2 = getLongitudeDistance(this.coord); //b2
    // (X2 * a2 - X1 * a1) ^ 2
    var power1 = Math.pow((this.coord.latitude * latitudeDistance2) - (this.real_location.latitude * latitudeDistance1), 2);
    // (Y2 * b2 - Y1 * b1) ^ 2
    var power2 = Math.pow((this.coord.longitude * longitudeDistance2) - (this.real_location.longitude * longitudeDistance1), 2);
    let distance = Math.sqrt(power1 + power2);
    this.setState({ distance })
  };

  const checkStatus = () => {
    counter = this.counter
    if(this.distance <= this.radius && !this.setState.workStatus){
      console.log("if")
      this.setState({status : true})
      this.setState({counter: ++counter})
      this.setState({workStatus: true})
      console.log("update counter : " + this.counter)
    } else if(this.distance > this.radius && this.setState.workStatus) {
      console.log("else if")
      this.setState({status : false})
      this.setState({counter: ++counter})
      this.setState({workStatus: false})
      console.log("update counter : " + this.counter)
    } else{
      console.log("else")
      this.setState({status : false})
      this.setState( {counter: 0})
      console.log("update counter : " + this.counter)
    }
  }
}