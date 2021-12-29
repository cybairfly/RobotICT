import React from 'react';
import { Table } from './Table.jsx';
import { Header } from './Header.jsx';

export const App = () => (
    <div>
        <div className="grid">
            <header className="header">
                <div>
                    <Header />
                </div>
            </header>
            <aside className="input">
                <div>
                    Left
                </div>
            </aside>
            <article className="article">
                <div id="content">
                    <Table />
                </div>
            </article>
            <aside className="right">
                <div>
                    Right
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
