import {input} from './config';

export type input = typeof input.default;
export type range = typeof input.default.range;
export type rules = typeof input.default.rules;

export type batch = {
    id: number,
    input: input,
}

export type record = {
    number: number,
    result: string,
    marker: string,
    divisors: Array<number>,
}

export interface onRangeSubmit {
    (event: Event): (range: range, setBatchId: Function) => void;
}

export interface onRulesSubmit {
    (event: Event): (rules: rules, setBatchId: Function) => void;
}