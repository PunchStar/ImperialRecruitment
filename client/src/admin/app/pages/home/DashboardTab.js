import React, { useState, useMemo, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import { metronic } from "../../../_metronic";
import QuickStatsChart from "../../widgets/QuickStatsChart";
import MonthlyIncome from "../../widgets/MonthlyIncome";
import OrdersWidget from "../../widgets/OrdersWidget";
import HighestEarner from "../../widgets/HighestEarner";
import MyActivities from "../../widgets/MyActivities";
import ShortCut from "../../widgets/ShortCut";
import GenerateReports from "../../widgets/GenerateReports";
import ShowReports from "../../widgets/ShowReports";
import Closure from "../../widgets/Closure";

import * as actions from '../../../../app/actions';
import * as userDuck from '../../../../app/store/ducks/user.duck';
import * as activityDuck from '../../../../app/store/ducks/activity.duck';
import * as shortcutDuck from '../../../../app/store/ducks/shortcut.duck';


function DashboardTab(props) {

  let tempNewUsers = 0, tempMonthIncome = 0;
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  props.users.map(user => {
    let diffDay = Math.round( Math.abs(new Date(user.registeredTime) - Date.now()) / oneDay)
    if(diffDay < 90)
      tempNewUsers ++;

    tempMonthIncome += user.amountMonth;
  })

  const [reportUsers, setReportUsers] = useState(props.users);
  const [allCompanies, setAllCompanies] = useState(props.users.length);
  const [newUsers, setNewUsers] = useState(tempNewUsers);
  const [incomeRedger, setIncomeRedger] = useState(props.auth.user.incomeRedger);
  const [expensiveRedger, setExpensiveRedger] = useState(props.auth.user.expensiveRedger);
  const [monthIncome, setMonthIncome] = useState(tempMonthIncome);

  useEffect(() => {
    let tempNewUsers = 0, tempMonthIncome = 0;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  
    props.users.map(user => {
      let diffDay = Math.round( Math.abs(new Date(user.registeredTime) - Date.now()) / oneDay)
      if(diffDay < 90)
        tempNewUsers ++;
  
      tempMonthIncome += user.amountMonth;
    })
  
    setAllCompanies(props.users.length);
    setNewUsers(tempNewUsers);
    setIncomeRedger(props.auth.user.incomeRedger);
    setExpensiveRedger(props.auth.user.expensiveRedger);
    setMonthIncome(tempMonthIncome);
    setReportUsers(props.users);
  }, [props])

  const { brandColor, dangerColor, successColor, primaryColor } = useSelector(
    state => ({
      brandColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.brand"
      ),
      dangerColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.danger"
      ),
      successColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.success"
      ),
      primaryColor: metronic.builder.selectors.getConfig(
        state,
        "colors.state.primary"
      )
    })
  );

  const chartOptions = useMemo(
    () => ({
      chart1: {
        data: [10, 14, 18, 11, 9, 12, 14, 17, 18, 14],
        color: brandColor,
        border: 3
      },

      chart2: {
        data: [11, 12, 18, 13, 11, 12, 15, 13, 19, 15],
        color: dangerColor,
        border: 3
      },

      chart3: {
        data: [12, 12, 18, 11, 15, 12, 13, 16, 11, 18],
        color: successColor,
        border: 3
      },

      chart4: {
        data: [11, 9, 13, 18, 13, 15, 14, 13, 18, 15],
        color: primaryColor,
        border: 3
      }
    }),
    [brandColor, dangerColor, primaryColor, successColor]
  );

  var isDashboardFirstRender = localStorage.getItem("isDashboardFirstRender") === "false" ? false: true;

  if(isDashboardFirstRender) {
      actions.allUsers()
        .then(res => {
          let {data} = res;
          if(!data.success) {
            props.allUsers([]);
          } else {
            props.allUsers(data.users);
          }
        })
        .catch((err) => {
          // console.log(err)
          // props.allUsers([]);
        });

      actions.allShortCuts()
        .then(res => {
          let {data} = res;
          if(!data.success) {
            props.allShortCuts([]);
          } else {
            props.allShortCuts(data.shortcuts);
          }
        })
        .catch((err) => {
          // console.log(err)
          // props.allShortCuts([]);
        });

      actions.allActivities()
        .then(res => {
          let {data} = res;
          if(!data.success) {
            props.allActivities([]);
          } else {
            props.allActivities(data.activities);
          }
        })
        .catch((err) => {
          // console.log(err)
          // props.allShortCuts([]);
        });

    localStorage.setItem("isDashboardFirstRender", false);

    // window.location = "/";
  }


  return (
    <div>
      {/* <h3>Dashboard</h3> */}

      <div className="row" style={{paddingTop: 50}}>
        <div className="col-xl-8 col-md-12">
          <div className="row">
            <div className="col-xl-6" style={{paddingLeft: 20}}>
              <div className="row" style={{paddingBottom: 20}}>
                <div className="col-xl-6" style={{marginBottom: 15}}>
                  <QuickStatsChart
                      value="All Companies"
                      desc="1"
                      content={allCompanies}
                      data={chartOptions.chart1.data}
                      color={chartOptions.chart1.color}
                      border={chartOptions.chart1.border}
                    />
                </div>
                <div className="col-xl-6" style={{marginBottom: 15}}>
                  <QuickStatsChart
                      value="New Users"
                      desc="2"
                      content={newUsers}
                      data={chartOptions.chart1.data}
                      color={chartOptions.chart1.color}
                      border={chartOptions.chart1.border}
                    />
                </div>
                <div className="col-xl-6" style={{marginBottom: 15}}>
                  <QuickStatsChart
                      value="Income Redger"
                      desc="3"
                      content={"$ " + incomeRedger}
                      data={chartOptions.chart1.data}
                      color={chartOptions.chart1.color}
                      border={chartOptions.chart1.border}
                    />
                </div>
                <div className="col-xl-6" style={{marginBottom: 15}}>
                  <QuickStatsChart
                      value="Expensive Redger"
                      desc="4"
                      content={"$ " + expensiveRedger}
                      data={chartOptions.chart1.data}
                      color={chartOptions.chart1.color}
                      border={chartOptions.chart1.border}
                    />
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <MyActivities />
            </div>
  
          </div>

          <div className="row" style={{marginTop: 20}}>
            <div className="col-xl-6">
              <ShortCut />
            </div>

            <div className="col-xl-6">
              <div className="kt-portlet kt-portlet--height-fluid" style={{border: "1px solid #EBEDF3", borderRadius: "0.42rem"}}>
                <GenerateReports />
                <ShowReports />
              </div>
            </div>

          </div>
        </div>

        <div className="col-xl-4">
          <div className="col-xl-12" style={{marginBottom: 20}}>
          <MonthlyIncome
              value="Monthly Income"
              desc=""
              content={"$ " + monthIncome}
              data={chartOptions.chart1.data}
              color={chartOptions.chart1.color}
              border={chartOptions.chart1.border}
            />
          </div>
          <div className="col-xl-12" style={{marginBottom: 20}}>
            <HighestEarner />
          </div>
          <div className="col-xl-12">
            <Closure />
          </div>
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.user.users
})

export default injectIntl(
  connect(
    mapStateToProps,
    {...userDuck.actions, ...shortcutDuck.actions, ...activityDuck.actions}
  )(DashboardTab)
);
