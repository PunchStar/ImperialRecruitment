import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import AllCompanies from "./AllCompanies";
import Builder from "./Builder";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";

import * as actions from '../../../../app/actions';
import * as userDuck from '../../../../app/store/ducks/user.duck';
import * as activityDuck from '../../../../app/store/ducks/activity.duck';
import * as shortcutDuck from '../../../../app/store/ducks/shortcut.duck';
import * as pageLinkDuck from '../../../../app/store/ducks/pageLink.duck';

const GoogleMaterialPage = lazy(() =>
  import("./google-material/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

function HomePage(props) {
  // useEffect(() => {
  //   console.log('Home page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

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

  actions.allPageLinks()
    .then(res => {
      let {data} = res;
      if(!data.success) {
        // props.allPageLinks();
      } else {
        props.allPageLinks(data);
      }
    })
    .catch((err) => {
      // console.log(err)
      // props.allShortCuts([]);
    });


  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/dashboard" component={Dashboard} />
        {/* <Route path="/allCompanies" component={AllCompanies} /> */}
        {/* <Route path="/builder" component={Builder} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} /> */}
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}

export default connect(
  null,
  {...userDuck.actions, ...shortcutDuck.actions, ...activityDuck.actions, ...pageLinkDuck.actions}
)(HomePage)
