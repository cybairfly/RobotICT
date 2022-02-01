import React, { useState } from 'react';

export class Rules extends React.Component {
    /**
     * Define rules for the batch of numbers
     * @param {Object} props
     * @param {types.rules} props.rules
     */
    constructor(props) {
        super(props);
        const { rules, setRules } = props;
        this.state = { rules };
        this.setRules = setRules;
    }

    injectInputs() {
        return this.state.rules.map(([divisor, label], index) =>
            <div key={index} className='input-group nowrap'>
                <div className="input-group-prepend">
                    <span className="input-group-text">Divisor:</span>
                </div>
                <input required type="number" className='rules-divisor' min="1" max="100" name="divisor" value={divisor} onChange={this.handleChangeDivisor.bind(this, index)}></input>
                <div className="input-group-prepend">
                    <span className="input-group-text">Label:</span>
                </div>
                <input required type="text" className='rules-label' size={20} name="label" value={label} onChange={this.handleChangeLabel.bind(this, index)}></input>
                <input type='button' value='X' className='remove btn btn-sm btn-outline-danger' onClick={this.handleRemove.bind(this, index)} />
            </div>,
        );
    }

    handleChangeDivisor(index, event) {
        const rules = [...this.state.rules];
        rules[index][0] = +event.target.value;
        this.setState({ rules });
        this.setRules(rules);
    }

    handleChangeLabel(index, event) {
        const rules = [...this.state.rules];
        rules[index][1] = event.target.value;
        this.setState({ rules });
        this.setRules(rules);
    }

    handleAddRule() {
        this.setState(prevState => ({ rules: [...prevState.rules, []] }));
        this.setRules(this.state.rules);
    }

    handleRemove(index) {
        const rules = [...this.state.rules];
        rules.splice(index, 1);
        this.setState({ rules });
        this.setRules(rules);
    }

    render() {
        return (
            <div className='section'>
                <h3>Rules</h3>
                {this.injectInputs()}
                <input type='button' value='Add rule' className='btn btn-sm btn-outline-primary' onClick={this.handleAddRule.bind(this)} />
            </div>
        );
    }
}
