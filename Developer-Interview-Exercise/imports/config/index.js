module.exports = {
    names: {
        methods: {
            removeRecords: 'records.remove',
            updateRecords: 'records.update',
            updateInput: 'input.update',
            updateRange: 'range.update',
            updateRules: 'rules.update',
            fetchBatches: 'batches.fetch',
        },
    },
    input: {
        default: {
            rules: [
                [3, 'Robot'],
                [5, 'ICT'],
            ],
            range: {
                start: 1,
                end: 100,
            },
        },
    },
};
