import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import InputProfile from "../../../Components/UI/InputProfile/InputProfile";
import { editUser } from "../../../Actions/editProfileActions";
import { setProfile } from "../../../Actions/editProfileActions";
import { editImage } from "../../../Actions/editProfileActions";
import Button from "../../../Components/UI/button//button";

import "./EditProfile.css";

class editProfile extends Component {
  constructor(props) {
    super(props);
    console.log("mirna", { ...this.props.auth });
    this.state = {
      editProfileForm: {
        screenname: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: this.props.auth.profile.screen_name
          },
          value: "",
          validation: {
            required: true,
            nospace: true,
            maxLength: 15,
            startLetter: true
          },
          valid: false,
          touched: false,
          autoFocus: true,
          errorMessage:
            "The screen name should start with a letter and with no spaces",
          invalidScreenname: false
        },
        username: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: this.props.auth.currentUser.name
          },
          value: "",
          validation: {
            maxLength: 15
          },
          errorMessage: "Maximum length is 15",
          valid: false,
          touched: false
        },

        bio: {
          elementType: "input",
          elementConfig: {
            type: "input",
            placeholder: this.props.auth.currentUser.bio
          },
          value: "",
          validation: {
            maxLength: 100
          },
          errorMessage: "Maximum length is 100",
          valid: false,
          touched: false
        }
      },
      location: "",
      formIsValid: false,
      loading: false,
      error: {},
      file: "",
      imagePreview: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
      //token: "",
    };
  }
  inputChangeHandler = (event, inputIdentifier) => {
    const updatedEditsProfileForm = {
      ...this.state.editProfileForm
    };
    const updatedFormElement = {
      ...updatedEditsProfileForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedEditsProfileForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedEditsProfileForm) {
      formIsValid =
        updatedEditsProfileForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      editProfileForm: updatedEditsProfileForm,
      formIsValid: formIsValid
    });
  };

  _handleChange = event => {
    this.setState({ location: event.target.value });
  };
  checkValidity(value, rules) {
    let isValid = true;

    if (rules.startLetter) {
      isValid = !!value.match(/^[a-zA-Z][a-zA-Z_0-9]*$/) && isValid;
    }

    if (rules.nospace) {
      isValid = !(value.indexOf(" ") >= 0) && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  submitHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.editProfileForm) {
      formData[formElementIdentifier] = this.state.editProfileForm[
        formElementIdentifier
      ].value;
    }

    const user = {
      screen_name: this.state.editProfileForm.screenname.value,
      name: this.state.editProfileForm.username.value,
      location: this.state.location.value,
      bio: this.state.editProfileForm.bio.value
    };
    const profile_background_image_url = this.state.imagePreview;
    this.props.editUser(user);
    this.props.editImage(profile_background_image_url);
  };

  onChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = e => {
      this.setState({
        file,
        imagePreview: reader.result
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(file);
  }
  /*
  componentDidMount() {
    this.props.setProfile(this.props.auth.screen_name);
  }
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ error: nextProps.error }, () => {
        this.setState({ loading: false });
        if (this.state.msg === "screen name already registered.") {
          console.log("hello");
          this.setState({ errorScreenname: true });
        } else if (
          this.state.msg ===
          ' "screen_name" length must be at least 3 characters long'
        ) {
          this.setState({ errorLenScreenname: true });
        } else if (
          this.state.msg ===
          ' "screen_name" length must be less than or equal to 15 characters long'
        ) {
          this.setState({ errorLenScreenname: true });
        }
      });
    }
    console.log("from receive props", { ...this.props.auth });
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.editProfileForm) {
      formElementArray.push({
        id: key,
        config: this.state.editProfileForm[key]
      });
    }
    let form = (
      <form onSubmit={this.submitHandler} className="editBox">
        {formElementArray.map(formElement => (
          <InputProfile
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            errorMessage={formElement.config.errorMessage}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            autoFocus={formElement.config.autoFocus}
            changed={event => this.inputChangeHandler(event, formElement.id)}
          />
        ))}

        <div className="col-sm-20">
          <select onChange={this._handleChange} className="form-control">
            <option selected="">Select location</option>
            <option value="Egypt">Egypt</option>
            <option value="Canada">Canada</option>
            <option>United States</option>
            <option>England</option>
            <option>Italy</option>
            <option>Lebanon</option>
          </select>
        </div>
        <div className="form-group">
          <Button>Save</Button>
        </div>
      </form>
    );

    return (
      <div>
        <div>
          <div>
            <h1 className="text-center">Edit your profile</h1>

            <div className="row">
              <div className="col-sm-5" />
              <div className="col-sm-4">
                {" "}
                <img
                  src={this.state.imagePreview}
                  width="200"
                  height="200"
                  border="0"
                  className="img-circle"
                />
                <h6>Upload a different photo...</h6>
                <input
                  type="file"
                  className="text-center center-block file-upload"
                  onChange={e => this.onChange(e)}
                />{" "}
              </div>
            </div>
          </div>
          <div className="text-center">
            <h4> </h4>
            <h4> </h4>
            <h2 className="editHeader">update your info</h2>
            <div className="col-xs-20">
              <div className="container">{form}</div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-5" />
            <span> </span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  edit: state.edit,
  error: state.errors
});

export default connect(
  mapStateToProps,
  { editUser, editImage }
)(editProfile);
