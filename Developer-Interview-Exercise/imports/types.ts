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

export interface onRangeChange {
    (event: Event): (range: range, setBatchId: Function) => void;
}

export interface onRulesChange {
    (event: Event): (rules: rules, setBatchId: Function) => void;
}