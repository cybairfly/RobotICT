import { names } from '../config';

const { updateInput, updateRange, updateRules, removeRecords } = names.methods;

export const handlers = {
    onInputSubmit: event => (input, setBatchId) => {
        event.preventDefault();

        Meteor.call(updateInput, input, (error, result) => {
            const { batchId } = result;
            setBatchId(batchId);
        });
    },
    onRangeSubmit: event => (range, setBatchId) => {
        event.preventDefault();

        Meteor.call(updateRange, range, (error, result) => {
            const { batchId } = result;
            setBatchId(batchId);
        });
    },
    onRulesSubmit: event => (rules, setBatchId) => {
        event.preventDefault();

        Meteor.call(updateRules, rules, (error, result) => {
            const { batchId } = result;
            setBatchId(batchId);
        });
    },
    onResetHistory: event => Meteor.call(removeRecords),
};
