const stateInicial = {
    item: [],
    allItems: []
}

function rootReducer (state = stateInicial, action) {
    switch(action.type) {
        case 'GET_ITEM' :
            return {
                ...state,
                item: action.payload,
                allItems: action.payload,
            }
        // case 'CLEAN_DETAIL':
        //     return {
        //         ...state,
        //         detail: [],
        //     }
        default:
            return state
    }
}

export default rootReducer