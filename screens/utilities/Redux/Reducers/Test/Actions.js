import ActionType from "./ActionType"

export const incrementAction = () => ({
    type: ActionType.INCREMENT,
})

export const decrementAction = () => ({
    type: ActionType.DECREMENT,
})

export const changeByAmount = (val) => ({
    type: ActionType.CHANGE_BY_AMOUNT,
    payload: val,
})