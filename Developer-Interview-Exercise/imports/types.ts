export type rules = Array<[number, string]>;

export type range = {
    start: number,
    end: number,
};

export type input = {
    rules: rules,
    range: range,
}

export type batch = {
    id: number,
    input: input,
}

export interface onRangeSubmit {
    (event: Event): (range: range, setBatchId: Function) => void;
}

export interface onRulesSubmit {
    (event: Event): (rules: rules, setBatchId: Function) => void;
}