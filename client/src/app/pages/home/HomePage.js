import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";

import * as actions from "../../actions";
import * as pageLinkDuck from "../../store/ducks/pageLink.duck";

import PageLink from "./PageLink";

const GoogleMaterialPage = lazy(() =>
  import("./google-material/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

function HomePage(props) {
  // actions.allPageLinks()
  //   .then(res => {
  //     let {data} = res;
  //     if(!data.success) {
  //       return;
  //     }
  //     props.allPageLinks(data);
  //   })
  //   .catch(() => {
  //   });
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        {/* <Route path="/builder" component={Builder} /> */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/pageLink" component={PageLink} />
        {/* <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} /> */}
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
  pageLinkDuck.actions
)(HomePage)