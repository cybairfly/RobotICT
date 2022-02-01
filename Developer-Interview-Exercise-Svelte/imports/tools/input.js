import { check, Match } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import models from '../models/input';

export const validateInput = input => {
    const { range, rules } = input;

    if (range)
        new SimpleSchema(models.range).validate({ range });

    if (rules) {
        check(rules, Match.Where(rules =>
            rules.every(([divisor, label]) =>
                typeof divisor === 'number'
            && typeof label === 'string',
            )));
    }
};
