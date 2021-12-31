import { check } from 'meteor/check';
import { Batches } from '../db/batches';
import { Records } from '../db/records';
import { insertRecords } from './helpers';
import config, { names } from '../config';

const { removeRecords, updateRange, updateRules, fetchBatches } = names.methods;

Meteor.methods({
    [fetchBatches]({ filter = {}, options }) {
        return Batches.find(filter, options).fetch();
    },

    [updateRange](range) {
        const input = {
            ...config.input.default,
            range: {
                start: +range.start,
                end: +range.end,
            },
        };

        const { batchId } = insertRecords(input);

        return { batchId };
    },

    [updateRules](rules) {
        const input = { ...config.input.default, rules };
        const { batchId } = insertRecords(input);

        return { batchId };
    },

    [removeRecords]() {
        Batches.remove({});
        Records.remove({});
    },
});
