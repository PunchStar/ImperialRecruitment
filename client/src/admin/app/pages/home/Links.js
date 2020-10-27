import React, {useState} from "react";
import { connect } from "react-redux";

import LinkShow from "./LinkShow";
import LinkEdit from "./LinkEdit";

import * as actions from '../../../../app/actions';
import * as userDuck from '../../../../app/store/ducks/user.duck';
import * as activityDuck from '../../../../app/store/ducks/activity.duck';

function Links(props) {

  return (
    <>
    {props.currentState.isLinkShow ?
      <LinkShow />
      :
      <LinkEdit />
    }
    </>
  );
}

const mapStateToProps = (state) => ({
  currentState: state.currentState,
})

export default connect(
    mapStateToProps,
    {...userDuck.actions, ...activityDuck.actions}
)(Links);
