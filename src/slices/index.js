import { combineReducers } from 'redux'

import fetchRocketDetailsReducer from './fetchRocketDetails'

const rootReducer = combineReducers({
    rocketDetails: fetchRocketDetailsReducer,
})

export default rootReducer
