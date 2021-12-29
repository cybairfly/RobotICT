module.exports = {
    names: {
        methods: {
            generateRecords: 'generateRecords',
            removeRecords: 'removeRecords',
            updateRecords: 'updateRecords',
            updateRange: 'updateRange',
        },
    },
    defaultInput: {
        rules: [
            [3, 'Robot'],
            // [7, 'seven'],
            [5, 'ICT'],
            // [2, 'two'],
            // [4, 'four'],
        ],
        range: {
            start: 1,
            end: 100,
        },
    },
};
