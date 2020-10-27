import React, {useState} from "react";
import { connect } from "react-redux";
import CKEditors from "react-ckeditor-component";
import swal from 'sweetalert';

import * as actions from '../../../../app/actions';
import * as currentStateDuck from '../../../../app/store/ducks/currentState.duck';
import * as pageLinkDuck from '../../../../app/store/ducks/pageLink.duck';

import {Config} from "../../../../app/config/config";

function LinkEdit(props) {

  let tempContent = "";
  switch(props.currentState.pageIndex) {
    case 0:
      tempContent = props.pageLink.banner;
      break;
    case 1:
      tempContent = props.pageLink.terms;
      break;
    case 2:
      tempContent = props.pageLink.privacy;
      break;
    case 3:
      tempContent = props.pageLink.contact;
      break;
    default:
      tempContent = props.pageLink.banner;
      break;
  }

  const [content, setContent] = useState(tempContent);
  const [bannerLink, setBannerLink] = useState(props.pageLink.banner.url);
  const [bannerImage, setBannerImage] = useState(props.pageLink.banner.image);
  const [uploadInput, setUploadInput] = useState(null);
  const [showImage, setShowImage] = useState("");

  const onChange = (evt) => {
    var newContent = evt.editor.getData();
    setContent(newContent)
  }

  const onBlur = (evt) => {
  }
  
  const afterPaste = (evt) => {
  }

  const save = (e) => {
    e.preventDefault();
    actions.updatePageLink(props.currentState.pageIndex, content)
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
    props.allCurrentStates({pageIndex: 0, isLinkShow:true})
  }

  const saveBannerPage = (e) => {
    e.preventDefault();

    if(bannerLink === "") {
      swal("", "Before, updating, Please confirm banner link field.", "error");
      return;
    }

    let tempContent = {
      image: uploadInput.files.length !== 0 ? uploadInput.files[0].name : bannerImage,
      url: bannerLink
    }
    var myJSON = JSON.stringify(tempContent)
    let data = new FormData();
    data.append('file', uploadInput.files.length !== 0 ? uploadInput.files[0] : null );
    data.append('fileName', uploadInput.files.length !== 0 ? uploadInput.files[0].name : "" );
    data.append('bannerImage',myJSON);

    if(uploadInput.files.length !== 0) {
      actions.updateBannerImage(data)
        .then(res => {
          let {data} = res;
          if(!data.success) {
            swal("", data.errMessage, "error");
          }
        })
    }

    actions.updatePageLink(props.currentState.pageIndex, tempContent)
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
    props.allCurrentStates({pageIndex: 0, isLinkShow:true})
  }

  const cancel = (e) => {
    e.preventDefault();
    setContent(null);
    setBannerLink("");
    setBannerImage("");
    setUploadInput(null);
    setShowImage("");
    props.allCurrentStates({pageIndex: 0, isLinkShow:true})
  }

  const handleFileChange = (event) => {
    event.target.files[0] !== undefined
      ? setShowImage(URL.createObjectURL(event.target.files[0]))
      : setShowImage("")
  }

  return (
    props.currentState.pageIndex === 0 
      ? <div style={{backgroundColor: "white", padding: "40px 20px 40px 20px"}}>
          <div className="col-md-12">
            {/* <h3>All Companies</h3> */}
            <button className="btn btn-secondary pull-right" onClick={cancel}>Cancel</button>
            <button className="btn btn-success pull-right" style={{marginRight: 10}} onClick={saveBannerPage}>Save Changes</button>
          </div>

          <div className="col-md-12" style={{marginTop: 60}}>

            <div className="row">
              <label className="col-xl-3 col-lg-3 col-form-label" style={{paddingLeft: "0.825rem"}}>Banner Image</label>
              <div className="col-lg-9 col-xl-6 bannerImageClass">
                <div className="kt-avatar kt-avatar--outline" id="kt_user_avatar" style={{backgroundImage: showImage !== "" ? `url(${showImage})` : `url(${Config.bucket_url}/banner/${bannerImage})`, backgroundSize: "cover"}}>
                  <div className="kt-avatar__holder"></div>
                  <label className="kt-avatar__upload" data-toggle="kt-tooltip" title="" data-original-title="Change banner">
                    <i className="fa fa-pen"></i>
                    <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg" ref={(ref) => { setUploadInput(ref); }} onChange={handleFileChange} required={true}/>
                  </label>
                  {/* <span className="kt-avatar__cancel" data-toggle="kt-tooltip" title="" data-original-title="Cancel banner" onClick={cancelBanner}>
                    <i className="fa fa-times"></i>
                  </span> */}
                </div>
                <span className="form-text text-muted">Allowed file types: png, jpg, jpeg.(460 * 80)</span>
              </div>
            </div>

            <div className="row ProfileOneRow">
              <div className="col-md-12">
                <label htmlFor="recipient-name" className="col-md-3 ProfileLeftLabel" >Banner Link</label>
                <input type="text" className="col-md-5 ProfileRightLabel" value={bannerLink} onChange={ (e) => setBannerLink(e.target.value) } maxLength={40} />
              </div>
            </div>

          </div>
        </div>
      : <div style={{backgroundColor: "white", padding: "40px 20px 40px 20px"}}>
          <div className="col-md-12">
            {/* <h3>All Companies</h3> */}
            <button className="btn btn-secondary pull-right" onClick={cancel}>Cancel</button>
            <button className="btn btn-success pull-right" style={{marginRight: 10}} onClick={save}>Save Changes</button>
          </div>
          <div className="col-md-12" style={{marginTop: 60}}>
            <CKEditors
              activeclassName="p10"
              content={content}
              events={{
                  "blur": onBlur,
                  "afterPaste": afterPaste,
                  "change": onChange
              }}
          />
          </div>
        </div>
  );
}

const mapStateToProps = (state) => ({
  currentState: state.currentState,
  pageLink: state.pageLink
})

export default connect(
    mapStateToProps,
    {...currentStateDuck.actions, ...pageLinkDuck.actions}
  )(LinkEdit);
