import ActionType from "./ActionType"

export const setIsInitAction = (val) => ({
    type: ActionType.SET_IS_INIT,
    payload: val,
})
