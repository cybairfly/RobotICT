export type rules = Array<[number, string]>;

export type range = {
    start: number,
    end: number,
};

export type input = {
    default: {
        rules: rules,
        range: range,
    },
}

export interface onRangeChange {
    (event: Event): (range: range, setBatchId: Function) => void;
}

export interface onRulesChange {
    (event: Event): (rules: rules, setBatchId: Function) => void;
}