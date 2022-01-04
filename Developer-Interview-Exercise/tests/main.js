import {Meteor} from 'meteor/meteor';
import assert from 'assert';
import config from '../imports/config';
import pattern from './records.pattern.json';
import { Records } from '../imports/db/records';
import {generateRecords} from '../imports/tools';
import '../imports/api/methods';

const {input, names: {methods: {updateInput}}} = config;

const filterRecord = ({
    _id,
    batchId,
    ...rest
}) => ({
    ...rest,
});

describe('unit tests', () => {
    beforeEach(() => {
        Records.remove({});
    });

    describe('algorithm', () => {
        it('generates expected records', () => {
            const records = generateRecords(input.default);
            assert.deepStrictEqual(records, [...pattern.map(filterRecord)]);
        });
    });

    describe('input update', () => {
        it('generates expected records', () => {
            const range = [10, 20];
            const rules = [[3, 'Robot'], [5, 'test']];
            const [start, end] = range;

            Meteor.call(updateInput, {...input.default, range: {start, end}, rules});
            const updatedRecords = Records.find({}).fetch();
            assert.deepStrictEqual([
                ...updatedRecords
                    .map(filterRecord),
            ], [
                ...pattern
                    .slice(start - 1, end)
                    .map(filterRecord)
                    .map(record =>
                        typeof record.result !== 'string' ?
                            record :
                            ({
                                ...record,
                                result: !record.result.includes('ICT') ?
                                    record.result :
                                    record.result.replace('ICT', 'test'),
                            }),
                    ),
            ]);
        });
    });
});
