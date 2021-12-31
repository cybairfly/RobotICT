import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Records } from '../db/records';

export const Table = ({batchId}) => {
    const [sort, setSort] = useState({
        asc: false,
        desc: false,
        none: true,
    });

    const toggleSorting = () => {
        if (sort.none)
            setSort({...sort, asc: true, none: false});

        if (sort.asc)
            setSort({...sort, asc: false, desc: true});

        if (sort.desc)
            setSort({...sort, desc: false, none: true});

        const options = {
            sort: (sort.none && {})
            || (sort.asc && { marker: 1 })
            || (sort.desc && { marker: -1 }),
        };

        Meteor.subscribe('records', options);
    };

    const records = useTracker(() => {
        Meteor.subscribe('records', {batchId});
        const filter = batchId ? {batchId} : {};
        return Records.find(filter).fetch();
    });

    return (
        <table className='table-dark table-striped table-hover table-active'>
            <thead>
                <tr>
                    <th style={{ cursor: 'pointer' }} onClick={toggleSorting}>↕ Mark</th>
                    <th>Input</th>
                    <th>Result</th>
                    <th>Divisor(s)</th>
                </tr>
            </thead>
            <tbody>
                {
                    records.map(record => (
                        <tr key={`${batchId}-${record.number}`} record={record}>
                            {/* <tr key={`row-${record.number}`}> */}
                            <td>{record.marker}</td>
                            <td>{record.number}</td>
                            <td>{record.result}</td>
                            <td>{record.divisors ? record.divisors.join(',') : record.divisor}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};
