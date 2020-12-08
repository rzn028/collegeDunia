import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import { styles } from '../styles/AppStyles';
import { connect } from 'react-redux';

const CurrentWeather = ( { data } ) => {
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

const mapStateToProps = (state) => ({
  data: state.weatherReports
});


export default connect(mapStateToProps)(CurrentWeather);
