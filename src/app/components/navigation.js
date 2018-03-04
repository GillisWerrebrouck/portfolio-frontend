import React from 'react';
import { NavLink } from 'react-router-dom';

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <nav className='menu'>
          <ul>
            <NavLink to='/projects' activeClassName='active'><li>projects</li></NavLink>
            <NavLink to='/blog' activeClassName='active'><li>blog</li></NavLink>
            <NavLink to='/about' activeClassName='active'><li>about</li></NavLink>
          </ul>
        </nav>
      )
    }
}