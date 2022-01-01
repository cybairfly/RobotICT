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
    const range = {
        start: +start,
        end: +end,
    };

    const handleChange = {
        start: range =>
            /** @param {Event & {target: HTMLInputElement}} event */
            event => {
                const { target, target: {value} } = event;
                const {start, end} = range;

                if (value >= end) {
                    target.classList.add('is-invalid');
                    target.setCustomValidity('Range start must be less than end');
                } else {
                    target.setCustomValidity('');
                    [
                        target,
                        document.querySelector('input[name="start"]'),
                        document.querySelector('input[name="end"]'),
                    ].forEach(node => node.classList.remove('is-invalid'));
                }

                setStart(value);
            },
        end: range =>
            /** @param {Event & {target: HTMLInputElement}} event */
            event => {
                const { target, target: {value} } = event;
                const {start, end} = range;
                
                if (value <= start) {
                    target.classList.add('is-invalid');
                    target.setCustomValidity('Range start must be less than end');
                } else {
                    target.setCustomValidity('');
                    [
                        target,
                        document.querySelector('input[name="start"]'),
                        document.querySelector('input[name="end"]'),
                    ].forEach(node => node.classList.remove('is-invalid'));
                }

                setEnd(value);
            },
    };

    return (
        <div className='section'>
            <form className='needs-validation' onSubmit={event => onRangeChange(event)(range, setBatchId)}>
                <div className='section-header'>
                    <h2>Range</h2>
                    <button type="submit" className='btn btn-success'>Update</button>
                </div>

                <input required className='range' type="number" min="1" max="100" name="start" value={start} onChange={handleChange.start(range)} />
                <input required className='range' type="number" min="1" max="100" name="end" value={end} onChange={handleChange.end(range)} />
                <div className="invalid-feedback">Please provide two unequal consecutive numbers.</div>

            </form>
        </div>
    );
};
