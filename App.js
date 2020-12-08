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
import { api } from './API/Handler';
import { connect } from 'react-redux';
import { updateWeatherReports } from './actions/weatherReports';

const App = ({ updateData }) => {

  const getWeatherUpdates = () => {
    let lat = "", lon = "";
    Geolocation.getCurrentPosition(async (info) => {
      lat = info.coords.latitude;
      lon = info.coords.longitude;
      let data = await api.get(`onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=10f7b04172ede9554ad5d285d095b56a`);
      data.data.daily.shift();
      data.data.daily.length = 5;
      console.log(data.data);
      updateData(data.data);
    });
  }

  useEffect(() => {
    getWeatherUpdates();
  }, []);


  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[styles.mainContainer, styles.upperContianer]}>
        <View style={[styles.upperContianer]}>
          <CurrentWeather />
        </View>
        <View style={[styles.lowerContainer]}>
          <WeatherList />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  data: state.weatherReports,
  isLoading: state.weatherReports.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (data) => dispatch(updateWeatherReports(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
