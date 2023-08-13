import ActionType, { INCREMENT, DECREMENT, CHANGE_BY_AMOUNT } from "./ActionType"

const initialState = {
    isInit : true,

    isSearchInput : false ,
    isSearchOn : false,

    isSelectMode : false,
    arrSelectedDataId : [],

    isDeleteAlert : false,

    originData : [],
    data : [],
    count : 0,

    searchText : '',
    isSortPannelOn : false
}

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SET_IS_INIT :
            return {
                ...state, isInit : action.payload
            };
        
        default:
            return state;
    }
}