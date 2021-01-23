import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
//MUI STUFF
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress"; //barra de loading

//REDUX

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

import { Link } from "react-router-dom";
const styles = {
  form: {
    textAlign: "Center",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative", //para darmos absolute ao loading para ficar no meio
  },
  customError: {
    color: "red", // custom error recusa-se a aparacer TODO EM BAIXO
  },
  loading: {
    position: "absolute",
  },
};

//rce para auto generar isto
export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  //todo make errors show on screan
  componentWillReceiveProps(nextProps) {
    //resolve os erros não aparecerem
    if (nextProps.UI.error) {
      //estamos sempre a receber props / melhora performance
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault(); // para nao mostrar a pass na parte de cima e nao dar reload a pagina
    const dataUtilizador = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(dataUtilizador, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value, //serve para o email e password
    });
  };
  //materialui - textfield para documentação do textfield
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      //segundo item sm para centrar
      //helpertext mostra o aviso para utilizador escrever o email
      //TODO descobrir porque e que nao avisa se a password estiver vazia
      //se tivermos a key error significa que existe erro no email ou password (error = {error.email ? ....})
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <small>
              <Link to="/signup" color="primary">
                Não tens conta? Inscreve-te aqui!
              </Link>
            </small>
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.loading} />
              )}
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

//user e ui veem do state global e sao mapeados para as nossas props para components
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

//ações a usar
const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
