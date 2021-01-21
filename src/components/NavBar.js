import React, { Component, Fragment } from 'react'
import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import PostScream from './PostScream';
// Material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


//icons

import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


export class NavBar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar>
                    {authenticated ? (

                        <Fragment>
                            <PostScream /> 

                        <Link to="/">
                        <MyButton tip = "Home" >
                                <HomeIcon color = "secondary"/>
                                </MyButton>   
                            </Link>           

                                <MyButton tip = "Notificações" >
                                <Notifications color = "secondary"/>
                                </MyButton>                  
                        </Fragment>


                    ) : (
                        <Fragment>
                    <Button color='inherit' component={Link} to="/login">Login</Button>
                    <Button color='inherit' component={Link} to="/">Home</Button>
                    <Button color='inherit' component={Link} to="/signup">Singup</Button>
                        </Fragment>


                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NavBar)
