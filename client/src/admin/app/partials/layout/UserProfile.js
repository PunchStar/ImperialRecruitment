/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../../_metronic";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";
import { Formik } from "formik";
import swal from 'sweetalert';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import {Config} from "../../../../app/config/config";
import * as actions from '../../../../app/actions';
import * as userDuck from '../../../../app/store/ducks/user.duck';
import * as activityDuck from '../../../../app/store/ducks/activity.duck';

class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openAddModal: false,
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: ""
    }
  }

  closeAddModal = () => {
    this.setState({
      openAddModal: false,
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: ""
    })
  }

  addUser = () => {
    if(this.state.fullName === "" || this.state.address === "" || this.state.phoneNumber === "" || this.state.email === "" || this.state.password === "") {
      swal("", "Please confirm all fields.", "error");
      return;
    }
    let newUser = {
      fullName: this.state.fullName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      password: this.state.password
    }
    setTimeout(() => {
      actions.addUser(newUser)
        .then(res => {
          let {data} = res;
          if(!data.success) {
            swal("", data.errMessage, "error");
            return;
          }
          this.props.addUser(data.users);
          this.props.allActivities(data.activities);

          this.setState({
            openAddModal: false,
            fullName: "",
            address: "",
            phoneNumber: "",
            email: "",
            password: ""
          })

        })
        .catch(() => {
          // disableLoading();
          // setSubmitting(false);
          // setStatus(
          //   intl.formatMessage({
          //     id: "AUTH.VALIDATION.INVALID_LOGIN"
          //   })
          // );
        });
    }, 1);
  }

  handleValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  gotoProfile = (e) => {
    window.location = "/dashboard";
  }

  render() {
    const { user, showHi, showAvatar, showBadge } = this.props;

    return (
      <>
        <Dropdown className="kt-header__topbar-item kt-header__topbar-item--user" drop="down" alignRight>
          <Dropdown.Toggle
            as={HeaderDropdownToggle}
            id="dropdown-toggle-user-profile"
          >
              {
                // showHi && (
                //   <span className="kt-header__topbar-welcome kt-hidden-mobile">
                //     Hi,
                //   </span>
                // )
              }

              {
                // showHi && (
                //   <span className="kt-header__topbar-username kt-hidden-mobile">
                //     {user.fullname}
                //   </span>
                // )
              }

              <img alt="Pic" src={`${Config.bucket_url}/avatar/${this.props.user.avatar}`} />
              {/* {
                showBadge && (
                  <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold kt-hidden-">
                    {user.email}
                  </span>
                )
              } */}
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
            {/** ClassName should be 'dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
            <div
              className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
              style={{
                backgroundImage: `url(${toAbsoluteUrl("/media/misc/bg-1.jpg")})`
              }}
            >
              <div className="kt-user-card__avatar">
                <img alt="Pic" src={`${Config.bucket_url}/avatar/${this.props.user.avatar}`} />
                {/* <span className="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success">
                  S
                </span> */}
              </div>
              <div className="kt-user-card__name">{user.email}</div>
              <div className="kt-user-card__badge">
                {/* <span className="btn btn-success btn-sm btn-bold btn-font-md">
                  {this.props.activities.length + " activities"}
                </span> */}
              </div>
            </div>
            <div className="kt-notification">
              <a className="kt-notification__item" onClick={() => this.gotoProfile()} >
                <div className="kt-notification__item-icon">
                  <i className="flaticon2-calendar-3 kt-font-success" />
                </div>
                <div className="kt-notification__item-details">
                  <div className="kt-notification__item-title kt-font-bold">
                    My Profile
                  </div>
                  <div className="kt-notification__item-time">
                    Account settings and more
                  </div>
                </div>
              </a>
              <a className="kt-notification__item" onClick={() => this.setState({openAddModal: true})} >
                <div className="kt-notification__item-icon">
                  <i className="flaticon2-mail kt-font-warning" />
                </div>
                <div className="kt-notification__item-details">
                  <div className="kt-notification__item-title kt-font-bold">
                    Add Company
                  </div>
                  <div className="kt-notification__item-time">
                    Add New Company...
                  </div>
                </div>
              </a>
              <div className="kt-notification__custom">
                <Link
                  to="/logout"
                  className="btn btn-label-brand btn-sm btn-bold"
                >
                  Sign Out
                </Link>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <Modal open={this.state.openAddModal} onClose={this.closeAddModal} classNames={{ modal: 'addModal' }} >
          <div className="modal-header">
              <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add Company</h5>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{
                email: "admin@demo.com",
                password: "demo"
              }}

              onSubmit={(values, { setStatus, setSubmitting }) => {
                this.addUser();
              }}
            >
              {({
                values,
                status,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <form>

                    <div className="row" style={{paddingBottom: 0, backgroundColor: "white"}}>
                      
                      <div className="col-xl-12 col-md-12">

                        <div className="form-group row">
                            <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Full Name :</span></label>
                            <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={this.state.fullName} name="fullName" onChange={ (e) => this.handleValueChange(e) } maxLength={40} />
                        </div>

                        <div className="form-group row">
                            <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Mailing Address :</span></label>
                            <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={this.state.address} name="address" onChange={ (e) => this.handleValueChange(e) }/>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Phone Number :</span></label>
                            <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={this.state.phoneNumber} name="phoneNumber" onChange={ (e) => this.handleValueChange(e) }/>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Email Address :</span></label>
                            <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={this.state.email} name="email" onChange={ (e) => this.handleValueChange(e) }/>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Password :</span></label>
                            <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={this.state.password} name="password" onChange={ (e) => this.handleValueChange(e) } maxLength={40} />
                        </div>
                        
                        <div className="form-group row">
                          <div className="col-md-12">
                            <button className="btn btn-secondary pull-right" onClick={(e) =>{e.preventDefault(); this.closeAddModal();}}>Cancel</button>
                            <button className="btn btn-success pull-right" style={{marginRight: 10}} onClick={handleSubmit}>Add Company</button>
                          </div>
                        </div>
                        
                      </div>
                    </div>

                </form>
              )}
            </Formik>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  activities: state.activity.activities,
});

export default connect(
  mapStateToProps,
  {...userDuck.actions, ...activityDuck.actions}
)(UserProfile);
