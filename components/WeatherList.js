import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from '../styles/AppStyles';
import { api } from '../API/Handler';
import Config from 'react-native-config';
import Geolocation from '@react-native-community/geolocation';
import { days } from '../constants/weatherMap';


const WeatherList = () => {
	const [ data, setData ] = useState({});

	const getWeatherUpdates = () => {
		let lat = '',
			lon = '';
		Geolocation.getCurrentPosition(async (info) => {
			lat = info.coords.latitude;
			lon = info.coords.longitude;
			let data = await api.get(
				`onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=10f7b04172ede9554ad5d285d095b56a`
            );
            data.data.daily.shift();
            data.data.daily.length = 5;
            console.log(data.data.daily.length);
			setData(data.data);
		});
	};

	useEffect(() => {
		getWeatherUpdates();
	}, []);

	return (
		<View style={[ styles.lowerContainer ]}>
			{data.daily &&
				data.daily.map((item) => {
					return (
						<View
							key={item.dt}
							style={{
								width: '90%',
								borderWidth: 1,
								marginVertical: 4,
								borderRadius: 5,
								alignSelf: 'center',
								alignItems: 'center',
								backgroundColor: '#f5fbff',
								borderColor: '#8ad2ff',
								shadowOffset: { width: 0, height: 4 },
								shadowColor: '#0000001A',
								flexDirection: 'row',
                                alignContent: 'center',
                                paddingHorizontal: 20,
                                justifyContent: 'space-between'
							}}
                        >
                        <View style={{
                        }}>
                            <Text style={{fontSize: 16}}>{days[new Date(item.dt*1000).getDay()]}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Image
                            source={{
                                uri: `https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@4x.png`
                            }}
                            style={{
                                height: 60,
                                width: 60,
                                
                            }}
                        />
                        <Text style={{fontSize: 12}}>{item.temp.min} °F</Text>
                        </View>
						</View>
					);
				})}
		</View>
	);
};

export default WeatherList;
