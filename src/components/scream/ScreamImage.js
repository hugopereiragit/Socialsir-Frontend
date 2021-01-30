import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import ImageIcon from "@material-ui/icons/Image";

//Redux
import { connect } from "react-redux";
import { uploadImage } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  imageInput: {
    position: "absolute",
    left: "90%",
    top: "50%",
  },
});

export class ScreamImage extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(this.props.screamId, formData);
    this.handleClose(); // DONE - fix infinite loading
  };
  handleEditImage = () => {
    const input = document.getElementById("imageInput");
    input.click();
  };

  render() {
    return (
      <Fragment>
        <input
          type="file"
          id="imageInput"
          onChange={this.handleImageChange}
          hidden="hidden"
          onClick={this.handleOpen}
        />
        <Tooltip title="Editar imagem do post" placement="top">
          <IconButton onClick={this.handleEditImage} className="imageButton">
            <ImageIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { uploadImage };

ScreamImage.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamImage));
