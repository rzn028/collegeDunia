const defaultState = {
    current: { 
        weather: []
     },
    daily: [  ],
    isLoading: true
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
        default:
            return state;
    }
};