import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import PerfectScrollbar from "react-perfect-scrollbar";

import * as actions from '../../../app/actions';
import * as userDuck from '../../../app/store/ducks/user.duck';
import * as activityDuck from '../../../app/store/ducks/activity.duck';

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

const showStatus = [
  {label: "Active", color: "#1BC5BD"},
  {label: "Pending for Closure", color: "#3699FF"},
  {label: "Closed", color: "#FFA800"},
]

function Closure(props) {
  
  useEffect(() => {
  
    let tempClosures = [], sortedUsers = props.users;
    let len = 0;

    //Sort the users by amountMonth
    sortedUsers = sortedUsers.slice().sort((a, b) => b['amountMonth'] - a['amountMonth']);

    //Calculate the number of displaying values.
    len = sortedUsers.length;
    // if(len>2)
    //   len = 2;

    //Get top 2 higest earners.
    tempClosures = sortedUsers.slice(0, len);

    setClosures(tempClosures);

  }, [props]);

  const [closures, setClosures] = useState([]);

  const handleUserStatusChange = (earnerId, e) => {
    
    let value = 0;
    showStatus.map((item, index) => {
      if(item.label === e.target.value) {
        value = index;
        return;
      }
    })

    let shortcutObj = {
      _id: earnerId,
      key: "status",
      value: value
    }
    actions.updateUserOneItem(shortcutObj)
      .then(res => {
        let {data} = res;
        if(!data.success) {
          return;
        }
        props.allUsers(data.users);
        props.allActivities(data.activities);
      })
  }
  
  return (
    <div className="kt-widget1" style={{backgroundColor: "white", border: "1px solid #EBEDF3"}}>
      <div className="kt-widget1__item ng-star-inserted">
        <div className="kt-widget1__info">
          <h3 className="shortcutTitle">Due for Closure</h3>
        </div>
      </div>

      <PerfectScrollbar
        options={perfectScrollbarOptions}
        style={{ maxHeight: "14vh", height: "14vh", position: "relative" }}
      >
        {closures.map((earner, index) => 
          <div className="kt-widget1__item ng-star-inserted" key={index}>
            <span className="bullet bullet-bar align-self-stretch" style={{backgroundColor: `${showStatus[earner.status].color}`}}></span>
            <div className="kt-widget1__info">
              {/* <h3 className="kt-widget1__title">{earner.fullName}</h3>
              <span className="kt-widget1__desc">{earner.email}</span> */}
              <h3 className="showReportsLeftLabel">{earner.fullName}</h3>
              <span className="showReportsRightLabel">{earner.email}</span>
            </div>

            {/* <span className="showReportsLeftLabel" style={{color: `${showStatus[earner.status].color}`}}>{showStatus[earner.status].label}</span> */}

            <select className="form-control digits" name="brandSelect" style={{width: "175px"}} defaultValue={showStatus[earner.status].label} onChange={ (e) => handleUserStatusChange(earner._id, e) }>
              {showStatus.map((oneValue, num) => 
                  <option key={num} value={oneValue.label}>
                      { oneValue.label }
                  </option>
              )}
            </select>

          </div>
        )}
      </PerfectScrollbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users
})

export default injectIntl(
  connect(
    mapStateToProps,
    {...userDuck.actions, ...activityDuck.actions}
  )(Closure)
);
