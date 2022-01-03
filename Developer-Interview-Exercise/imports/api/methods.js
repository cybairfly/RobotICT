import { check, Match } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { Batches } from '../db/batches';
import { Records } from '../db/records';
import { insertRecords } from './helpers';
import config, { names } from '../config';
import models from '../models/input';

const { removeRecords, updateInput, updateRange, updateRules, fetchBatches } = names.methods;

Meteor.methods({
    [fetchBatches]({ filter = {}, options }) {
        return Batches.find(filter, options).fetch();
    },

    [updateInput](input) {
        const {range, rules} = input;
        new SimpleSchema(models.range).validate({ range });
        check(rules, Match.Where(rules =>
            rules.every(([divisor, label]) =>
                typeof divisor === 'number'
                && typeof label === 'string',
            )));

        const { batchId } = insertRecords(input);

        return { batchId };
    },

    [updateRange](range) {
        new SimpleSchema(models.range).validate({ range });

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
