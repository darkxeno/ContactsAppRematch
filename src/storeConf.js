//import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import { lensesReducer, createLensesMiddleware } from 'redux-lenses-streaming';
import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import models from './models';
import { sessionReducer, INITIAL_STATE } from './models/kafkaSession/reducer';

const loading = createLoadingPlugin({});

const options = {
  host: INITIAL_STATE.host,
  clientId: INITIAL_STATE.clientId,
};
const lensesWsMiddleware = createLensesMiddleware(options);
const logger = createLogger({ collapsed: true });
const middlewares = [logger, lensesWsMiddleware];

const store = init({
  models,
  plugins: [loading],
  redux: {
  	middlewares,
    reducers: {
      form: formReducer,
      session: sessionReducer,
  	  lenses: lensesReducer,
    }
  }
});

export default store;
