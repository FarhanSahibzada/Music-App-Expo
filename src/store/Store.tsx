import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SongReducer from './Songslice'


const persistConfig = {
    key : 'AppData',
    storage : AsyncStorage ,
    whitelist : ['tracks' , 'favouritetrack' ]
}

const presistedReducer = persistReducer(persistConfig , SongReducer)


export const Store = configureStore({
    reducer : presistedReducer,
    middleware : (getDeafaultMiddleware) => 
        getDeafaultMiddleware({
            serializableCheck : false
        })
    
})



export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const Presistor = persistStore(Store)