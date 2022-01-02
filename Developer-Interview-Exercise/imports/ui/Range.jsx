import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import config from '../config';

/**
 * Change the range of numbers used by the generator
 * @param {Object} props
 * @param {import('../types').onRangeSubmit} props.onRangeSubmit
 */
export const Range = ({ range, setRange }) => {
    const handleChange = {
        start: range =>
            /** @param {Event & {target: HTMLInputElement}} event */
            event => {
                const { target, target: { value } } = event;
                const { start, end } = range;

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

                setRange({...range, start: +value});
            },
        end: range =>
            /** @param {Event & {target: HTMLInputElement}} event */
            event => {
                const { target, target: { value } } = event;
                const { start, end } = range;

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

                setRange({...range, end: +value});
            },
    };

    return (
        <div className='section'>
            <h2>Range</h2>
            <input required className='range' type="number" min="1" max={+range.end - 1} name="start" value={range.start} onChange={handleChange.start(range)} />
            <input required className='range' type="number" min={+range.start + 1} max="100" name="end" value={range.end} onChange={handleChange.end(range)} />
            <div className="invalid-feedback">Please provide two unequal consecutive numbers.</div>
        </div>
    );
};
