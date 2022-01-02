import React, { useState } from 'react';
import { Range } from './Range.jsx';
import { Rules } from './Rules.jsx';
import { handlers } from '../handlers';
import config from '../config';

/**
//  * Remove all records from the database
 * @param {import('../handlers')} handlers
 */
export const Inputs = ({ setBatchId }) => {
    const [range, setRange] = useState({ ...config.input.default.range });
    const [rules, setRules] = useState([...config.input.default.rules]);

    const handleSubmit = event => {
        event.preventDefault();
        const input = {range, rules};
        handlers.onInputSubmit(event)(input, setBatchId);
    };

    return (
        <div>
            <form className='needs-validation' onSubmit={handleSubmit}>
                <Range range={range} setRange={setRange} handleSubmit={handleSubmit} />
                <Rules rules={rules} setRules={setRules} handleSubmit={handleSubmit} />
                <button type="submit" className='btn btn-success'>Update</button>
            </form>
        </div>
    );
};
