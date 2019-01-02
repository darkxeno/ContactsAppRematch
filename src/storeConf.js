//import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';
import { lensesReducer, createLensesMiddleware, Actions as KafkaActions } from 'redux-lenses-streaming';
import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import models from './models';
import { sessionReducer, INITIAL_STATE } from './models/kafkaSession/reducer';

const loading = createLoadingPlugin({});

const options = INITIAL_STATE;
console.log('Using kafka options:', options);
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

store.dispatch(KafkaActions.connect(options));

setTimeout(()=>store.dispatch(KafkaActions.subscribe({sqls: "SELECT * FROM `contactsWithStats` WHERE _vtype='JSON' AND _ktype='BYTES' AND _sample=2 AND _sampleWindow=200"})),5000);

export default store;
