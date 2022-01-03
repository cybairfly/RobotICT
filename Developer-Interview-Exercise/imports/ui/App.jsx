import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Batches } from '../db/batches';
import { Header } from './Header.jsx';
import { Inputs } from './Inputs.jsx';
import { Table } from './Table.jsx';
import { History } from './History.jsx';
import { handlers } from '../handlers';

export const App = () => {
    const [batchId, setBatchId] = useState(null);

    const firstBatch = useTracker(() => {
        const batchesHandler = Meteor.subscribe('batches');
        if (!batchesHandler.ready()) return null;
        return Batches.findOne({}, {sort: {id: -1}});
    });

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
                        <Inputs setBatchId={setBatchId} />
                    </div>
                </aside>
                <article className="article">
                    <div id="content">
                        {
                            (!batchId && !firstBatch) ?
                                (
                                    <div className="text-center">
                                        <div className="spinner-grow text-secondary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) :
                                <Table batchId={batchId || firstBatch.id} />
                        }
                    </div>
                </article>
                <aside className="history">
                    <div>
                        <History batchId={batchId} setBatchId={setBatchId} onResetHistory={handlers.onResetHistory} />
                    </div>
                </aside>
            </div>
        </div>
    );
};
