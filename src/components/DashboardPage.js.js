import React from 'react'
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters'

const DasboardPage = () => (
    <div>
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default DasboardPage;