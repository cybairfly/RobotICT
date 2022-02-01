import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Batches } from '../db/batches';

/**
 * Enable listing and preview of previously submitted batches
 */
export const History = ({ onResetHistory, setBatchId }) => {
    /** @type {[types.batch]} */
    const batches = useTracker(() => {
        Meteor.subscribe('batches');
        return Batches.find({}, { sort: { id: -1 } }).fetch();
    });

    return (
        <div className='section'>
            <div className='section-header'>
                <h3>History</h3>
                <button type="submit" className='btn btn-danger' onClick={onResetHistory}>Remove</button>
            </div>
            {
                batches.map(batch => (
                    <div key={batch.id} className='batch'>
                        <pre>
                            <div className='section-header'>
                                <p>Batch number {batch.id}</p>
                                <button type="submit" className='btn btn-success' onClick={event => setBatchId(batch.id)}>Preview</button>
                            </div>
                            <p>Range</p>
                            <p>
                                <input type={'number'} value={batch.input.range.start} disabled readOnly />
                                <input type={'number'} value={batch.input.range.end} disabled readOnly />
                            </p>
                            <p>Rules</p>
                            {
                                batch.input.rules.map(([divisor, label]) => (
                                    <p key={divisor}>
                                        <input type={'number'} value={divisor} disabled readOnly />
                                        <input type={'text'} value={label} disabled readOnly />
                                    </p>
                                ))
                            }
                        </pre>

                    </div>
                ))
            }
        </div>
    );
};
