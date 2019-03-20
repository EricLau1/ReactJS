import { 
    CUSTOMER_LIST, 
    CUSTOMER_CREATE, 
    CUSTOMER_UPDATE, 
    CUSTOMER_DESTROY, 
    CUSTOMER_SORT,
    CUSTOMER_SEARCH,
    CUSTOMER_PREPARE
} from "../actions/types";


export default (state = { customers: [], orderBy: 'asc' }, action) => {
    switch(action.type) {
        case CUSTOMER_LIST:
            return { 
                ...state, 
                customers: action.customers 
            };
        case CUSTOMER_CREATE:
            return {
                ...state,
                customers: state.customers.concat(action.customer)
            };
        case CUSTOMER_UPDATE:
            return {
                ...state,
                customers: state.customers.map( _customer => (_customer.id === action.customer.id)? action.customer : _customer)
            }
        case CUSTOMER_DESTROY:
            return {
                ...state,
                customers: state.customers.filter(_customer => _customer.id !== action.id)
            }
        case CUSTOMER_PREPARE:
            return {
                ...state,
                customer: action.customer,
            };
        case CUSTOMER_SORT:
            return {
                ...state,
                orderBy: action.orderBy
            }
        case CUSTOMER_SEARCH:
            return {
                ...state,
                searchBy: action.searchBy
            }
        default: 
            return state;
    }
}