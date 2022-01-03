import assert from 'assert';
import {input} from '../imports/config';
import pattern from './records.pattern.json';
import {generateRecords} from '../imports/tools';

describe('algorithm', () => {
    it('generates expected records', async () => {
        const records = generateRecords(input.default);
        // omit unique values from pattern for comparison
        assert.deepStrictEqual(records, [...pattern.map(({
            _id,
            batchId,
            ...rest
        }) => ({
            ...rest,
        }))]);
    });
});
