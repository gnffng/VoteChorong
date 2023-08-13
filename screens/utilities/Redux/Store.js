import { configureStore, combineReducers } from "@reduxjs/toolkit"

import testReducer from "./Reducers/Test/Reducer"
import mainReducer from "./Reducers/Main/Reducer"

export default configureStore({
    reducer : {
        test : testReducer,
        main : mainReducer
    }
});