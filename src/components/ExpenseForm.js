import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Check whether expense has any values
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: '',
            buttonText: ''
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    }

    onDateChange = (createdAt) => {
        // If there is a created at value, set state
        if (createdAt) {
            this.setState(() => ({ createdAt }))
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please fill in the forms' }));

        } else {
            this.setState(() => ({ error: '' }))

            // Object argument from AddExpensePage populated here with the values
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note

            })

        }
    }

    render() {
        return (
            <div>
                <p>{this.state.error}</p>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />

                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}

                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <div>
                        <textarea
                            placeholder="Add a note for your expense(optional)"
                            value={this.state.note}
                            onChange={this.onNoteChange}
                        ></textarea>
                    </div>
                    <button>
                        {this.state.amount !== '' && (this.state.buttonText = 'Edit Expenses')}
                        {this.state.amount === '' && (this.state.buttonText = 'Add Expenses')}
                    </button>
                </form>
            </div>
        )
    }
}