import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from '../styles/AppStyles';
import { connect } from 'react-redux';
import { days } from '../constants/weatherMap';


const WeatherList = ( {data} ) => {

	return (
		<View style={[ styles.lowerContainer ]}>
			{data?.daily &&
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

const mapStateToProps = (state) => ({
	data: state.weatherReports
  });
  

export default connect(mapStateToProps)(WeatherList);
