import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs'; // para o tempo ficar bem formatado
import relativeTime from 'dayjs/plugin/relativeTime' // funcao de cima

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    card : {
        display: 'flex',
        marginBottom:20,
    },
    image:{
        minWidth:200,
    },
    conteudo:{
        padding:25,
        objectFit: 'Cover' //anti stretch nao funciona as vezes?
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {classes, scream:{ body,createdAt,userImage,userHandle,screamId,likeCount,commentCount}} = this.props
        return (
            <Card className={classes.card}>
                <CardMedia image = {userImage} title="Imagem de Perfil:" className={classes.image}/>
                <CardContent className={classes.conteudo}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}



export default withStyles(styles)(Scream);
