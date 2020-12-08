export const updateWeatherReports = (data) => {
    return {
        type: 'UPDATE_WEATHER_DATA',
        data
    };
}

export const updateIsLoading = (isLoading) => {
    return {
        type: 'UPDATE_LOADING',
        isLoading: isLoading
    };
}

export const setIsErrorOccured = (isErrorOccured) => {
    return {
        type: 'ERROR_OCCURED',
        isErrorOccured
    }
}