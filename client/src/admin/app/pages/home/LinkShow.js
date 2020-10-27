import React, {useState} from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

import * as currentStateDuck from '../../../../app/store/ducks/currentState.duck';

const listPageLinks = ["Banner Page", "Terms and Conditions Page", "Privacy and Policy Page", "Contact Page"];

function LinkShow(props) {

  const editLinkPage = (e, index) => {
    e.preventDefault();
    props.allCurrentStates({pageIndex: index, isLinkShow:false})
  }

  return (
    <div style={{backgroundColor: "white", padding: "40px 20px 40px 20px"}}>
      <Table bordered hover>
        <tbody>
          <tr className="pagelinkHead">
            <td>{"Page"}</td>
            <td>
              {"Action"}
            </td>
          </tr>
          {listPageLinks.map((link, index) => 
          <tr className="pageLinkBody">
            <td>{link}</td>
            <td>
              <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={(e) => editLinkPage(e, index)} />
            </td>
          </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.user.users
})

export default connect(
    mapStateToProps,
    {...currentStateDuck.actions}
  )(LinkShow);
