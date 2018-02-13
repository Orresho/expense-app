import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filters';
import expensesReducer from '../reducers/expenses';

// Store creation
export default () => {

    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        })
    );
    return store;
}


