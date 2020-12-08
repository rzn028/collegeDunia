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
import { updateWeatherReports, updateIsLoading } from './actions/weatherReports';
import LottieView from 'lottie-react-native';

const App = ({ updateData, isLoading, setIsLoading }) => {

  const getWeatherUpdates = () => {
    let lat = "", lon = "";
    setIsLoading(true);
    Geolocation.getCurrentPosition(async (info) => {
      lat = info.coords.latitude;
      lon = info.coords.longitude;
      let data = await api.get(`onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=10f7b04172ede9554ad5d285d095b56a&units=metric`);
      data.data.daily.shift();
      data.data.daily.length = 5;
      updateData(data.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getWeatherUpdates();
  }, []);


  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[styles.mainContainer, styles.upperContianer]}>
        {
          isLoading && (
            <LottieView source={require('./assests/loader.json')} autoPlay loop />
          )
        }
        {
          !isLoading && (
            <React.Fragment>
              <View style={[styles.upperContianer]}>
                <CurrentWeather />
              </View>
              <View style={[styles.lowerContainer]}>
                <WeatherList />
              </View>
            </React.Fragment>
          )
        }
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
  setIsLoading: (isLoading) => dispatch(updateIsLoading(isLoading))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
