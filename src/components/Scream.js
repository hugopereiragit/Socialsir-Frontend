import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs'; // para o tempo ficar bem formatado
import relativeTime from 'dayjs/plugin/relativeTime' // funcao de cima
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//redux
import {connect} from 'react-redux';
import {likeScream,unlikeScream} from '../redux/actions/dataActions';

//icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = {
    card : {
        position: 'relative',
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
    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)) //evrifica se ja demos like ao post 
        return true;
        else{
            return false;
        }
    };

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    }

    render() {
        dayjs.extend(relativeTime)
        const {classes, scream:{ body,createdAt,userImage,userHandle,screamId,likeCount,commentCount},
                        user: {authenticated,credentials: {handle}}
    } = this.props;
        const likeButton = !authenticated ? (
            <MyButton tip ="Like">
                <Link to ="/login">
                    <FavoriteBorder color ="primary"/>
                </Link>
            </MyButton>
        ) : (
            this.likedScream() ? (
                <MyButton tip="Unlike" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        );
                                                                        //se nao for post do ultizador com login nao tem delete button
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia image = {userImage} title="Imagem de Perfil:" className={classes.image}/>
                <CardContent className={classes.conteudo}>
                <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                {deleteButton}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
                {likeButton}
                <span>{likeCount}</span>
                <MyButton tip="comment">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span>{commentCount} comments</span>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };
  
  const mapActionsToProps = {
       likeScream,
       unlikeScream
  }

  const mapStateToProps = (state) => ({
    user: state.user
  });
  


export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Scream));
