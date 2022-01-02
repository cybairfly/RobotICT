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
                // [7, 'seven'],
                [5, 'ICT'],
                // [2, 'two'],
                // [4, 'four'],
            ],
            range: {
                start: 1,
                end: 10,
            },
        },
    },
};
