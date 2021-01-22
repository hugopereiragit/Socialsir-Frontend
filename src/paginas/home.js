import React, { Component } from 'react';
import axios from 'axios'; //e para ir buscar a data
import Grid from '@material-ui/core/Grid'; //para design website MUI



//rce para auto generar isto
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';



import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
//proxy = https://us-central1-socialsir-e995c.cloudfunctions.net/api  //está no package . json

//grid item .... é para o padding
export class home extends Component {
    //comecar screams(posts) como null
   /* state = {
        screams : null
    }
    */
    //buscar os screams
    componentDidMount(){

        
    this.props.getScreams(); 
       /* axios.get('/screams')
            .then((res) => {
                    this.setState({
                        screams: res.data
                    })
            })
            .catch(err => console.log(err));*/

    }

    
    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? (
          screams.map((scream) => <Scream key={scream.screamId} scream={scream} />) //se não for null significa que já temos a data
        ) : <p>Loading....</p> //senão loading
        return (
            <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
              {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
              <Profile/>
            </Grid>
          </Grid>
        )
    }
}


home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getScreams }
  )(home);