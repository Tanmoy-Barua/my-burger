import * as actionTypes from './actionTypes'

const IngredientPrice = {
    Salad: 10,
    Cheese: 30,
    Meat: 60
}

const INITIAL_STATE = {
    ingredients: [
        {type: 'Salad', amount: 0},
        {type: 'Cheese', amount: 0},
        {type: 'Meat', amount: 0}
    ],
    totalPrice: 50,
    purchaseAble: false,
    orders: [],
    orderLoading: true,
    orderError: false,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMessage: null
}

export const reducer = (state=INITIAL_STATE, action) => {
    const ingredient = [...state.ingredients];
    switch(action.type){
        case actionTypes.ADD_INGRATIENT:
        for(let item of ingredient){
            if(item.type === action.payload) item.amount++;
        }
        return{
            ...state,
            ingredients: ingredient,
            totalPrice: state.totalPrice + IngredientPrice[action.payload]
        }

        case actionTypes.REMOVE_INGRATIENT:
        for(let item of ingredient){
            if(item.type === action.payload) {
                if(item.amount === 0)return state;
                item.amount--;
            }

        }
        return{
            ...state,
            ingredients: ingredient,
            totalPrice: state.totalPrice - IngredientPrice[action.payload]
        }

        case actionTypes.UPDATE_PURCHASEABLE:
            const sum = state.ingredients.reduce((sum, ele)=>{
                return sum+ele.amount
            }, 0)
            return{
                ...state,
                purchaseAble: sum > 0 
            }
        case actionTypes.RESET_INGRATIENT:
            return {
                ...state,
                ingredients: [
                    {type: 'Salad', amount: 0},
                    {type: 'Cheese', amount: 0},
                    {type: 'Meat', amount: 0}
                ],
                totalPrice: 50,
                purchaseAble: false
            }
        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for(let key in action.payload){
                orders.push({...action.payload[key], id: key})

            }
            return {
                ...state,
                orders: orders,
                orderLoading: false
            }
        case actionTypes.ORDERS_LOAD_FAILED:
            return {
                ...state,
                orderError: true,
                orderLoading: false,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token: null,
                userId: null,
                authFailedMessage: null
            }
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMessage: action.payload
            }
        default:
            return state;
    }
}