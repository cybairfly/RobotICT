import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Batches } from '../db/batches';
import { Header } from './Header.jsx';
import { Range } from './Range.jsx';
import { Rules } from './Rules.jsx';
import { Reset } from './Reset.jsx';
import { Table } from './Table.jsx';
import { History } from './History.jsx';
import { handlers } from '../handlers';
import config from '../config';

export const App = () => {
    const firstBatch = useTracker(() => {
        const batchesHandler = Meteor.subscribe('batches');
        if (!batchesHandler.ready()) return null;
        return Batches.findOne({}, {sort: {id: -1}});
    });

    const [batchId, setBatchId] = useState(null);
    const [input, setInput] = useState({ ...config.input.default });
    const { range, rules } = input;

    return (
        <div>
            <div className="grid">
                <header className="header">
                    <div>
                        <Header />
                    </div>
                </header>
                <aside className="sidebar">
                    <div>
                        <Rules rules={rules} setBatchId={setBatchId} onRulesChange={handlers.onRulesChange} />
                        <Range range={range} setBatchId={setBatchId} onRangeChange={handlers.onRangeChange} />
                        <Reset onReset={handlers.onReset} />
                    </div>
                </aside>
                <article className="article">
                    <div id="content">
                        {
                            (!batchId && !firstBatch) ?
                                <div className="loading">Loading...</div> :
                                <Table batchId={batchId || firstBatch.id} />
                        }
                    </div>
                </article>
                <aside className="right">
                    <div>
                        <History batchId={batchId} />
                    </div>
                </aside>
                <footer className="footer">
                    <div>
                        <p>Footer</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};
