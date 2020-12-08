import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import { styles } from './styles/AppStyles';
import CurrentWeather from './components/CurrentWeather';
import Geolocation from '@react-native-community/geolocation';
import WeatherList from './components/WeatherList';

const App = () => {

  useEffect(() => {
    Geolocation.getCurrentPosition(info => console.log(info));
  }, []);

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[styles.mainContainer, styles.upperContianer]}>
        <View style={[styles.upperContianer]}>
          <CurrentWeather/>
        </View>
        <View style={[styles.lowerContainer]}>
          <WeatherList/>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default App;
