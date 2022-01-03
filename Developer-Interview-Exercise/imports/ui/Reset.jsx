import React, { useState } from 'react';

/**
 * Remove all records from the database
 * @param {import('../handlers')} handlers
 */
export const Reset = ({ onReset }) => {
    return (
        <div className='section section-header'>
            <h3>Reset</h3>
            <button type="submit" className='btn btn-danger' onClick={onReset}>Remove all records</button>
        </div>
    );
};
