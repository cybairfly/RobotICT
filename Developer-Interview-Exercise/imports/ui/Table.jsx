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

    const toggleSorting = (sort, setSort) => event => {
        if (sort.none)
            setSort({...sort, asc: true, none: false});

        if (sort.asc)
            setSort({...sort, asc: false, desc: true});

        if (sort.desc)
            setSort({...sort, desc: false, none: true});
    };

    const records = useTracker(() => {
        Meteor.subscribe('records', {batchId});
        const filter = batchId ? {batchId} : {};
        const options = {
            sort: (sort.none && {})
            || (sort.asc && { marker: 1 })
            || (sort.desc && { marker: -1 }),
        };

        return Records.find(filter, options).fetch();
    });

    return (
        <table className='table table-sm table-striped table-hover table-active'>
            <thead>
                <tr>
                    <th style={{ cursor: 'pointer' }} onClick={toggleSorting(sort, setSort)}>↕ Mark</th>
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
                            <td>{record.divisors ? record.divisors.join(', ') : record.divisor}</td>
                        </tr>
                    ))
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        {`${records.length} items loaded.`}
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};
