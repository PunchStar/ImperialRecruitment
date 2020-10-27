import React, {useState} from "react";
import { connect } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider,SizePerPageDropdownStandalone, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Formik } from "formik";
import { FormattedMessage, injectIntl } from "react-intl";
import swal from 'sweetalert';
import { Button } from "react-bootstrap";
import * as actions from '../../../../app/actions';
import * as userDuck from '../../../../app/store/ducks/user.duck';
import * as activityDuck from '../../../../app/store/ducks/activity.duck';

import crypto from 'crypto';
import { Config } from '../../../../app/config/config';

const { SearchBar } = Search;

function getPasswordFromHash(cell, row, rowIndex, formatExtraData) {
  return <div>{getPassword(cell)}</div>;
}

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

function AllCompanies(props) {

  let [openAddModal, setOpenAddModal] = useState(false);
  let [openViewModal, setOpenViewModal] = useState(false);
  let [currentUserId, setCurrentUserId] = useState("");
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
  let [beforeManagementFee, setBeforeManagementFee] = useState(0);
  let [beforeReferer, setBeforeReferer] = useState("");
  let [beforeNotes, setBeforeNotes] = useState("");
  let [beforeCompanyName, setBeforeCompanyName] = useState("");
  
  let [fullName, setFullName] = useState("");
  let [isFullNameEdit, setIsFullNameEdit] = useState(false);
  let [address, setAddress] = useState("");
  let [isAddressEdit, setIsAddressEdit] = useState(false);
  let [phoneNumber, setPhoneNumber] = useState("");
  let [isPhoneNumberEdit, setIsPhoneNumberEdit] = useState(false);
  let [email, setEmail] = useState("");
  let [isEmailEdit, setIsEmailEdit] = useState(false);
  let [password, setPassword] = useState("");
  let [isPasswordEdit, setIsPasswordEdit] = useState(false);
  let [fico, setFICO] = useState(0);
  let [isFICOEdit, setIsFICOEdit] = useState(false);
  let [bankName, setBankName] = useState("");
  let [isBankNameEdit, setIsBankNameEdit] = useState(false);
  let [accountNumber, setAccountNumber] = useState("");
  let [isAccountNumberEdit, setIsAccountNumberEdit] = useState(false);
  let [routingNumber, setRoutingNumber] = useState("");
  let [isRoutingNumberEdit, setIsRoutingNumberEdit] = useState(false);
  let [zelle, setZelle] = useState("");
  let [isZelleEdit, setIsZelleEdit] = useState(false);
  let [listDocumentStatus, setListDocumentStatus] = useState([]);
  let [listDocumentFileName, setListDocumentFileName] = useState([[""], [""], [""], [""], [""], [""], [""], [""]]);
  let [amountMonth, setAmountMonth] = useState(0);
  let [isAmountMonthEdit, setIsAmountMonthEdit] = useState(false);
  let [managementFee, setManagementFee] = useState(0);
  let [isManagementFeeEdit, setIsManagementFeeEdit] = useState(false);
  let [referer, setReferer] = useState("");
  let [isRefererEdit, setIsRefererEdit] = useState(false);
  let [notes, setNotes] = useState("");
  let [isNotesEdit, setIsNotesEdit] = useState(false);
  let [companyName, setCompanyName] = useState("");
  let [isCompanyNameEdit, setIsCompanyNameEdit] = useState(false);

  let [isShowFullNameEdit, setIsShowFullNameEdit] = useState(true);
  let [isShowAddressEdit, setIsShowAddressEdit] = useState(true);
  let [isShowPhoneNumberEdit, setIsShowPhoneNumberEdit] = useState(true);
  let [isShowEmailEdit, setIsShowEmailEdit] = useState(true);
  let [isShowFICOEdit, setIsShowFICOEdit] = useState(true);
  let [isShowBankNameEdit, setIsShowBankNameEdit] = useState(true);
  let [isShowAccountNumberEdit, setIsShowAccountNumberEdit] = useState(true);
  let [isShowRoutingNumberEdit, setIsShowRoutingNumberEdit] = useState(true);
  let [isShowZelleEdit, setIsShowZelleEdit] = useState(true);
  let [isShowPasswordEdit, setIsShowPasswordEdit] = useState(true);
  let [isShowAmountMonthEdit, setIsShowAmountMonthEdit] = useState(true);
  let [isShowManagementFeeEdit, setIsShowManagementFeeEdit] = useState(true);
  let [isShowRefererEdit, setIsShowRefererEdit] = useState(true);
  let [isShowNotesEdit, setIsShowNotesEdit] = useState(true);
  let [isShowCompanyNameEdit, setIsShowCompanyNameEdit] = useState(true);

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

   const userList = props.users;

   const columns = [{
       dataField: 'fullName',
       text: 'Full Name',
       sort: true,
       headerAttrs: { width: 230 },
     }, {
       dataField: 'address',
       text: 'Mailing Address',
       sort: true,
       headerAttrs: { width: 370 },
     }, {
       dataField: 'phoneNumber',
       text: 'Phone Number',
       sort: true,
       headerAttrs: { width: 300 },
     }, {
       dataField: 'email',
       text: 'Email',
       sort: true,
       headerAttrs: { width: 370 },
     }, {
       dataField: 'password',
       text: 'Password',
       formatter: getPasswordFromHash,
       sort: true,
       headerAttrs: { width: 210 },
       searchable: false,
     }, { 
       dataField: "action", 
       text: "Action",
       sort: false,
       formatter: actionFormatter,
       headerAttrs: { width: 110 },
       // attrs: { width: 50, class: "EditRow" } 
     }];
 
   const options = {
       custom: true,
       totalSize: userList.length,
   };
  
  //Methods
  const indication = () => {
    return (
      <div>
        Table is empty.
      </div>
    )
  }

  const renderAlert = () => {
    let error = "";
    // error = this.props.unknown_error; 
    // if (error !== "") {
        return (
            <div className="alert alert-warning">
                <strong>Oops! </strong>{error}
            </div>
        )
    // }
  }  

  const closeAddModal = () => {
    setOpenAddModal(false);
    //Initialize parameters
    setFullName("");
    setAddress("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
  }

  const addUser = () => {
    if(fullName === "" || address === "" || phoneNumber === "" || email === "" || password === "") {
      swal("", "Please confirm all fields.", "error");
      return;
    }
    let newUser = {
      fullName: fullName,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      password: password
    }
    setTimeout(() => {
      actions.addUser(newUser)
        .then(res => {
          let {data} = res;
          if(!data.success) {
            swal("", data.errMessage, "error");
            return;
          }
          props.addUser(data.users);
          props.allActivities(data.activities);
          setOpenAddModal(false);

          //Initialize parameters
          setFullName("");
          setAddress("");
          setPhoneNumber("");
          setEmail("");
          setPassword("");

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
    }, 1);
  }

  const handleFICOChange = (event) => {
    let { value, min, max } = event.target;
    // value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setFICO(value);
    // setIsFICOEdit(true)
  }
 
  const handleManagementFeeChange = (event) => {
    let { value, min, max } = event.target;
    setManagementFee(value);
  }

  const handleAmountMonthChange = (event) => {
    let { value, min, max } = event.target;
    setAmountMonth(value);
  }

  function actionFormatter(cell, row, rowIndex, formatExtraData) { 
    return ( 
      <>
        <div 
            style={{ textAlign: "center",
                cursor: "pointer",
              lineHeight: "normal" }}
        >
          <i className="fas fa-edit AllCompanyButton"
            onClick={() => {
              //make document state's list.
              let tempListDocumentStatus = [];
              tempListDocumentStatus.push(row.driverLicense.state)
              tempListDocumentStatus.push(row.social.state)
              tempListDocumentStatus.push(row.passport.state)
              tempListDocumentStatus.push(row.tax.state)
              tempListDocumentStatus.push(row.statement.state)
              tempListDocumentStatus.push(row.utility.state)
              tempListDocumentStatus.push(row.phoneBill.state)
              tempListDocumentStatus.push(row.additionalDoc.state)

              //make document file name's list(2 - dimensional array)
              let tempDocumentFileName = [];
              tempDocumentFileName.push([row.driverLicense.file])
              tempDocumentFileName.push([row.social.file])
              tempDocumentFileName.push([row.passport.file])
              tempDocumentFileName.push([row.tax.files])
              tempDocumentFileName.push([row.statement.files])
              tempDocumentFileName.push([row.utility.file])
              tempDocumentFileName.push([row.phoneBill.file])
              tempDocumentFileName.push([row.additionalDoc.files])

              setListDocumentStatus(tempListDocumentStatus);
              setListDocumentFileName(tempDocumentFileName);
              setFullName(row.fullName);
              setAddress(row.address);
              setPhoneNumber(row.phoneNumber);
              setEmail(row.email);
              setPassword(getPassword(row.password));
              setFICO(row.fico);
              setBankName(row.bankName);
              setAccountNumber(row.accountNumber);
              setRoutingNumber(row.routingNumber);
              setZelle(row.zelle);
              setAmountMonth(row.amountMonth);
              setManagementFee(row.managementFee);
              setReferer(row.referer);
              setNotes(row.notes);
              setCompanyName(row.companyName);
              setCurrentUserId(row._id);

              setOpenViewModal(true);
            }}
          />
          <i className="fas fa-trash AllCompanyButton" 
            onClick={() => {            
              setTimeout(() => {
                actions.deleteUser(row._id)
                  .then(res => {
                    let {data} = res;
                    if(!data.success) {
                      swal("", data.errMessage, "error");
                      return;
                    }
                    props.deleteUser(data.users);
                    props.allActivities(data.activities);
                    setOpenAddModal(false);
                  })
                  .catch(() => {
                  });
              }, 1);
          
            }}
          />
        </div> 
      </>
    );
  }  
  
  
  const closeViewModal = () => {
    setOpenViewModal(false);

    //Initialize parameters
    setFullName("");
    setAddress("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setFICO(0);
    setBankName("");
    setAccountNumber("");
    setRoutingNumber("");
    setZelle("");
    setAmountMonth(0);
    setManagementFee(0);
    setReferer("");
    setNotes("");
    setCompanyName("");
    setListDocumentStatus([]);
    setListDocumentFileName([[""], [""], [""], [""], [""], [""], [""], [""]]);

    setIsFullNameEdit(false);
    setIsAddressEdit(false);
    setIsPhoneNumberEdit(false);
    setIsEmailEdit(false);
    setIsPasswordEdit(false);
    setIsFICOEdit(false);
    setIsBankNameEdit(false);
    setIsAccountNumberEdit(false);
    setIsRoutingNumberEdit(false);
    setIsZelleEdit(false);
    setIsAmountMonthEdit(false);
    setIsManagementFeeEdit(false);
    setIsRefererEdit(false);
    setIsNotesEdit(false);
    setIsCompanyNameEdit(false);
  }

  const updateUser = () => {
    if(fullName === "" || address === "" || phoneNumber === "" || email === "" || password === "") {
      swal("", "Please confirm all fields.", "error");
      return;
    }

    if(isFullNameEdit || isAddressEdit || isPhoneNumberEdit || isEmailEdit || isPasswordEdit || isFICOEdit|| isBankNameEdit || isAccountNumberEdit || isRoutingNumberEdit || isZelleEdit || isAmountMonthEdit || isManagementFeeEdit || isRefererEdit || isNotesEdit || isCompanyNameEdit) {
      swal("", "Please check all changes.", "error");
      return;
    }

    let user = {
      _id: currentUserId,
      fullName: fullName,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      fico: fico,
      bankName: bankName,
      accountNumber: accountNumber,
      routingNumber: routingNumber,
      zelle: zelle,
      amountMonth: amountMonth,
      managementFee: managementFee,
      referer: referer,
      notes: notes,
      companyName: companyName,
      driverLicense: {
        file: listDocumentFileName[0][0],
        state: listDocumentStatus[0],
      },
      social: {
        file: listDocumentFileName[1][0],
        state: listDocumentStatus[1],
      },
      passport: {
        file: listDocumentFileName[2][0],
        state: listDocumentStatus[2],
      },
      tax: {
        files: listDocumentFileName[3],
        state: listDocumentStatus[3],
      },
      statement: {
        files: listDocumentFileName[4],
        state: listDocumentStatus[4],
      },
      utility: {
        file: listDocumentFileName[5][0],
        state: listDocumentStatus[5],
      },
      phoneBill: {
        file: listDocumentFileName[6][0],
        state: listDocumentStatus[6],
      },
      additionalDoc: {
        files: listDocumentFileName[7],
        state: listDocumentStatus[7],
      },
    }
    setTimeout(() => {
      actions.updateUser(user)
        .then(res => {
          let {data} = res;
          if(!data.success) {
            swal("", data.errMessage, "error");
            return;
          }
          props.updateUser(data.users);
          props.allActivities(data.activities);
          setOpenAddModal(false);
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
    }, 1);

    //Initialize parameters
    setFullName("");
    setAddress("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setFICO(0);
    setBankName("");
    setAccountNumber("");
    setRoutingNumber("");
    setZelle("");
    setAmountMonth(0);
    setManagementFee(0);
    setReferer("");
    setNotes("");
    setCompanyName("");
    setListDocumentStatus([]);
    setListDocumentFileName([[""], [""], [""], [""], [""], [""], [""], [""]]);
  
    setIsFullNameEdit(false);
    setIsAddressEdit(false);
    setIsPhoneNumberEdit(false);
    setIsEmailEdit(false);
    setIsPasswordEdit(false);
    setIsFICOEdit(false);
    setIsBankNameEdit(false);
    setIsAccountNumberEdit(false);
    setIsRoutingNumberEdit(false);
    setIsZelleEdit(false);
    setIsAmountMonthEdit(false);
    setIsManagementFeeEdit(false);
    setIsRefererEdit(false);
    setIsNotesEdit(false);
    setIsCompanyNameEdit(false);

    setOpenViewModal(false);
  }

  const handleDocumentStatusChange = (e, index) => {
    let newValue = documentStates.indexOf(e.target.value);
    if(newValue < 1) {
      return;
    }
    let tempListDocumentStatus = listDocumentStatus;
    tempListDocumentStatus.splice(index, 1, newValue);
    setListDocumentStatus(tempListDocumentStatus);
  }
  
  return (
    <div className="row" style={{paddingTop: 20}}>
      <div className="col-sm-12">
        {/* <h3>All Companies</h3> */}
        <Button variant="outline-dark" className="AddNewCompanyBtn pull-right" onClick={() => setOpenAddModal(true)} data-toggle="modal" data-original-title="test" data-target="#exampleModal"><i className="la la-plus"></i> New Company</Button>
      </div>

      <div className="col-sm-12" style={{marginTop: 20}}>
        <PaginationProvider
          pagination={ paginationFactory(options) }
        >
          {
            ({
              paginationProps,
              paginationTableProps
            }) => (
              <div>

                <ToolkitProvider
                  keyField="id"
                  data={ userList }
                  columns={ columns }
                  search
                >
                  {
                    props => (
                      <div style={{marginBottom: 30}}>
                        <div className="row" style={{marginBottom: 10}}>
                          <div className="col-sm-12">
                            <SizePerPageDropdownStandalone {...paginationProps} />
                            <div className="pull-right">
                              <span style={{marginRight: 5}}>Search&nbsp;:</span>
                              <SearchBar { ...props.searchProps } />
                            </div>
                          </div>
                        </div>
                        <BootstrapTable
                          headerWrapperClasses="tableHeader"
                          bodyClasses="tableBody"
                          bordered={false}
                          hover
                          noDataIndication={indication}
                          { ...props.baseProps }
                          { ...paginationTableProps }
                          // rowClasses="custom-row-class" 
                        />
                      </div>
                    )
                  }
                </ToolkitProvider>
                <PaginationTotalStandalone
                  { ...paginationProps }
                />
                <PaginationListStandalone
                  { ...paginationProps }
                />
              </div>
            )
          }
        </PaginationProvider>  
      </div>
      <Modal open={openAddModal} onClose={closeAddModal} classNames={{ modal: 'addModal' }} >
        <div className="modal-header">
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add Company</h5>
        </div>
        <div className="modal-body">
          <Formik
            initialValues={{
              email: "admin@demo.com",
              password: "demo"
            }}

            onSubmit={(values, { setStatus, setSubmitting }) => {
              addUser();
            }}
          >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form>
                  {renderAlert}

                  <div className="row" style={{paddingBottom: 0, backgroundColor: "white"}}>
                    
                    <div className="col-xl-12 col-md-12">

                      <div className="form-group row">
                          <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Full Name :</span></label>
                          <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={fullName} onChange={ (e) => setFullName(e.target.value) } maxLength={40} />
                      </div>

                      <div className="form-group row">
                          <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Mailing Address :</span></label>
                          <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={address} onChange={ (e) => setAddress(e.target.value) }/>
                      </div>

                      <div className="form-group row">
                          <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Phone Number :</span></label>
                          <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={phoneNumber} onChange={ (e) => setPhoneNumber(e.target.value) }/>
                      </div>

                      <div className="form-group row">
                          <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Email Address :</span></label>
                          <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={email} onChange={ (e) => setEmail(e.target.value) }/>
                      </div>

                      <div className="form-group row">
                          <label htmlFor="recipient-name" className="col-form-label col-md-3" ><span style={{fontSize: 16}}>Password :</span></label>
                          <input type="text" className="form-control col-md-9" style={{fontSize: 16}} value={password} onChange={ (e) => setPassword(e.target.value) } maxLength={40} />
                      </div>
                      
                      <div className="form-group row">
                        <div className="col-md-12">
                          <button className="btn btn-secondary pull-right" onClick={closeAddModal}>Cancel</button>
                          <button className="btn btn-success pull-right" style={{marginRight: 10}} onClick={handleSubmit}>Add Company</button>
                        </div>
                      </div>
                      
                    </div>
                  </div>

              </form>
            )}
          </Formik>
        </div>
      </Modal>

      <Modal open={openViewModal} onClose={closeViewModal} classNames={{ modal: 'viewModal' }} >
        <div className="modal-header">
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">View(Edit) Company</h5>
        </div>
        <div className="modal-body">
            <form>
                {renderAlert}
                <div className="row" style={{paddingRight: 10, paddingBottom: 0, backgroundColor: "white"}}>

                  <div className="col-xl-6 col-md-12" style={{marginTop: 40}}>

                    <div className="col-md-12" style={{border: '1px rgb(216, 217, 223) solid', borderRadius: 10, padding: "10px 0 10px 10px"}} >

                      <div className="col-md-12" style={{marginBottom: 10}}>
                        <div className="row">
                          <div className="col-md-5 leftLabel">Company Name</div>
                          <div className="col-md-7" style={{fontSize: 16 }}>
                            {isCompanyNameEdit ?
                              <div onMouseLeave={()=>setIsShowCompanyNameEdit(false)}>
                                <input type="text" value={companyName} onChange={ (e) => setCompanyName(e.target.value) } maxLength={40} />
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsCompanyNameEdit(false)} />
                                <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsCompanyNameEdit(false); setCompanyName(beforeCompanyName)}} />
                              </div>
                              :
                              <div onMouseEnter={() => setIsShowCompanyNameEdit(true)} onMouseLeave={()=>setIsShowCompanyNameEdit(false)}>
                                <span>{companyName}</span>
                                <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsCompanyNameEdit(true); setBeforeCompanyName(companyName)}} />
                              </div>
                            }
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12" style={{marginBottom: 10}}>
                        <div className="row">
                          <div className="col-md-5 leftLabel">Full Name</div>
                          <div className="col-md-7" style={{fontSize: 16 }}>
                            {isFullNameEdit ?
                              <div onMouseLeave={()=>setIsShowFullNameEdit(false)}>
                                <input type="text" value={fullName} onChange={ (e) => setFullName(e.target.value) } maxLength={40} />
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsFullNameEdit(false)} />
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
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsAddressEdit(false)} />
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
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsPhoneNumberEdit(false)} />
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
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsEmailEdit(false)} />
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
                          <div className="col-md-5 leftLabel">Password</div>
                          <div className="col-md-7" style={{fontSize: 16 }}>
                            {isPasswordEdit ?
                              <div onMouseLeave={()=>setIsShowPasswordEdit(false)}>
                                <input type="text" value={password} onChange={ (e) => setPassword(e.target.value) } maxLength={40} />
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsPasswordEdit(false)} />
                                <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsPasswordEdit(false); setPassword(password)}} />
                              </div>
                              :
                              <div onMouseEnter={() => setIsShowPasswordEdit(true)} onMouseLeave={()=>setIsShowPasswordEdit(false)}>
                                <span>{password}</span>
                                <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsPasswordEdit(true); setBeforePassword(password)}} />
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
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsBankNameEdit(false)} />
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
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsAccountNumberEdit(false)} />
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
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsRoutingNumberEdit(false)} />
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
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsZelleEdit(false)} />
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

                      <div className="col-md-12" style={{marginBottom: 10}}>
                        <div className="row">
                          <div className="col-md-5 leftLabel">Current FICO Score (estimated)</div>
                          <div className="col-md-7" style={{fontSize: 16 }}>
                            {isFICOEdit ?
                              <div onMouseLeave={()=>setIsShowFICOEdit(false)}>
                                <input type="number" value={fico} onChange={ (e) => handleFICOChange(e) } min="100" max="999" />
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsFICOEdit(false)} />
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

                      <div className="col-md-12" style={{marginBottom: 10}}>
                        <div className="row">
                          <div className="col-md-5 leftLabel">Management Fee</div>
                          <div className="col-md-7" style={{fontSize: 16 }}>
                            {isManagementFeeEdit ?
                              <div onMouseLeave={()=>setIsShowManagementFeeEdit(false)}>
                                <input type="number" value={managementFee} onChange={ (e) => handleManagementFeeChange(e) } min="0" max="99999" />
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsManagementFeeEdit(false)} />
                                <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsManagementFeeEdit(false); setManagementFee(beforeManagementFee)}} />
                              </div>
                              :
                              <div onMouseEnter={() => setIsShowManagementFeeEdit(true)} onMouseLeave={()=>setIsShowManagementFeeEdit(false)}>
                                <span>{managementFee}</span>
                                <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsManagementFeeEdit(true); setBeforeManagementFee(managementFee)}} />
                              </div>
                            }
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12" style={{marginBottom: 10}}>
                        <div className="row">
                          <div className="col-md-5 leftLabel">Amount Month</div>
                          <div className="col-md-7" style={{fontSize: 16 }}>
                            {isAmountMonthEdit ?
                              <div onMouseLeave={()=>setIsShowAmountMonthEdit(false)}>
                                <input type="number" value={amountMonth} onChange={ (e) => handleAmountMonthChange(e) } min="0" max="99999" />
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsAmountMonthEdit(false)} />
                                <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsAmountMonthEdit(false); setAmountMonth(beforeAmountMonth)}} />
                              </div>
                              :
                              <div onMouseEnter={() => setIsShowAmountMonthEdit(true)} onMouseLeave={()=>setIsShowAmountMonthEdit(false)}>
                                <span>{amountMonth}</span>
                                <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsAmountMonthEdit(true); setBeforeAmountMonth(amountMonth)}} />
                              </div>
                            }
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12" style={{marginBottom: 10}}>
                        <div className="row">
                          <div className="col-md-5 leftLabel">Referer</div>
                          <div className="col-md-7" style={{fontSize: 16 }}>
                            {isRefererEdit ?
                              <div onMouseLeave={()=>setIsShowRefererEdit(false)}>
                                <input type="text" value={referer} onChange={ (e) => setReferer(e.target.value) }/>
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsRefererEdit(false)} />
                                <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsRefererEdit(false); setReferer(beforeReferer)}} />
                              </div>
                              :
                              <div onMouseEnter={() => setIsShowRefererEdit(true)} onMouseLeave={()=>setIsShowRefererEdit(false)}>
                                <span>{referer}</span>
                                <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsRefererEdit(true); setBeforeReferer(referer)}} />
                              </div>
                            }
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12" style={{marginBottom: 10}}>
                        <div className="row">
                          <div className="col-md-5 leftLabel">Notes</div>
                          <div className="col-md-7" style={{fontSize: 16 }}>
                            {isNotesEdit ?
                              <div onMouseLeave={()=>setIsShowNotesEdit(false)}>
                                <textarea rows={3} value={notes} onChange={ (e) => setNotes(e.target.value) }/>
                                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => setIsNotesEdit(false)} />
                                <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {setIsNotesEdit(false); setNotes(beforeNotes)}} />
                              </div>
                              :
                              <div onMouseEnter={() => setIsShowNotesEdit(true)} onMouseLeave={()=>setIsShowNotesEdit(false)}>
                                <span>{notes}</span>
                                <i className="fa fa-edit" style={{fontSize: 16, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }} onClick={() => {setIsNotesEdit(true); setBeforeNotes(notes)}} />
                              </div>
                            }
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                  <div className="col-xl-6 col-md-12" style={{marginTop: 40, padding: "20px 0 10px 10px", border: '1px rgb(216, 217, 223) solid', borderRadius: 10}}>

                    {documentTypes.map((oneDocumentStatus, index) => (
                      <div className="col-md-12" style={{marginBottom: 20}} key={index}>
                        <div className="row">
                          <div className="col-md-6 leftLabel">{oneDocumentStatus}</div>
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-xs-6 colDocumentName" style={{padding: 3}}>
                                {listDocumentFileName.length > 0 ?
                                  listDocumentFileName[index].map(file => {
                                    if(typeof(file) === 'string') {
                                      return (
                                        <a href={`${Config.bucket_url}/${file}`} target="_blank">
                                          {file.length > 14 ? file.slice(0, 10) + "..." : file } 
                                        </a>
                                    )} else {
                                      return (
                                        file.map( (item, index) => {
                                          return (
                                            <a href={`${Config.bucket_url}/${item}`} target="_blank" key={index}>
                                              {item.length > 14 ? item.slice(0, 10) + "..." : item } 
                                              <br />
                                            </a>
                                          )
                                        })
                                      )}
                                  }) :
                                  <></>
                                }
                              </div>
                              <div className="col-xs-6">
                                {/* <span className="documentStatus" style={{border: '1px ' + statusBackgroundColors[listDocumentStatus[index]] + ' solid', backgroundColor: statusBackgroundColors[listDocumentStatus[index]], color: statusColors[listDocumentStatus[index]] }}>
                                  {documentStates[listDocumentStatus[index]]}
                                </span> */}
                                <select className="form-control digits" name="brandSelect" style={{marginRight: 2, fontSize: 15}} defaultValue={documentStates[listDocumentStatus[index]]} onChange={ (e) => handleDocumentStatusChange(e,index) }>
                                    {documentStates.map((oneValue, num) => 
                                        <option key={num} value={oneValue}>
                                            { oneValue }
                                        </option>
                                    )}
                                </select>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>

                </div>

            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={updateUser}>Save Changes</button>
            <button type="button" className="btn btn-secondary" onClick={closeViewModal}>Close</button>
        </div>
      </Modal>
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
    {...userDuck.actions, ...activityDuck.actions}
  )(AllCompanies)
);
