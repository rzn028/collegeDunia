import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import { styles } from '../styles/AppStyles';
import { api } from '../API/Handler';
import Config from 'react-native-config';
import Geolocation from '@react-native-community/geolocation';

const CurrentWeather = () => {

  const [ data, setData ] = useState({});

  const getWeatherUpdates = () => {
    let lat = "", lon = "";
    Geolocation.getCurrentPosition(async (info) => {
      lat = info.coords.latitude;
      lon = info.coords.longitude;
      const data = await api.get(`onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=10f7b04172ede9554ad5d285d095b56a`)
      setData(data.data);
    });
  }

  useEffect(() => {
    getWeatherUpdates();
  }, []);

  return (
      <View style={[styles.currentWeather]}>
      <View style={{
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${data?.current?.weather[0]?.icon}@4x.png`
          }}
          style={{height: 200, width: 200, alignSelf: 'center'}}
        />
        </View>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          alignSelf: 'center'
        }}>{data?.current?.weather[0]?.main}
        </Text>
        <Text style={{
          fontSize: 22,
          alignSelf: 'center',
        }}>{data?.current?.temp} °F</Text>

      </View>
  );
};

export default CurrentWeather;
