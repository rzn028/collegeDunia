import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native';
import { styles } from './styles/AppStyles';
import CurrentWeather from './components/CurrentWeather';
import Geolocation from '@react-native-community/geolocation';
import WeatherList from './components/WeatherList';
import { api } from './API/Handler';
import { connect } from 'react-redux';
import { updateWeatherReports, updateIsLoading, setIsErrorOccured } from './actions/weatherReports';
import LottieView from 'lottie-react-native';

const App = ({ updateData, isLoading, setIsLoading, setIsErrorOccured, isError }) => {

  const getWeatherUpdates = () => {
    let lat = "", lon = "";
    setIsLoading(true);
    Geolocation.getCurrentPosition(async (info) => {
      lat = info.coords.latitude;
      lon = info.coords.longitude;
      let data = await api.get(`onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=10f7b04172ede9554ad5d285d095b56a&units=metric`);
      if (data.ok) {
        data.data.daily.shift();
        data.data.daily.length = 5;
        updateData(data.data);
        setIsErrorOccured(false);
      } else {
        setIsErrorOccured(true);
      }
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
          !isLoading && !isError && (
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
        {
          !isLoading && isError && (
            <View style={{
              flex: 1,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LottieView style={{ height: 200, width: 200 }} source={require('./assests/error.json')} autoPlay loop />
              <Text style={{
                fontSize: 35,
                paddingHorizontal: 20,
                marginBottom: 40
              }}>Oops something went wrong.</Text>
              <TouchableOpacity style={[styles.retryButton]}
                onPress={getWeatherUpdates}
              >
                <Text style={{
                  color: '#ffffff'
                }}>Retry</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </SafeAreaView>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  data: state.weatherReports,
  isLoading: state.weatherReports.isLoading,
  isError: state.weatherReports.isErrorOccured
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (data) => dispatch(updateWeatherReports(data)),
  setIsLoading: (isLoading) => dispatch(updateIsLoading(isLoading)),
  setIsErrorOccured: (isErrorOccured) => dispatch(setIsErrorOccured(isErrorOccured))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
