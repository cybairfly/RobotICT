import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Records } from '../api/links';
import { records } from '../db/mock';

export const Table = () => {
    return (
        <div>
            <table className='table-dark table-striped table-hover table-active'>
                <thead>
                    <tr>
                        <th>Mark</th>
                        <th>Input</th>
                        <th>Result</th>
                        <th>Divisor(s)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map(record => (
                            <tr key={record.number}>
                                <td>{record.marker}</td>
                                <td>{record.number}</td>
                                <td>{record.result}</td>
                                <td>{record.divisors ? record.divisors.join(',') : record.divisor}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
