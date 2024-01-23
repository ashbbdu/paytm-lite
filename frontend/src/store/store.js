import { configureStore , combineReducers } from '@reduxjs/toolkit'
import bankSlice from './slices/bankSlice';
import userSlice from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import {thunk} from 'redux-thunk';

const persistConfig = {
    key: 'root',
    version : 1,
    storage,
  }

  const reducers = combineReducers({
    user :  userSlice,
    bank : bankSlice
  })
  
  const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
        },
      }).concat(thunk),
})


export const persistor = persistStore(store);

export default store;