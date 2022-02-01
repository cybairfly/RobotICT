export default {
    range: {
        range: Object,
        'range.start': {
            type: Number,
            min: 1,
            max: 100,
        },
        'range.end': {
            type: Number,
            min: 1,
            max: 100,
        },
    },
    rules: {
        rules: {
            type: Array,
        },
        'rules.$': [Number, String],
    },
};
