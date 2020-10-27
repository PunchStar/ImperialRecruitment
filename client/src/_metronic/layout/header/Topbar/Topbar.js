/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
// import swal from 'sweetalert';

import QuickPanelToggler from "./quick-panel-toggler/QuickPanelToggle";
import QuickActionsPanel from "../../../../app/partials/layout/QuickActionsPanel";
import MyCart from "../../../../app/partials/layout/MyCart";
import UserNotifications from "../../../../app/partials/layout/UserNotifications";
import UserProfile from "../../../../app/partials/layout/UserProfile";
import LanguageSelector from "../../../../app/partials/layout/LanguageSelector";
import { toAbsoluteUrl } from "../../../utils/utils";

class Topbar extends React.Component {

  constructor(props) {
    super(props);
  }

  // editAmountMonth = async () => {
  //   let input = document.createElement("input");
  //   input.value = this.state.amountMonth;
  //   input.type = 'number';
  //   input.className = 'swal-content__input';
  //   let result = await swal('Amount Earning Monthly :', {
  //       content: input,
  //       buttons: ["Cancel", "Update"]
  //   });
  //   if(result) {
  //     this.setState({ amountMonth: input.value !== "" ? input.value : 0 })
  //   }
  // };


  render() {

    return (
        <div className="kt-header__topbar">

          <div className="row pull-right" style={{verticalAlign: "middle"}}>
            <h5 style={{marginRight: 50, paddingTop: 10}}>{this.props.auth.user.companyName}</h5>
            <UserProfile showAvatar={false} showHi={true} showBadge={true} />
          </div>

        {/* <MyCart
          icon={toAbsoluteUrl("/media/icons/svg/Shopping/Cart%233.svg")}
          iconType=""
          useSVG="true"
          bgImage={toAbsoluteUrl("/media/misc/bg-1.jpg")}
        />

        <UserNotifications
          bgImage={toAbsoluteUrl("/media/misc/bg-1.jpg")}
          pulse="true"
          pulseLight="false"
          skin="dark"
          icon={toAbsoluteUrl("/media/icons/svg/Code/Compiling.svg")}
          iconType=""
          type="success"
          useSVG="true"
          dot="false"
        />

        <QuickActionsPanel
          bgImage={toAbsoluteUrl("/media/misc/bg-2.jpg")}
          skin="dark"
          iconType=""
          icon={toAbsoluteUrl("/media/icons/svg/Media/Equalizer.svg")}
          useSVG="true"
          gridNavSkin="light"
        />

        <QuickPanelToggler />

        <LanguageSelector iconType="" /> */}
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
