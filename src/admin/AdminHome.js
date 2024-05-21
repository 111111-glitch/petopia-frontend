import React from 'react';
import Cards from './Cards';
import Table from './Table';

function AdminHome() {
    return React.createElement(
        'div',
        { className: 'main-dash' },
        React.createElement(
            'span',
            { className: 'primaryText' },
            'Welcome to your dashboard'
        ),
        React.createElement(Cards),
        React.createElement(Table)
    );
}

export default AdminHome;
