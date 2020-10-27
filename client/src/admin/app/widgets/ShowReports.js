/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import PerfectScrollbar from "react-perfect-scrollbar";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

function ShowReports(props) {
 
  // var tempUsers = [];
  // var len = props.users.length;
  // // if(len > 5)
  // //   len = 5;

  // for(let i = 0 ; i < len ; i ++)
  //   tempUsers.push(props.users[i]);
 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    var tempUsers = [];
    var len = props.users.length;
    // if(len > 5)
    //   len = 5;

    for(let i = 0 ; i < len ; i ++)
      tempUsers.push(props.users[i]);

    setUsers(tempUsers);

  }, [props]);
 
  
  return (
    <>
      <PerfectScrollbar
        options={perfectScrollbarOptions}
        style={{ maxHeight: "30vh", position: "relative" }}
      >
        <div className="kt-portlet__body">
          <div className="kt-widget4">

            {users.map((user, index) =>
              <div className="kt-widget4__item reportItem" key={index}>
                <span className="col-sm-6 showReportsLeftLabel">
                  {user.fullName}
                </span>
                <span className="col-sm-6 showReportsRightLabel">{user.email}</span>
              </div>
            )}

          </div>
        </div>
      </PerfectScrollbar>
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users
})

export default injectIntl(
  connect(
    mapStateToProps,
    null
  )(ShowReports)
);
