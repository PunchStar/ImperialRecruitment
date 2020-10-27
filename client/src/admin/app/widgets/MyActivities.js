/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import PerfectScrollbar from "react-perfect-scrollbar";

import * as actions from '../../../app/actions';
import * as activityDuck from '../../../app/store/ducks/activity.duck';

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

function MyActivities(props) {

  const [activity, setActivity] = useState([]);

  useEffect(() => {
    let tempActivities = [], len = 0;

    //Calculate the length of activities.
    len = props.activities.length
    // if(len > 5)
    //   len = 5;

    for( let i = props.activities.length - 1, j = 0; j < len ; i --, j ++) {
      let content = "";
      let time = "";
      let color = "";
      content = props.activities[i].content;
      time = new Date(props.activities[i].time).getHours() + ":" + new Date(props.activities[i].time).getMinutes();
      switch(props.activities[i].type) {
        case 0:
          color = "kt-font-info"; break;
        case 1:
          color = "kt-font-success"; break;
        case 2:
          color = "kt-font-danger"; break;
        case 3:
          color = "black"; break;
      }
      tempActivities.push({
        content: content,
        time: time,
        color: color
      })
    }

    setActivity(tempActivities);
  }, [props])

  return (
    <div style={{border: "1px solid #EBEDF3", borderRadius: "0.42rem"}}>
      <div className="kt-portlet kt-portlet--height-fluid" style={{marginBottom: 0}}>
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title" style={{ fontWeight: 600, fontSize: "1.275rem"}}>My Activities</h3>
          </div>
        </div>
        <div className="kt-portlet__body">
          {/* style="max-height: 50vh;" */}
          <PerfectScrollbar
            options={perfectScrollbarOptions}
            style={{ maxHeight: "23vh", position: "relative" }}
          >
            <div className="kt-timeline-v2 ps ps--active-y">
              <div className="kt-timeline-v2__items kt-padding-top-25 kt-padding-bottom-30">
                {activity.map((item, index) =>
                  <div className="kt-timeline-v2__item" key={index}>
                    <span className="kt-timeline-v2__item-time">{item.time}</span>
                    <div className="kt-timeline-v2__item-cricle">
                      <i className={`fa fa-genderless ${item.color}`} />
                    </div>
                    <div className="kt-timeline-v2__item-text kt-padding-top-5" style={{fontSize: "1.08rem", color: "#7E8299", fontWeight: 400}}>
                      {item.content}
                    </div>
                    <div className="kt-list-pics kt-list-pics--sm kt-padding-l-20" />
                  </div>
                )}
              </div>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activities: state.activity.activities
})

export default injectIntl(
  connect(
    mapStateToProps,
    activityDuck.actions
  )(MyActivities)
);
