import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

export class Rules extends React.Component {
    /**
     * Define rules for the batch of numbers
     * @param {Object} props
     * @param {import('../types').rules} props.rules
     * @param {import('../types').onRulesChange} props.onRulesChange
     */
    constructor(props) {
        super(props);
        this.state = { rules: props.rules };
        this.setBatchId = props.setBatchId;
        this.onRulesChange = props.onRulesChange;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    injectInputs() {
        return this.state.rules.map(([divisor, label], index) =>
            <div key={index}>
                <input required type="number" min="1" max="1000" name="divisor" value={divisor} onChange={this.handleChangeDivisor.bind(this, index)}></input>
                <input required type="text" name="label" value={label} onChange={this.handleChangeLabel.bind(this, index)}></input>
                <input type='button' value='Remove' className='btn btn-sm btn-outline-danger' onClick={this.handleRemove.bind(this, index)} />
            </div>,
        );
    }

    handleChangeDivisor(index, event) {
        const rules = [...this.state.rules];
        rules[index][0] = +event.target.value;
        this.setState({ rules });
    }

    handleChangeLabel(index, event) {
        const rules = [...this.state.rules];
        rules[index][1] = event.target.value;
        this.setState({ rules });
    }

    handleAddRule() {
        this.setState(prevState => ({ rules: [...prevState.rules, [1, '']] }));
    }

    handleRemove(index) {
        const rules = [...this.state.rules];
        rules.splice(index, 1);
        this.setState({ rules });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.onRulesChange(event)(this.state.rules, this.setBatchId);
    }

    render() {
        return (
            <div className='section'>
                <form onSubmit={this.handleSubmit}>
                    <div className='section-header'>
                        <h2>Rules</h2>
                        <input type="submit" className='btn btn-success' value="Update" />
                    </div>

                    {this.injectInputs()}
                    <input type='button' value='Add rule' className='btn btn-sm btn-outline-primary' onClick={this.handleAddRule.bind(this)} />
                </form>
            </div>
        );
    }
}
