import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";
import ProfilePic from "../General/ProfilePic.js";

import { editUser } from "../../api.js";
import ButtonSubmit from "../General/ButtonSubmit.js";
import HeaderArrowBack from "../HeadersAndFooters/HeaderArrowBack";

import "./ModifyProfilePage.css";

class ModifyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: this.props.currentUser.fullName,
      username: this.props.currentUser.username,
      website: this.props.currentUser.website,
      bio: this.props.currentUser.bio,
      email: this.props.currentUser.email,
      phoneNumber: this.props.currentUser.phoneNumber,
      gender: this.props.currentUser.gender,
      isSubmit: false
    };
  }

  genericOnChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const updatedUser = {
      newInfo: this.state,
      oldInfo: this.props.currentUser
    };

    editUser(updatedUser).then(response => {
      console.log("edit result", response.data);
      this.props.editSuccess(response.data);
      this.setState({ isSubmit: true });
      if (this.state.profilePic === "") {
        this.setState({
          profilePic:
            "https://scontent-frx5-1.cdninstagram.com/vp/973f5d72a5217d4b771ed4a941e6f138/5D0566F1/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com"
        });
      }
    });
  }

  render() {
    const { currentUser } = this.props;
    const { profilePic } = this.props.currentUser;

    return this.state.isSubmit ? (
      <Redirect to={`/${currentUser.username}`} />
    ) : (
      <section className="ModifyProfile">
        <HeaderArrowBack
          text="Edit Profile"
          position="position-top"
          link={`/${currentUser.username}`}
        />
        <div className="header-edit d-flex">
          <ProfilePic
            profilePic={profilePic}
            size="profile-page-litle"
            margin="m-20"
          />

          {/* <img className="user-thumbnail" src={currentUser.profilePic} /> */}

          <div className="d-flex flex-column justify-content-center">
            <h3 className="currentusername">{currentUser.username}</h3>
            <Link to="#">
              <p className="smaller-size paragraph">
                <b>Change profile picture</b>
              </p>
            </Link>
          </div>
        </div>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label className="name">
            <p className="paragraph">
              <b>Name</b>
            </p>
            <input
              onChange={event => this.genericOnChange(event)}
              type="text"
              name="fullName"
              value={this.state.fullName}
              className="w-100"
            />
          </label>

          <label className="username">
            <p className="paragraph">
              <b>Username</b>
            </p>
            <input
              onChange={event => this.genericOnChange(event)}
              type="text"
              name="username"
              value={this.state.username}
              className="w-100"
            />
          </label>
          <label className="website">
            <p className="paragraph">
              <b>Website</b>
            </p>
            <input
              onChange={event => this.genericOnChange(event)}
              type="url"
              name="website"
              value={this.state.website}
              className="w-100"
            />
          </label>
          <label className="bio">
            <p className="paragraph">
              <b>Bio</b>
            </p>
            <textarea
              onChange={event => this.genericOnChange(event)}
              rows="2"
              name="bio"
              value={this.state.bio}
              className="w-100"
            />
          </label>
          <h6 className="privateinformation">Private Information</h6>
          <label className="email">
            <p className="paragraph">
              <b>Email</b>
            </p>
            <input
              onChange={event => this.genericOnChange(event)}
              type="email"
              name="email"
              value={this.state.email}
              className="w-100"
            />
          </label>
          <label className="phone-number">
            <p className="paragraph">
              <b>Phone Number</b>
            </p>
            <input
              onChange={event => this.genericOnChange(event)}
              type="number"
              name="phoneNumber"
              value={this.state.phoneNumber}
              className="w-100"
            />
          </label>
          <br />
          <label className="gender">
            <p className="paragraph">
              <b>Gender</b>
            </p>
            <select
              onChange={event => this.genericOnChange(event)}
              name="gender"
            >
              <option value={this.state.gender}>{this.state.gender}</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="similar-accounts">
            <p className="paragraph">
              <b>Similar Account Suggestions</b>
            </p>
            <div className="d-flex direction-row bye">
              <input type="checkbox" className="checkbox jules" />
              <p className="Include">
                Include your account when recommending similar accounts people
                might want to follow. <span className="bluecolor">[?]</span>
              </p>
            </div>
          </label>
          <div className="divfinale">
            <ButtonSubmit text="Submit" styling="blue-button2" />

            <Link to={"#"} className="temporarily">
              Temporarily disable my account
            </Link>
          </div>
        </form>
      </section>
    );
  }
}

export default ModifyProfile;
