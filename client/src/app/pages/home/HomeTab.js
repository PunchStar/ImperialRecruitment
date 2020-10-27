import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../_metronic/utils/utils";
import swal from 'sweetalert';
import { FormattedMessage, injectIntl } from "react-intl";
import Dropzone from 'react-dropzone'
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Link } from "react-router-dom";

import crypto from 'crypto';
import { Config } from '../../config/config';

import * as actions from '../../actions';
import * as authDuck from '../../store/ducks/auth.duck';

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

function HomeTab(props) {

  //Set listdocumentstatus
  let tempListDocumentStatus = [];
  tempListDocumentStatus.push(props.user.driverLicense.state)
  tempListDocumentStatus.push(props.user.social.state)
  tempListDocumentStatus.push(props.user.passport.state)
  tempListDocumentStatus.push(props.user.tax.state)
  tempListDocumentStatus.push(props.user.statement.state)
  tempListDocumentStatus.push(props.user.utility.state)
  tempListDocumentStatus.push(props.user.phoneBill.state)
  tempListDocumentStatus.push(props.user.additionalDoc.state)

  let [currentUserId, setCurrentUserId] = useState(props.user._id);
  let [beforeFullName, setBeforeFullName] = useState("");
  let [beforeAddress, setBeforeAddress] = useState("");
  let [beforePhoneNumber, setBeforePhoneNumber] = useState("");
  let [beforeEmail, setBeforeEmail] = useState("");
  let [beforePassword, setBeforePassword] = useState("");
  let [beforeFico, setBeforeFICO] = useState(0);
  let [beforeBankName, setBeforeBankName] = useState("");
  let [beforeAccountNumber, setBeforeAccountNumber] = useState("");
  let [beforeRoutingNumber, setBeforeRoutingNumber] = useState("");
  let [beforeZelle, setBeforeZelle] = useState("");
  let [beforeAmountMonth, setBeforeAmountMonth] = useState(0);

  let [fullName, setFullName] = useState(props.user.fullName);
  let [isFullNameEdit, setIsFullNameEdit] = useState(false);
  let [address, setAddress] = useState(props.user.address);
  let [isAddressEdit, setIsAddressEdit] = useState(false);
  let [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
  let [isPhoneNumberEdit, setIsPhoneNumberEdit] = useState(false);
  let [email, setEmail] = useState(props.user.email);
  let [isEmailEdit, setIsEmailEdit] = useState(false);
  let [fico, setFICO] = useState(props.user.fico);
  let [isFICOEdit, setIsFICOEdit] = useState(false);
  let [bankName, setBankName] = useState(props.user.bankName);
  let [isBankNameEdit, setIsBankNameEdit] = useState(false);
  let [accountNumber, setAccountNumber] = useState(props.user.accountNumber);
  let [isAccountNumberEdit, setIsAccountNumberEdit] = useState(false);
  let [routingNumber, setRoutingNumber] = useState(props.user.routingNumber);
  let [isRoutingNumberEdit, setIsRoutingNumberEdit] = useState(false);
  let [zelle, setZelle] = useState(props.user.zelle);
  let [isZelleEdit, setIsZelleEdit] = useState(false);
  let [listDocumentStatus, setListDocumentStatus] = useState(tempListDocumentStatus);
  let [amountMonth, setAmountMonth] = useState(props.user.amountMonth);
  let [isAmountMonthEdit, setIsAmountMonthEdit] = useState(false);
  let [managementFee, setManagementFee] = useState(props.user.managementFee);
  let [referer, setReferer] = useState(props.user.referer);
  let [notes, setNotes] = useState(props.user.notes);
  let [companyName, setCompanyName] = useState(props.user.companyName);
  let [password, setPassword] = useState(props.user.password);

  let [openFileUploadModal, setOpenFileUploadModal] = useState(false);
  let [selectedFileNames, setSelectedFileNames] = useState([]);   //files' name for one document
  let [selectedFiles, setSelectedFiles] = useState([]);
  let [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0);
  let [listIsMultipleUpload, setListIsMultipleUpload] = useState([false, false, false, true, true, false, false, true])

  let [isShowFullNameEdit, setIsShowFullNameEdit] = useState(true);
  let [isShowAddressEdit, setIsShowAddressEdit] = useState(true);
  let [isShowPhoneNumberEdit, setIsShowPhoneNumberEdit] = useState(true);
  let [isShowEmailEdit, setIsShowEmailEdit] = useState(true);
  let [isShowFICOEdit, setIsShowFICOEdit] = useState(true);
  let [isShowBankNameEdit, setIsShowBankNameEdit] = useState(true);
  let [isShowAccountNumberEdit, setIsShowAccountNumberEdit] = useState(true);
  let [isShowRoutingNumberEdit, setIsShowRoutingNumberEdit] = useState(true);
  let [isShowZelleEdit, setIsShowZelleEdit] = useState(true);
  let [isShowAmountMonthEdit, setIsShowAmountMonthEdit] = useState(true);

  let documentTypes = ["State Drivers License or ID", "Social Security Card", "USA Passport (showing all 4 corners)", "2 year Most Recent Tax Returns (Full)", "3 months Most Recent Bank Statements", "Utility Bill", "Mobile Phone Bill", "Any additional documents"];
  let documentStates = ["Please Upload", "Pending", "Approved", "Not Available"];
  const statusColors = [
   'rgb(251, 140, 0)',   //please upload
   '#757575',   //pending
   '#43a047',   //approved
   'red',       //not available
  ];
  const statusBackgroundColors = [
    'rgb(236, 237, 223)',
    '#e5e5e5',   
    '#e3f0e7',  
    '#ffcccc',
   ];

  const handleFICOChange = (event) => {
    let { value, min, max } = event.target;
    // value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setFICO(value);
    setIsFICOEdit(true)
  }
  const onNotAvailableBtnClick = (selectedIndex) => {
    const status = listDocumentStatus[selectedIndex];
    if(status === 1) {
      swal("", "Your document's status is currently pending!", "warning");
      return;
    }
    if(status === 2) {
      swal("", "Your document was already approved!", "warning");
      return;
    }

    let key = "";
    let value = {};
    switch(selectedIndex) {
      case 0:
        key = "driverLicense";
        value = {
          file: props.user.driverLicense.file,
          state: 0,          
        }
        break;
      case 1:
        key = "social";
        value = {
          file: props.user.social.file,
          state: 0,          
        }
        break;
      case 2:
        key = "passport";
        value = {
          file: props.user.passport.file,
          state: 0,          
        }
        break;
      case 3:
        key = "tax";
        value = {
          files: props.user.driverLicense.files,
          state: 0,          
        }
        break;
      case 4:
        key = "statement";
        value = {
          files: props.user.driverLicense.files,
          state: 0,          
        }
        break;
      case 5:
        key = "utility";
        value = {
          file: props.user.utility.file,
          state: 0,          
        }
        break;
      case 6:
        key = "phoneBill";
        value = {
          file: props.user.phoneBill.file,
          state: 0,          
        }
        break;
      case 7:
        key = "additionalDoc";
        value = {
          files: props.user.additionalDoc.files,
          state: 0,          
        }
        break;
      default:
        key = "driverLicense";
        value = {
          file: props.user.driverLicense.file,
          state: 0,          
        }
        break;
    }

    if (status === 3) {
      listDocumentStatus.splice(selectedIndex, 1, 0);
      updateUser(key, value);
    } else {
      listDocumentStatus.splice(selectedIndex, 1, 3);
      value.state = 3;
      updateUser(key, value);
    }
    setListDocumentStatus([...listDocumentStatus]);
  }

  const updateUser = (key, value) => {
    let user = {
      _id: currentUserId,
      fullName: props.user.fullName,
      address: props.user.address,
      phoneNumber: props.user.phoneNumber,
      email: props.user.email,
      password: getPassword(props.user.password),
      companyName: props.user.companyName,
      fico: props.user.fico,
      bankName: props.user.bankName,
      accountNumber: props.user.accountNumber,
      routingNumber: props.user.routingNumber,
      zelle: props.user.zelle,
      amountMonth: props.user.amountMonth,
      managementFee: props.user.managementFee,
      referer: props.user.referer,
      notes: props.user.notes,
      driverLicense: {
        file: props.user.driverLicense.file,
        state: props.user.driverLicense.state,
      },
      social: {
        file: props.user.social.file,
        state: props.user.social.state,
      },
      passport: {
        file: props.user.passport.file,
        state: props.user.passport.state,
      },
      tax: {
        files: props.user.tax.files,
        state: props.user.tax.state,
      },
      statement: {
        files: props.user.statement.files,
        state: props.user.statement.state,
      },
      utility: {
        file: props.user.utility.file,
        state: props.user.utility.state,
      },
      phoneBill: {
        file: props.user.phoneBill.file,
        state: props.user.phoneBill.state,
      },
      additionalDoc: {
        files: props.user.additionalDoc.additionalDoc,
        state: props.user.additionalDoc.state,
      },
      [key]: value,
    }

    
    setTimeout(() => {
      actions.updateRealUser(user)
        .then(res => {
          let {data} = res;
          if(!data.success) {
            swal("", data.errMessage, "error");
            return;
          }
          props.updateRealUser(data.user);
        })
        .catch(() => {
          // disableLoading();
          // setSubmitting(false);
          // setStatus(
          //   intl.formatMessage({
          //     id: "AUTH.VALIDATION.INVALID_LOGIN"
          //   })
          // );
        });
    }, 10);
  }

  const handleFileSelected = (acceptedFiles) => {
    setSelectedFileNames(acceptedFiles.map(file => file.name));
    setSelectedFiles(acceptedFiles.map(file => file));
  }

  const fileUpload = e => {
    e.preventDefault();
    //Determine user that will be update.
    let key = "";
    let value = {};
    switch(selectedDocumentIndex) {
      case 0:
        key = "driverLicense";
        value = { file: selectedFileNames[0], state: props.user.driverLicense.state };
        break;
      case 1:
        key = "social";
        value = { file: selectedFileNames[0], state: props.user.social.state };
        break;
      case 2:
        key = "passport";
        value = { file: selectedFileNames[0], state: props.user.passport.state };
        break;
      case 3:
        key = "tax";
        value = { files: selectedFileNames, state: props.user.tax.state };
        break;
      case 4:
        key = "statement";
        value = { files: selectedFileNames, state: props.user.statement.state };
        break;
      case 5:
        key = "utility";
        value = { file: selectedFileNames[0], state: props.user.utility.state };
        break;
      case 6:
        key = "phoneBill";
        value = { file: selectedFileNames[0], state: props.user.phoneBill.state };
        break;
      case 7:
        key = "additionalDoc";
        value = { files: selectedFileNames, state: props.user.additionalDoc.state };
        break;
      default:
        key = "driverLicense";
        value = { file: selectedFileNames[0], state: props.user.driverLicense.state };
        break;
    }

    let user = {
      _id: currentUserId,
      fullName: props.user.fullName,
      address: props.user.address,
      phoneNumber: props.user.phoneNumber,
      email: props.user.email,
      password: getPassword(props.user.password),
      companyName: props.user.companyName,
      fico: props.user.fico,
      bankName: props.user.bankName,
      accountNumber: props.user.accountNumber,
      routingNumber: props.user.routingNumber,
      zelle: props.user.zelle,
      amountMonth: props.user.amountMonth,
      managementFee: props.user.managementFee,
      referer: props.user.referer,
      notes: props.user.notes,
      driverLicense: {
        file: props.user.driverLicense.file,
        state: props.user.driverLicense.state,
      },
      social: {
        file: props.user.social.file,
        state: props.user.social.state,
      },
      passport: {
        file: props.user.passport.file,
        state: props.user.passport.state,
      },
      tax: {
        files: props.user.tax.files,
        state: props.user.tax.state,
      },
      statement: {
        files: props.user.statement.files,
        state: props.user.statement.state,
      },
      utility: {
        file: props.user.utility.file,
        state: props.user.utility.state,
      },
      phoneBill: {
        file: props.user.phoneBill.file,
        state: props.user.phoneBill.state,
      },
      additionalDoc: {
        files: props.user.additionalDoc.additionalDoc,
        state: props.user.additionalDoc.state,
      },
      [key]: value,
    }

    let formData = new FormData();
    for(let i = 0 ; i < selectedFiles.length; i ++)
      formData.append(selectedFiles[i].name, selectedFiles[i]);
    
    actions.fileUpload(formData)
      .then(res => {
        let {data} = res;
        if(!data.success) {
          let message = `While uploading files, unknown errors was occured!`
          swal("", message, "error");
          return;
        }

        actions.updateRealUser(user)
          .then(res => {
            let {data} = res;
            if(!data.success) {
              swal("", data.errMessage, "error");
              return;
            }
            props.updateRealUser(data.user);
            let message = `${selectedFiles.length} file(s) was uploaded successfully!`
            swal("", message, "success");
          })
      })
      .catch(() => {
      });
      setOpenFileUploadModal(false);
      setSelectedFileNames([]);
      setSelectedFiles([]);

  }

  // let input = document.document.documentElement.nodeName;
  // console.log(input)

  return (
    <>        
      <div className="row" style={{paddingTop: 40, paddingRight: 10, paddingBottom: 0, backgroundColor: "white"}}>
          
          <div className="col-xl-12">
            <span style={{marginLeft: 50, fontSize: 25, fontWeight: 500}}>Welcome Client!</span>
            <span className="pull-right" style={{fontSize: 25}}>Amount Earning Monthly: $ {amountMonth} </span>

          </div>

          <div className="col-xl-6 col-md-12" style={{marginTop: 40}}>

            <div className="col-md-12" style={{border: '1px rgb(216, 217, 223) solid', borderRadius: 10, padding: "10px 0 10px 10px"}} >
              <div className="col-md-12" style={{marginBottom: 10}}>
                <div className="row">
                  <div className="col-md-5 leftLabel">Full Name</div>
                  <div className="col-md-7" style={{fontSize: 16 }}>
                    {isFullNameEdit ?
                      <div onMouseLeave={()=>setIsShowFullNameEdit(false)}>
                        <input type="text" value={fullName} onChange={ (e) => setFullName(e.target.value) } maxLength={40} />
                        <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {setIsFullNameEdit(false); updateUser("fullName", fullName)}} />
                        <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsFullNameEdit(false); setFullName(beforeFullName)}} />
                      </div>
                      :
                      <div onMouseEnter={() => setIsShowFullNameEdit(true)} onMouseLeave={()=>setIsShowFullNameEdit(false)}>
                        <span>{fullName}</span>
                        <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsFullNameEdit(true); setBeforeFullName(fullName)}} />
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="col-md-12" style={{marginBottom: 10}}>
                <div className="row">
                  <div className="col-md-5 leftLabel">Mailing Address</div>
                  <div className="col-md-7" style={{fontSize: 16 }}>
                    {isAddressEdit ?
                      <div onMouseLeave={()=>setIsShowAddressEdit(false)}>
                        <input type="text" value={address} onChange={ (e) => setAddress(e.target.value) }/>
                        <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {setIsAddressEdit(false); updateUser("address", address)}} />
                        <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsAddressEdit(false); setAddress(beforeAddress)}} />
                      </div>
                      :
                      <div onMouseEnter={() => setIsShowAddressEdit(true)} onMouseLeave={()=>setIsShowAddressEdit(false)}>
                        <span>{address}</span>
                        <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsAddressEdit(true); setBeforeAddress(address)}} />
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="col-md-12" style={{marginBottom: 10}}>
                <div className="row">
                  <div className="col-md-5 leftLabel">Phone Number</div>
                  <div className="col-md-7" style={{fontSize: 16 }}>
                    {isPhoneNumberEdit ?
                      <div onMouseLeave={()=>setIsShowPhoneNumberEdit(false)}>
                        <input type="text" value={phoneNumber} onChange={ (e) => setPhoneNumber(e.target.value) }/>
                        <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {setIsPhoneNumberEdit(false); updateUser("phoneNumber", phoneNumber)}} />
                        <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsPhoneNumberEdit(false); setPhoneNumber(beforePhoneNumber)}} />
                      </div>
                      :
                      <div onMouseEnter={() => setIsShowPhoneNumberEdit(true)} onMouseLeave={()=>setIsShowPhoneNumberEdit(false)}>
                        <span>{phoneNumber}</span>
                        <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsPhoneNumberEdit(true); setBeforePhoneNumber(phoneNumber)}} />
                      </div>
                    }
                  </div>
                </div>
              </div>
              
              <div className="col-md-12" style={{marginBottom: 10}}>
                <div className="row">
                  <div className="col-md-5 leftLabel">Email Address</div>
                  <div className="col-md-7" style={{fontSize: 16 }}>
                    {isEmailEdit ?
                      <div onMouseLeave={()=>setIsShowEmailEdit(false)}>
                        <input type="text" value={email} onChange={ (e) => setEmail(e.target.value) }/>
                        <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {setIsEmailEdit(false); updateUser("email", email)}} />
                        <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsEmailEdit(false); setEmail(beforeEmail)}} />
                      </div>
                      :
                      <div onMouseEnter={() => setIsShowEmailEdit(true)} onMouseLeave={()=>setIsShowEmailEdit(false)}>
                        <span>{email}</span>
                        <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsEmailEdit(true); setBeforeEmail(email)}} />
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="col-md-12" style={{marginBottom: 10}}>
                <div className="row">
                  <div className="col-md-5 leftLabel">Current FICO Score (estimated)</div>
                  <div className="col-md-7" style={{fontSize: 16 }}>
                    {isFICOEdit ?
                      <div onMouseLeave={()=>setIsShowFICOEdit(false)}>
                        <input type="number" value={fico} onChange={ (e) => handleFICOChange(e) } min="100" max="999" />
                        <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {setIsFICOEdit(false); updateUser("fico", fico)}} />
                        <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsFICOEdit(false); setFICO(beforeFico)}} />
                      </div>
                      :
                      <div onMouseEnter={() => setIsShowFICOEdit(true)} onMouseLeave={()=>setIsShowFICOEdit(false)}>
                        <span>{fico}</span>
                        <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsFICOEdit(true); setBeforeFICO(fico)}} />
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-sm-12" style={{marginTop: 20, border: '1px rgb(216, 217, 223) solid', borderRadius: 10, padding: 10}}>
              <div className="col-md-12" style={{marginBottom: 10}}>
                <div className="row">
                  <div className="col-md-5 leftLabel">Bank Name</div>
                  <div className="col-md-7 rightValue">
                    {isBankNameEdit ?
                      <div onMouseLeave={()=>setIsShowBankNameEdit(false)}>
                        <input type="text" value={bankName} onChange={ (e) => setBankName(e.target.value) } maxLength={40} />
                        <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {setIsBankNameEdit(false); updateUser("bankName", bankName)}} />
                        <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsBankNameEdit(false); setBankName(beforeBankName)}} />
                      </div>
                      :
                      <div onMouseEnter={() => setIsShowBankNameEdit(true)} onMouseLeave={()=>setIsShowBankNameEdit(false)}>
                        <span>{bankName}</span>
                        <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsBankNameEdit(true); setBeforeBankName(bankName)}} />
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="col-md-12" style={{marginBottom: 10}}>
                <div className="row">
                  <div className="col-md-5 leftLabel">Account Number</div>
                  <div className="col-md-7 accountNumber">
                    {isAccountNumberEdit ?
                      <div onMouseLeave={()=>setIsShowAccountNumberEdit(false)}>
                        <input type="text" value={accountNumber} onChange={ (e) => setAccountNumber(e.target.value) } maxLength={40} />
                        <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {setIsAccountNumberEdit(false); updateUser("accountNumber", accountNumber)}} />
                        <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsAccountNumberEdit(false); setAccountNumber(beforeAccountNumber)}} />
                      </div>
                      :
                      <div onMouseEnter={() => setIsShowAccountNumberEdit(true)} onMouseLeave={()=>setIsShowAccountNumberEdit(false)}>
                        <span>{accountNumber}</span>
                        <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsAccountNumberEdit(true); setBeforeAccountNumber(accountNumber)}} />
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="col-md-12" style={{marginBottom: 10}}>
                <div className="row">
                  <div className="col-md-5 leftLabel">Routing Number</div>
                  <div className="col-md-7 accountNumber">
                    {isRoutingNumberEdit ?
                      <div onMouseLeave={()=>setIsShowRoutingNumberEdit(false)}>
                        <input type="text" value={routingNumber} onChange={ (e) => setRoutingNumber(e.target.value) } maxLength={40} />
                        <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {setIsRoutingNumberEdit(false); updateUser("routingNumber", routingNumber)}} />
                        <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsRoutingNumberEdit(false); setRoutingNumber(beforeRoutingNumber)}} />
                      </div>
                      :
                      <div onMouseEnter={() => setIsShowRoutingNumberEdit(true)} onMouseLeave={()=>setIsShowRoutingNumberEdit(false)}>
                        <span>{routingNumber}</span>
                        <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsRoutingNumberEdit(true); setBeforeRoutingNumber(routingNumber)}} />
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="col-md-12" style={{marginBottom: 10}}>
                <div className="row">
                  <div className="col-md-5 leftLabel">Zelle / Quickpay Contact</div>
                  <div className="col-md-7 rightValue">
                    {isZelleEdit ?
                      <div onMouseLeave={()=>setIsShowZelleEdit(false)}>
                        <input type="text" value={zelle} onChange={ (e) => setZelle(e.target.value) } maxLength={40} />
                        <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {setIsZelleEdit(false); updateUser("zelle", zelle)}} />
                        <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsZelleEdit(false); setZelle(beforeZelle)}} />
                      </div>
                      :
                      <div onMouseEnter={() => setIsShowZelleEdit(true)} onMouseLeave={()=>setIsShowZelleEdit(false)}>
                        {zelle === "" ? (
                          <span style={{color: "#515559"}}>Enter phone or email</span>)
                        : 
                          <span>{zelle}</span>}
                        <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsZelleEdit(true); setBeforeZelle(zelle)}} />
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-sm-12 row" style={{marginTop: 80}}>
              {props.banner !== undefined 
                ?
                  <a href={`${props.banner.url}`} className="bannerImage" target="_black">
                    <img
                      className="bannerImage"
                      alt="banner image"
                      src={`${Config.bucket_url}/banner/${props.banner.image}`}
                    />
                  </a>
                :
                  null
              }
            </div>

          </div>

          <div className="col-xl-6 col-md-12" style={{marginTop: 40, padding: "20px 0 10px 10px", border: '1px rgb(216, 217, 223) solid', borderRadius: 10}}>

            <h4 style={{margin: "0px 10px 30px 10px", textAlign: "center", color: "rgb(156, 157, 163)"}}>Please submit all documents listed below, if for some reason you do not have this document, please click Not Available.</h4>
            {documentTypes.map((oneDocumentTypes, index) => (
              <div className="col-md-12" style={{marginBottom: 20}} key={index}>
                <div className="row">
                  <div className="col-md-6 leftLabel">{oneDocumentTypes}</div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-xs-4" style={{padding: 3}}>
                        <button className="attachFileBtn" onClick={() => {setOpenFileUploadModal(true); setSelectedDocumentIndex(index)}} data-toggle="modal" data-original-title="test" data-target="#exampleModal" disabled={listDocumentStatus[index] === 3 ? true: false}>
                          {listIsMultipleUpload[index] ?
                            "Attach Files"
                            :
                            <span>Attach File&nbsp;&nbsp;</span>
                          }
                        </button>
                      </div>
                      <div className="col-xs-4" style={{padding: 3}}>
                        <Button className="notAvailableBtn" onClick={() => onNotAvailableBtnClick(index)} active={listDocumentStatus[index] === 3 ? true: false}>Not Available</Button>
                      </div>
                      <div className="col-xs-4" style={{padding: "8px 3px"}}>
                        <span className="documentStatus" style={{border: '1px ' + statusBackgroundColors[listDocumentStatus[index]] + ' solid', backgroundColor: statusBackgroundColors[listDocumentStatus[index]], color: statusColors[listDocumentStatus[index]] }}>
                          {documentStates[listDocumentStatus[index]]}
                        </span>
                        { 
                        // <span style={{border: '1px #646c9a solid', marginTop: "-5px", padding: "7px", textAlign: "center", display: "block", width: 110, verticalAlign: "sub", borderRadius: 15, backgroundColor: uploadStates[0] === 0 ? "rgb(248, 239, 72)": (uploadStates[0] === 1? "rgb(94, 171, 234)": "rgb(111, 216, 80)" )}}>
                        //   {documentStates[uploadStates[0]]}
                        // </span>
                        // <span style={{verticalAlign: 'middle', marginRight: 7}}>
                        //   { uploadStates[0] === 0 ? <i className='far fa-meh-blank' style={{fontSize:24, backgroundColor: 'yellow'}}/>
                        //     : ( uploadStates[0] === 1? 
                        //       <i className='far fa-frown-open' style={{fontSize:24, backgroundColor: 'yellow'}}/>
                        //       : <i className='far fa-grin-stars' style={{fontSize:24, backgroundColor: 'yellow'}}/> )}
                        // </span>
                        // <span>{documentStates[uploadStates[0]]}</span> 
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Modal open={openFileUploadModal} onClose={() => {setOpenFileUploadModal(false)}}  classNames={{ modal: 'FileUploadModal' }}>
              <div className="modal-body">
                <Dropzone onDrop={handleFileSelected} multiple={listIsMultipleUpload[selectedDocumentIndex]}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <span>{"📂"}</span>
                      {listIsMultipleUpload[selectedDocumentIndex] ?
                        <p>Drag and Drop files, or click to select files</p>
                        :
                        <p>Drag and Drop file, or click to select file</p>
                      }
                    </div>
                  )}
                </Dropzone>
                {selectedFileNames.length > 0 ? (
                  <div style={{marginTop: 20}}>
                    <strong>File(s):</strong>
                    <ul>
                      {selectedFileNames.map(fileName => (
                        <li key={fileName}>{fileName}</li>
                      ))}
                    </ul>
                    <button type="button" className="btn btn-success pull-right" onClick={fileUpload}>Submit</button>
                  </div>
                ) : null }
              </div>
            </Modal>
          </div>
        </div>
 
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  banner: state.pageLink.banner
})

export default injectIntl(
  connect(
    mapStateToProps,
    authDuck.actions
  )(HomeTab)
);