import { createStore, applyMiddleware } from 'redux'

import rootReducer from '../reducers'
import api from '../services/HolidayService'

const configureStrore = preloadedState => createStore (
    rootReducer,
    preloadState,
)