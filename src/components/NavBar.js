import React, { Component } from 'react'
import {Link } from 'react-router-dom';

// Material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
export class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Button color='inherit' component={Link} to="/login">Login</Button>
                    <Button color='inherit' component={Link} to="/">Home</Button>
                    <Button color='inherit' component={Link} to="/signup">Singup</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar
