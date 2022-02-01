<script>
import { Meteor } from 'meteor/meteor';
// import React, { useState } from 'react';
// import { useTracker } from 'meteor/react-meteor-data';
import { useTracker } from 'meteor/rdb:svelte-meteor-data';
import { Batches } from '../db/batches';

Meteor.subscribe('batches');

/** @type {{batches: [import('../types').batch]}} */
$m: batches = Batches.find({}, { sort: { id: -1 } }).fetch();

const onResetHistory = () => {
    // Batches.remove({});
}

const setBatchId = onResetHistory;

</script>

        <div className='section'>
            <div className='section-header'>
                <h3>History</h3>
                <button type="submit" className='btn btn-danger' onClick={onResetHistory}>Remove</button>
            </div>
            {#each batches as batch}
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
                        {#each batch.input.rules as [divisor, label]}
                                <p key={divisor}>
                                    <input type={'number'} value={divisor} disabled readOnly />
                                    <input type={'text'} value={label} disabled readOnly />
                                </p>
                        {/each}
                    </pre>
                </div>
            {/each}
        </div>