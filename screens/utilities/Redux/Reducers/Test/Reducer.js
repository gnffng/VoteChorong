import ActionType from "./ActionType"

const initialState = {
    test : 15 ,
    amount: 0 ,
    
}

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.INCREMENT:
            return { 
                ...state, amount: state.amount + 1
            };
        case ActionType.DECREMENT:
            return { 
                ...state, amount: state.amount - 1
            };
        case ActionType.CHANGE_BY_AMOUNT:
            return { 
                ...state, amount: Number(state.amount) + Number(action.payload)
            };
        default:
            return state;
    }
}