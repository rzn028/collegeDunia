const defaultState = {
    current: { 
        weather: []
     },
    daily: [  ],
    isLoading: true,
    isErrorOccured: false,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_WEATHER_DATA':
            return {
                ...state,
                ...action.data
            };
        case 'UPDATE_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            };
        case 'ERROR_OCCURED':
            return {
                ...state,
                isErrorOccured: action.isErrorOccured
            };
        default:
            return state;
    }
};