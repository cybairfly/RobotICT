import React, { useState } from 'react';

/**
 * Remove all records from the database
 * @param {import('../handlers')} handlers
 */
export const Reset = ({ onReset }) => {
    return (
        <div>
            <h2>Reset</h2>
            <button type="submit" onClick={onReset}>Remove all records</button>
        </div>
    );
};
