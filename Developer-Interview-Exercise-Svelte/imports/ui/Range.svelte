<script>
    const handleChange = {
        start:
            (range) =>
            /** @param {Event & {target: HTMLInputElement}} event */
            (event) => {
                const {
                    target,
                    target: { value },
                } = event;
                const { start, end } = range;

                if (value >= end) {
                    target.classList.add("is-invalid");
                    target.setCustomValidity(
                        "Range start must be less than end"
                    );
                } else {
                    target.setCustomValidity("");
                    [
                        target,
                        document.querySelector('input[name="start"]'),
                        document.querySelector('input[name="end"]'),
                    ].forEach((node) => node.classList.remove("is-invalid"));
                }

                setRange({ ...range, start: +value });
            },
        end:
            (range) =>
            /** @param {Event & {target: HTMLInputElement}} event */
            (event) => {
                const {
                    target,
                    target: { value },
                } = event;
                const { start, end } = range;

                if (value <= start) {
                    target.classList.add("is-invalid");
                    target.setCustomValidity(
                        "Range start must be less than end"
                    );
                } else {
                    target.setCustomValidity("");
                    [
                        target,
                        document.querySelector('input[name="start"]'),
                        document.querySelector('input[name="end"]'),
                    ].forEach((node) => node.classList.remove("is-invalid"));
                }

                setRange({ ...range, end: +value });
            },
    };

    $: state = {
        range: {
            start: 1,
            end: 10,
        },
    };
</script>

<div className="section">
    <h3>Range</h3>
    {JSON.stringify(state)}
    <div className="input-group">
        <div className="input-group-prepend">
            <span className="input-group-text">Start</span>
        </div>
        <input
            required
            type="number"
            min="1"
            max={+state.range.end - 1}
            name="start"
            bind:value={state.range.start}
            on:change={handleChange.start(state.range)}
        />
        <input
            required
            type="number"
            min={+state.range.start + 1}
            max="100"
            name="end"
            bind:value={state.range.end}
            on:change={handleChange.end(state.range)}
        />
        <div className="input-group-append">
            <span className="input-group-text">End</span>
        </div>
        <div className="invalid-feedback">
            Please provide two unequal consecutive numbers.
        </div>
    </div>
</div>
