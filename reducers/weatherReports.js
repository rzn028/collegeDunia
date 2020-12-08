const defaultState = {
    current: { },
    daily: { },
    isLoading: true
}

export default (state = defaultState, action) => {

    switch (action.type) {
        case 'UPDATE_WEATHER_DATA':
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};