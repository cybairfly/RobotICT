import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Records } from '../db/records';
import { Batches } from '../db/batches';

export const History = () => {
    const batches = useTracker(() => {
        // Meteor.subscribe('batches', {id: batchId});
        // const filter = batchId ? {id: batchId} : {};
        return Batches.find({}, {sort: {id: -1}}).fetch();
    });

    return (
        <div>
            <h2>History</h2>
            {
                batches.map(batch => (
                    <div key={batch.id}>
                        <pre>
                            {JSON.stringify(batch, null, 4)}
                        </pre>
                    </div>
                ))
            }
        </div>
    );
};
