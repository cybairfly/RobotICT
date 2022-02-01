import { generateRecords } from '../tools';
import { Records } from '../db/records';
import { Batches } from '../db/batches';

export const insertRecords = input => {
    const batchId = new Date().getTime();
    const records = generateRecords(input);
    records.forEach(record => Records.insert({...record, batchId}));
    Batches.insert({id: batchId, input});

    return {batchId};
};
