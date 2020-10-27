/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";

import UserProfile from "../../../../app/partials/layout/UserProfile";

class Topbar extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {

    return (
        <div className="kt-header__topbar">

          <div className="row pull-right" style={{verticalAlign: "middle"}}>
            <UserProfile showAvatar={false} showHi={true} showBadge={true} />
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default injectIntl(
  connect(
    mapStateToProps,
    null
  )(Topbar)
);
