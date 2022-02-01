<script>
import { Meteor } from 'meteor/meteor';
// import React, { useState } from 'react';
// import { useTracker } from 'meteor/react-meteor-data';
import { Records } from '../db/records';

// export const Table = ({batchId}) => {
    const batchId = null;

    const setSort = sortUpdate => ({
        ...sort,
        ...sortUpdate
    });

    let sort = ({
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

    Meteor.subscribe('records', {batchId});

    let filter, options;

    $m: {
        filter = batchId ? {batchId} : {};
        options = {
            sort: (sort.none && {})
            || (sort.asc && { marker: 1 })
            || (sort.desc && { marker: -1 }),
        };
    }

    $m: records = Records.find(filter, options).fetch();
</script>

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
                {#each records as record}
                    <!-- <tr>
                        <td>{record.marker}</td>
                        <td>{record.input}</td>
                        <td>{record.result}</td>
                        <td>{record.divisors.join(', ')}</td>
                    </tr> -->
                        <tr record={record}>
                            <td>{record.marker}</td>
                            <td>{record.number}</td>
                            <td>{record.result}</td>
                            <td>{record.divisors ? record.divisors.join(', ') : record.divisor}</td>
                        </tr>
                {/each}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        {`${records.length} items loaded.`}
                    </td>
                </tr>
            </tfoot>
        </table>
