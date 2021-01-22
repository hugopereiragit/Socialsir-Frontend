import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import ProfileEstatico from '../components/profile/ProfileEstatico';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        screamIdParam: null
      };
      componentDidMount() {
        const handle = this.props.match.params.handle; //buscar a handle do user (nome ) ao url
        const screamId = this.props.match.params.screamId;  // para irmos buscar o post
    
        if (screamId) this.setState({ screamIdParam: screamId }); // se tivermos scream id entao o state screamidparam passa a ser scream ID
    
        this.props.getUserData(handle); //temos acesso ao handle 
        axios //mesmo request da action
          .get(`/user/${handle}`)
          .then((res) => {
            this.setState({
              profile: res.data.user
            });
          })
          .catch((err) => console.log(err));
      }
    render() {
        const { screams, loading } = this.props.data;
        const {screamIdParam} = this.state;
        const screamsMarkup = loading ? (
            <p>LOOOOOADING IN MY SCREEEEEEEEEEEEEN</p>
        ) : screams === null ? (
            <p>ESTE USER NAO TEM POSTS</p>
        ) : !screamIdParam ? (
             screams.map(scream => <Scream key={scream.screamId} scream={scream}/>) // se nao tivermos id param estamos a visitar pagina user
        ) : ( //senao estamos a visitar um post /scream
            screams.map(scream => {
                if(scream.screamId !== screamIdParam) //nao é este o post que queremos abrir
                return <Scream key={scream.screamId} scream={scream}/>
                else return <Scream key={scream.screamId} scream={scream} openDialog/> // scream que nos queremos abrir openDialog com valor de TRUE
            })
        )
        return (
            <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
              {screamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile === null ? (
                    <p>Loading perfil</p>
                ): (
                    <ProfileEstatico profile ={this.state.profile}/>
                )}
            </Grid>
          </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(mapStateToProps,{ getUserData })(user);
