import React, { Component } from 'react';
import axios from 'axios'; //e para ir buscar a data
import Grid from '@material-ui/core/Grid'; //para design website MUI



//rce para auto generar isto
import Scream from '../components/Scream';
import Profile from '../components/Profile';

//proxy = https://us-central1-socialsir-e995c.cloudfunctions.net/api  //está no package . json

//grid item .... é para o padding
export class home extends Component {
    //comecar screams(posts) como null
    state = {
        screams : null
    }
    //buscar os screams
    componentDidMount(){
        axios.get('/screams')
            .then((res) => {
                    this.setState({
                        screams: res.data
                    })
            })
            .catch(err => console.log(err));
    }

    
    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream key={scream.screamId} scream = {scream}/>) //se não for null significa que já temos a data
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

export default home;