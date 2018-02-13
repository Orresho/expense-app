import React from 'react';
import { removeExpense } from '../actions/expenses';
import { connect } from 'react-redux';

const ExpenseListItem = ({ dispatch, description, amount, createdAt, id }) => (
    <div>
        <p>Description: {description} </p>
        <p>Amount: {amount}</p>
        <p>Created at: {createdAt}</p>
        <button onClick={() => {
            dispatch(removeExpense({ id }));
        }}>Remove</button>
    </div>
);

export default connect()(ExpenseListItem);