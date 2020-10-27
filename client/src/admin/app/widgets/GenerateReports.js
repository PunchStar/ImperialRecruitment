/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Button } from "react-bootstrap";
import ReactPDF, { Page, Text, Image, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import crypto from 'crypto';
import { Config } from '../../../app/config/config';
import * as actions from "../../../app/actions";

let documentStates = ["Please Upload", "Pending", "Approved", "Not Available"];

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  //   fontFamily: 'Oswald'
  },
  subtitle: {
      fontSize: 10,
      marginLeft: 10,
      //   fontFamily: 'Oswald'
  },
  subtitle2: {
    fontSize: 10,
    marginLeft: 5,
  },
  seqtitle: {
      fontSize: 16,
      margin: 10
  },
  author: {
    fontSize: 10,
    textAlign: 'justify',
    marginTop: 20,
  },
  
  text: {
    margin: "2px 5px",
    fontSize: 12,
    textAlign: 'justify',
  //   fontFamily: 'Times-Roman'
  },
  titleImage: {
      marginVertical: 15,
      marginHorizontal: 100,
      width: '80%',
      height: 150,
      alignItems: "center",
      flexGrow: 1,
      padding: 10
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: { 
      display: "table", 
      width: "auto", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0
  }, 
  imgTable: { 
      display: "table", 
      width: "auto", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 ,
      
  }, 
  tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
  }, 
  tableCol: { 
      width: "25%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
  }, 
  tableCell: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 10 
  },
  imgTableCol: { 
      width: "50%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
  }, 
  
  
  headerRow: { 
      margin: "auto", 
      flexDirection: "row" 
  }, 
  headerCol: { 
      width: "30%", 
      borderStyle: "solid", 
      borderWidth: 0, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
  },
  fileNameList: {
    margin: "1px 25px",
    fontSize: 11,
    textAlign: 'justify',
  //   fontFamily: 'Times-Roman'
  },
});

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

var PDFDocument = (pdfUsers) => (  
  <Document>
    <Page style={styles.body}>
      <View><Text style={styles.title}>COMPANY LISTS</Text></View>
      <View>
        {pdfUsers.userData.map((user, index) => {
            let {companyName, fullName, address, phoneNumber, email, password, bankName, accountNumber, zelle, fico, managementFee, amountMonth, referer, notes, driverLicense, social, passport, tax, statement, utility, phoneBill, additionalDoc } = user;
            return (
              <View style={{marginTop: 20}} key={index}>
                <Text style={styles.text}><Text style={styles.subtitle}>{"Company Name:  "}</Text>{ companyName } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Full Name:  "}</Text>{ fullName } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Address:  "}</Text>{ address } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Phone Number:  "}</Text>{ phoneNumber } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Email:  "}</Text>{ email } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Password:  "}</Text>{ getPassword(password) } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Bank Name:  "}</Text>{ bankName } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Account Number:  "}</Text>{ accountNumber } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Zelle / Quickpay Contact:  "}</Text>{ zelle } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Current FICO Score (estimated):  "}</Text>{ fico } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Management Fee:  $ "}</Text>{ managementFee } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Amount Month:  $ "}</Text>{ amountMonth } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Referer:  "}</Text>{ referer } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Notes:  "}</Text>{ notes } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"State Drivers License or ID:  "}</Text>{ driverLicense.file} </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Social Security Card:  "}</Text>{ social.file } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"USA Passport (showing all 4 corners):  "}</Text>{ passport.file } </Text >
                <Text style={styles.subtitle2}>{"2 year Most Recent Tax Returns (Full):  "}</Text>
                  { tax.files.length === 0 
                    ? <Text style={styles.fileNameList}></Text>
                    : tax.files.map((eachFile) => {
                        return (
                          <Text style={styles.fileNameList}> {eachFile}</Text>
                        )
                    })
                  } 
                <Text style={styles.subtitle2}>{"3 months Most Recent Bank Statements:  "}</Text>
                  { statement.files.length === 0 
                    ? <Text style={styles.fileNameList}></Text>
                    : statement.files.map((eachFile) => {
                        return (
                          <Text style={styles.fileNameList}> {eachFile}</Text>
                        )
                    })
                  } 
                <Text style={styles.text}><Text style={styles.subtitle}>{"Utility Bill:  "}</Text>{ utility.file } </Text >
                <Text style={styles.text}><Text style={styles.subtitle}>{"Mobile Phone Bill:  "}</Text>{ phoneBill.file } </Text >
                <Text style={styles.subtitle2}>{"Any additional documents:  "}</Text>
                  { additionalDoc.files.length === 0 
                    ? <Text style={styles.fileNameList}></Text>
                    : additionalDoc.files.map((eachFile) => {
                        return (
                          <Text style={styles.fileNameList}> {eachFile}</Text>
                        )
                    })
                  } 
              </View>
            )
        })}
      </View>
    </Page>
  </Document>
)

function GenerateReports(props) {
 
  var tempUsers = [];
  var len = props.users.length;
  if(len > 5)
    len = 5;

  for(let i = 0 ; i < len ; i ++)
    tempUsers.push(props.users[i]);
 
  const [users, setUsers] = useState(tempUsers);

  // useEffect(() => {
  //   var tempUsers = [];
  //   var len = props.users.length;
  //   if(len > 5)
  //     len = 5;

  //   for(let i = 0 ; i < len ; i ++)
  //     tempUsers.push(props.users[i]);

  //   setUsers(tempUsers);

  // }, [props]);
 
  
  return (
    <>
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label row">
              {/* <span className="kt-portlet__head-title">Generate Reports</span> */}
              <span className="shortcutTitle">Generate Reports</span>
          </div>

          <PDFDownloadLink
            document={<PDFDocument selectedLogo={"selectedLogo"} userData={props.users} loading={false}/>}
            variant="outline-success"
            className="btn-sm pull-right"
            fileName="report.pdf"
            style={{
                textDecoration: "none",
                padding: "6px 10px",
                color: "rgb(96, 185, 139)",
                backgroundColor: "#ffffff",
                border: "1px solid rgb(96, 185, 139)",
                marginLeft: '20px',
                borderRadius: '3px',
                fontWeight: 400,
            }}
          >
              {" Save PDF "}
          </PDFDownloadLink>

        </div>
        {/* <div className="kt-portlet__body">
          <div className="kt-widget4">

            {users.map((user, index) =>
              <div className="kt-widget4__item reportItem" key={index}>
                <span className="col-sm-6">
                  {user.fullName}
                </span>
                <span className="col-sm-6">{user.email}</span>
              </div>
            )}

          </div>
        </div>
      </div> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  users: state.user.users
})

export default injectIntl(
  connect(
    mapStateToProps,
    null
  )(GenerateReports)
);
