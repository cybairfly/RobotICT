import { Batches } from '../db/batches';
import { Records } from '../db/records';
import { insertRecords } from './helpers';
import { validateInput } from '../tools/input';
import config, { input, names } from '../config';

const { removeRecords, updateInput, updateRange, updateRules, fetchBatches } = names.methods;

Meteor.methods({
    [fetchBatches]({ filter = {}, options }) {
        return Batches.find(filter, options).fetch();
    },

    [updateInput](input) {
        validateInput(input);
        return insertRecords(input);
    },

    [updateRange](range) {
        validateInput({range});

        const input = {
            ...config.input.default,
            range: {
                start: +range.start,
                end: +range.end,
            },
        };

        return insertRecords(input);
    },

    [updateRules](rules) {
        validateInput({rules});

        const input = {
            ...config.input.default,
            rules,
        };

        return insertRecords(input);
    },

    [removeRecords]() {
        Batches.remove({});
        Records.remove({});
    },
});
