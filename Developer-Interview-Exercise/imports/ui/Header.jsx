import React, { useState } from 'react';

export const Header = () => {
    return (
        <div className='flex'>
            <img src="media/robot.jpg" alt="Robot logo" className="header"></img>
            <h1 className="title">
                <span className='title-color'>|</span>
                Buzzword
                <span className='title-color'>| : |</span>
                Generator
                <span className='title-color'>|</span>

            </h1>
            <img src="media/meteor.png" alt="Meteor logo" className="header"></img>
        </div>
    );
};
