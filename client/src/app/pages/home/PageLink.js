import React, { useState } from "react";
import { connect } from "react-redux";

function PageLink(props) {

  return (
    window.location.pathname.split("/")[2] === "banner" ?
      <div dangerouslySetInnerHTML={{__html: props.banner}} />      
      :  window.location.pathname.split("/")[2] === "terms" ?
          <div dangerouslySetInnerHTML={{__html: props.terms}} />      
          : window.location.pathname.split("/")[2] === "privacy" ?
            <div dangerouslySetInnerHTML={{__html: props.privacy}} />      
            : window.location.pathname.split("/")[2] === "contact" ?
              <div dangerouslySetInnerHTML={{__html: props.contact}} />
              : <></>
  );
}

const mapStateToProps = (state) => ({
  banner: state.pageLink.banner,
  terms: state.pageLink.terms,
  privacy: state.pageLink.privacy,
  contact: state.pageLink.contact,
})

export default connect(
  mapStateToProps,
  null
)(PageLink);