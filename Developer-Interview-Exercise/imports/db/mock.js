const isDivisible = dividend => divisor => dividend % divisor === 0;
const isNumberDivisibleBy = (dividend, divisor) => isDivisible(dividend)(divisor);
const isDivisibleByEvery = dividend => divisors => divisors.every(isDivisible(dividend));

const getDivisors = rules => rules.map(([divisor]) => divisor);
const mergeLabels = rules => rules.map(([, label]) => label).join('');
const sortRules = rules => Array.from(rules).sort(([numberA], [numberB]) => numberA - numberB);
const matchRules = (number, rules) => rules.filter(([divisor]) => isDivisible(number)(divisor));

const arrayFromInput = ({ start, end }) =>
    Array
        .from(Array(1 + end)
            .keys())
        .slice(start);

const checkInput = input => {
    if (!input.rules)
        throw new Error('No rules found on input');

    if (!input.range)
        throw new Error('No range found on input');

    if (!input.range.start)
        throw new Error('No range start found on input');

    if (!input.range.end)
        throw new Error('No range end found on input');

    if (input.range.start > input.range.end)
        throw new Error('Input range start must be lower than range end');
};

const schema = {
    number: null,
    result: null,
    marker: null,
    divisors: null,
};

const input = {
    rules: [
        [3, 'Robot'],
        [7, 'seven'],
        [5, 'ICT'],
        [2, 'two'],
        [4, 'four'],
    ],
    range: {
        start: 13,
        end: 195,
    },
};

const markers = {
    none: 'X',
    some: '○',
    every: '●',
};

const rules = sortRules(input.rules);
const allDivisors = getDivisors(rules);

const Record = (number, rules) => {
    const recordModels = {
        completelyDivisible: (number, rules) => ({
            number,
            result: mergeLabels(rules),
            marker: markers.every,
            divisors: allDivisors,
        }),
        partiallyDivisible: (number, rules) => ({
            number,
            result: mergeLabels(rules),
            marker: markers.some,
            divisors: getDivisors(rules),
        }),
        default: number => ({
            number,
            result: number,
            marker: markers.none,
        }),
    };

    if (isDivisibleByEvery(number)(allDivisors))
        return recordModels.completelyDivisible(number, rules);

    const rulesFound = matchRules(number, rules);
    if (rulesFound.length)
        return recordModels.partiallyDivisible(number, rulesFound);

    return recordModels.default(number);
};

const numberToRecord = number => ({
    ...schema,
    ...Record(number, rules),
});

const generateRecords = input => {
    checkInput(input);
    const range = arrayFromInput(input.range);
    const records = range.map(numberToRecord);

    return records;
};

const records = generateRecords(input);

console.log(records.map(({
    divisors, ...rest
}) => ({
    ...rest, divisors: (Array.isArray(divisors) && divisors.length > 1 && divisors) || (divisors && divisors[0]) || divisors,
})));

module.exports = { records, generateRecords };
