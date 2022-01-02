import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Records } from '../db/records';
import { Batches } from '../db/batches';

export const History = ({ onResetHistory, setBatchId }) => {
    /** @type {[import('../types').batch]} */
    const batches = useTracker(() => {
        // Meteor.subscribe('batches', {id: batchId});
        // const filter = batchId ? {id: batchId} : {};
        return Batches.find({}, { sort: { id: -1 } }).fetch();
    });

    return (
        <div className='section'>
            <div className='section-header'>
                <h2>History</h2>
                <button type="submit" className='btn btn-danger' onClick={onResetHistory}>Remove</button>
            </div>
            {
                batches.map(batch => (
                    <div key={batch.id} className='batch'>
                        <pre>
                            <p>Batch number {batch.id}</p>
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
                            <button type="submit" className='btn btn-success' onClick={event => setBatchId(batch.id)}>Preview</button>
                        </pre>

                    </div>
                ))
            }
        </div>
    );
};
