import {
  StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#e6efff'
    },
    upperContianer: {
        flex: 1
    },
    lowerContainer: {
        flex: 1,
        paddingBottom: 10
    },
    currentWeather: {
        flex: 1,
        justifyContent: 'center'
    },
    retryButton: {
        backgroundColor: '#0070e0',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 5
    }
});