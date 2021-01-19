import React, { Component } from 'react'



// Material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


export class barradeNav extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Button color='inherit'>Login</Button>
                    <Button color='inherit'>Home</Button>
                    <Button color='inherit'>Singup</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default barradeNav;
