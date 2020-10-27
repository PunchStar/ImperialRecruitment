import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import swal from 'sweetalert';

import * as actions from '../../../../app/actions';
import * as authDuck from '../../../../app/store/ducks/auth.duck';
import * as activityDuck from '../../../../app/store/ducks/activity.duck';

import crypto from 'crypto';
import {Config} from "../../../../app/config/config";

function getPassword(str) {
  let salt = Config.salt;
  let textParts = str.split('g');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join('g'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(salt), iv);
  let decrypted = decipher.update(encryptedText);
 
  decrypted = Buffer.concat([decrypted, decipher.final()]);
 
  return decrypted.toString();
}

function Account(props) {

  const [avatar, setAvatar] = useState(props.user.avatar);
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState(getPassword(props.user.password));
  const [incomeRedger, setIncomeRedger] = useState(props.user.incomeRedger);
  const [expensiveRedger, setExpensiveRedger] = useState(props.user.expensiveRedger);
  const [uploadInput, setUploadInput] = useState(null);
  const [showImage, setShowImage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    setAvatar(props.user.avatar);
    setEmail(props.user.email);
    setPassword(getPassword(props.user.password));
    setIncomeRedger(props.user.incomeRedger);
    setExpensiveRedger(props.user.expensiveRedger);
  }, [props])


  const cancel = () => {
    setAvatar(props.user.avatar);
    setEmail(props.user.email);
    setPassword(getPassword(props.user.password));
    setIncomeRedger(props.user.incomeRedger);
    setExpensiveRedger(props.user.expensiveRedger);
  }

  const save = () => {
    if(email === "" || password === "") {
      swal("", "Please confirm all fields.", "error");
      return;
    }

    let updateUser = {
      email: email,
      password: password,
      avatar: uploadInput.files.length !== 0 ? uploadInput.files[0].name : avatar,
      incomeRedger: incomeRedger,
      expensiveRedger: expensiveRedger,
    };
    var myJSON = JSON.stringify(updateUser)
    let data = new FormData();
    data.append('file', uploadInput.files.length !== 0 ? null : uploadInput.files[0]);
    data.append('fileName', avatar);
    data.append('jsonAdmin',myJSON);

    if(uploadInput.files.length !== 0) {
      actions.updateAdminAvatar(data)
        .then(res => {
          let {data} = res;
          if(!data.success) {
            swal("", data.errMessage, "error");
          }
        })
    }

    actions.updateAdmin(data)
      .then(res => {
        let {data} = res;
        if(!data.success) {
          return;
        }
        props.updateRealUser(data.admin);
        props.allActivities(data.activities);
        swal("", "Your profile was updated successfully.", "success");
      })
  }

  const handleFileChange = (event) => {
    event.target.files[0] !== undefined
      ? setShowImage(URL.createObjectURL(event.target.files[0]))
      : setShowImage("")
  }

  const cancelAvatar = (event) => {
    setShowImage("");
    setAvatar("");
  }

  return (
    <div className="row" style={{backgroundColor: "white", padding: "40px 20px 40px 20px"}}>
      <div className="col-md-2">
      </div>
      <div className="col-md-8">
        <div className="col-md-12">
          <span style={{fontSize: "1.275rem", fontWeight: 600 }}>Personal Information</span>
          <button className="btn btn-secondary pull-right" onClick={cancel}>Cancel</button>
          <button className="btn btn-success pull-right" style={{marginRight: 10, }} onClick={save}>Save Changes</button>
        </div>
        <div className="col-md-12" style={{marginTop: 60}}>

          <div className="row">
            <label className="col-xl-3 col-lg-3 col-form-label" style={{paddingLeft: "0.825rem"}}>Avatar</label>
            <div className="col-lg-9 col-xl-6">
              <div className="kt-avatar kt-avatar--outline" id="kt_user_avatar" style={{backgroundImage: showImage !== "" ? `url(${showImage})` : ( avatar === "" ? `url(${Config.bucket_url}/avatar/default.jpg)` : `url(${Config.bucket_url}/avatar/${avatar})` ), backgroundSize: "cover"}}>
                <div className="kt-avatar__holder"></div>
                <label className="kt-avatar__upload" data-toggle="kt-tooltip" title="" data-original-title="Change avatar">
                  <i className="fa fa-pen"></i>
                  <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg" ref={(ref) => { setUploadInput(ref); }} onChange={handleFileChange} required={true}/>
                </label>
                <span className="kt-avatar__cancel" data-toggle="kt-tooltip" title="" data-original-title="Cancel avatar" onClick={cancelAvatar}>
                  <i className="fa fa-times"></i>
                </span>
              </div>
              <span className="form-text text-muted">Allowed file types: png, jpg, jpeg.</span>
            </div>
          </div>

          <div className="row ProfileOneRow">
            <div className="col-md-12">
              <label htmlFor="recipient-name" className="col-md-3 ProfileLeftLabel" >Email</label>
              <input type="text" className="col-md-5 ProfileRightLabel" value={email} onChange={ (e) => setEmail(e.target.value) } maxLength={40} />
            </div>
          </div>

          <div className="row ProfileOneRow">
            <div className="col-md-12">
              <label htmlFor="recipient-name" className="col-md-3 ProfileLeftLabel" >Password</label>
              <input type="text" className="col-md-5 ProfileRightLabel" value={password} onChange={ (e) => setPassword(e.target.value) } maxLength={40} />
            </div>
          </div>

          <div className="row ProfileOneRow">
            <div className="col-md-12">
              <label htmlFor="recipient-name" className="col-md-3 ProfileLeftLabel" >Income Redger</label>
              <input type="number" className="col-md-5 ProfileRightLabel" value={incomeRedger} onChange={ (e) => setIncomeRedger(e.target.value) } maxLength={40} />
            </div>
          </div>

          <div className="row ProfileOneRow">
            <div className="col-md-12">
              <label htmlFor="recipient-name" className="col-md-3 ProfileLeftLabel" >Expensive Redger</label>
              <input type="number" className="col-md-5 ProfileRightLabel" value={expensiveRedger} onChange={ (e) => setExpensiveRedger(e.target.value) } maxLength={40} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(
    mapStateToProps,
    {...authDuck.actions, ...activityDuck.actions}
)(Account);
