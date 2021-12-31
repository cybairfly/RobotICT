import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { names } from '../config';

const {updateRecords, updateRange} = names.methods;
/**
 * Change the range of numbers used by the generator
 * @param {Object} props
 * @param {import('../types').onRangeChange} props.onRangeChange
 */
export const Range = ({onRangeChange, setBatchId}) => {
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(100);
    const range = {start, end};

    // TODO validation
    const handleChange = {
        start: event => {
            const { value } = event.target;

            if (value < end)
                setStart(value);
            else
                setStart(value);
        },
        end: event => {
            const { value } = event.target;

            if (value < start)
                setEnd(value);
            else
                setEnd(value);
        },
    };

    return (
        <div>
            <h2>Range</h2>
            <form onSubmit={event => onRangeChange(event)(range, setBatchId)}>
                <input required type="number" min="1" max="1000" name="start" value={start} onChange={handleChange.start}></input>
                <input required type="number" min="1" max="1000" name="end" value={end} onChange={handleChange.end}></input>

                <button type="submit">Update</button>
            </form>
        </div>
    );
};
