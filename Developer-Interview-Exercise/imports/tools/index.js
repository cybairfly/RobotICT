import markers from './markers';
import schema from './record.schema';

/**
 * Produce output based on a schema for a set of numbers using rules defined on input
 * @param {import('../types').input} input
 * @returns {import('../types').record}
 */
export function generateRecords(input) {
    checkInput(input);
    const range = arrayFromInput(input.range);
    const rules = sortRules(input.rules);
    const records = range.map(inputToRecord(rules));

    return records;
}

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

const Record = (number, rules) => {
    const recordModels = {
        completelyDivisible: (number, rules) => ({
            number,
            result: mergeLabels(rules),
            marker: markers.every,
            divisors: getDivisors(rules),
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

    const rulesFound = matchRules(number, rules);
    if (rulesFound.length) {
        return rules.length === rulesFound.length ?
            recordModels.completelyDivisible(number, rules) :
            recordModels.partiallyDivisible(number, rulesFound);
    }

    return recordModels.default(number);
};

const inputToRecord = rules => number => ({
    ...schema,
    ...Record(number, rules),
});
