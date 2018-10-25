import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native'
import { WebBrowser } from 'expo'

// front-end
import { Appbar, Button } from 'react-native-paper';
import Colors from '../constants/Colors'
import { MonoText } from '../components/StyledText'
import { FontAwesome } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content center
            title="MetroOne"
          />
        </Appbar.Header>
        <View style={styles.timeContainer}>
          <Text style={styles.clockInTypeText}>
            Manual clock in
          </Text>
          <Text style={styles.timeText}>
            14:12
          </Text>
          {/* <Button
            style={styles.clockBtn}
            icon = {{ name: 'sign-in', type: 'font-awesome', color: 'green', size: 80 }}
            buttonStyle={{
              backgroundColor: "#fff",
              width: 150,
              height: 150,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 100
            }}
          /> */}
          <Button onPress={() => console.log('Pressed')} icon={({}) => (
            <Image
              source={require('../assets/icons/btn_main_clock_in.png')}
              style={{ width: 150, height: 150, textAlign: 'center' }}
            />
          )}>
          </Button>
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

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  line: {
    borderWidth: 0.5,
    borderColor: '#000',
    height: 50,
    width: 1
  },
  clockBtn: {
    paddingVertical: 20
  },
  timeContainer: {
    paddingVertical: 40,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
  },
  clockInTypeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  timeText: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center'
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
