import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import PerfectScrollbar from "react-perfect-scrollbar";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

function HighestEarner(props) {
  
  useEffect(() => {
  
    let tempHighestEarners = [], sortedUsers = props.users;
    let len = 0;

    //Sort the users by amountMonth
    sortedUsers = sortedUsers.slice().sort((a, b) => b['amountMonth'] - a['amountMonth']);

    //Calculate the number of displaying values.
    len = sortedUsers.length;
    // if(len>3)
    //   len = 3;

    //Get top 3 higest earners.
    tempHighestEarners = sortedUsers.slice(0, len);

    setHighestEarners(tempHighestEarners);

  }, [props]);

  const [highestEarners, setHighestEarners] = useState([]);
  
  return (
    <div className="kt-widget1" style={{backgroundColor: "white", border: "1px solid #EBEDF3"}}>
      <div className="kt-widget1__item ng-star-inserted">
        <div className="kt-widget1__info">
          <h3 className="shortcutTitle">Highest Earners</h3>
        </div>
        <div className="d-flex">
          <span className="symbol symbol-50 symbol-light-success mr-1">
            <div className="symbol-label">
              <img src="https://preview.keenthemes.com/metronic/theme/html/demo11/dist/assets/media/svg/avatars/001-boy.svg" className="h-75 align-self-end" alt=""/>
            </div>
          </span>
          <span className="symbol symbol-50 symbol-light-success mr-1">
            <div className="symbol-label">
              <img src="https://preview.keenthemes.com/metronic/theme/html/demo11/dist/assets/media/svg/avatars/028-girl-16.svg" className="h-75 align-self-end" alt=""/>
            </div>
          </span>
          <span className="symbol symbol-50 symbol-light-success mr-1">
            <div className="symbol-label">
              <img src="https://preview.keenthemes.com/metronic/theme/html/demo11/dist/assets/media/svg/avatars/024-boy-9.svg" className="h-75 align-self-end" alt=""/>
            </div>
          </span>
        </div>
      </div>

      <PerfectScrollbar
        options={perfectScrollbarOptions}
        style={{ maxHeight: "23vh", position: "relative" }}
      >

        {highestEarners.map((earner, index) => 
          <div className="kt-widget1__item ng-star-inserted" key={index}>
            <div className="kt-widget1__info">
              {/* <h3 className="kt-widget1__title">{earner.fullName}</h3>
              <span className="kt-widget1__desc">{earner.email}</span> */}
              <h3 className="showReportsLeftLabel">{earner.fullName}</h3>
              <span className="showReportsRightLabel">{earner.email}</span>
            </div>

            {/* <span className="kt-widget1__number kt-font-danger">${earner.amountMonth}</span> */}
            <span className="showReportsLeftLabel">${earner.amountMonth}</span>
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
    null
  )(HighestEarner)
);
