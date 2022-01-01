import { check, Match } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { Batches } from '../db/batches';
import { Records } from '../db/records';
import { insertRecords } from './helpers';
import config, { names } from '../config';
import schema from '../schema';

const { removeRecords, updateRange, updateRules, fetchBatches } = names.methods;

Meteor.methods({
    [fetchBatches]({ filter = {}, options }) {
        return Batches.find(filter, options).fetch();
    },

    [updateRange](range) {
        new SimpleSchema(schema.range).validate({ range });

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
        check(rules, Match.Where(rules =>
            rules.every(([divisor, label]) =>
                typeof divisor === 'number'
                && typeof label === 'string',
            )));

        const input = { ...config.input.default, rules };
        const { batchId } = insertRecords(input);

        return { batchId };
    },

    [removeRecords]() {
        Batches.remove({});
        Records.remove({});
    },
});
