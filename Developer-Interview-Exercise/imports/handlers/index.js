import { names } from '../config';

const { updateRange, updateRules, removeRecords } = names.methods;

export const handlers = {
    onRangeChange: event => (range, setBatchId) => {
        event.preventDefault();

        Meteor.call(updateRange, range, (error, result) => {
            const { batchId } = result;
            setBatchId(batchId);
        });
    },
    onRulesChange: event => (rules, setBatchId) => {
        event.preventDefault();

        Meteor.call(updateRules, rules, (error, result) => {
            const { batchId } = result;
            setBatchId(batchId);
        });
    },
    onResetHistory: event => Meteor.call(removeRecords),
};
