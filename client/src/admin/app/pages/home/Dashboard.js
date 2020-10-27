import React, { useState, useEffect } from "react";
import DashboardTab from './DashboardTab';
import AllCompanies from './AllCompanies';
import Links from './Links';
import Account from './Account';
import HMenu from "../../../_metronic/layout/header/HMenu/HMenu";

import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';

const tabList = [
  { name: 'DASHBOARD', content: <DashboardTab />},
    // content: <>
    //           <div className="kt-header__bottom" style={{paddingTop: 20}}>
    //             <div className={`kt-container`}>
    //               <HMenu />
    //             </div>
    //           </div>

    //           <DashboardTab /> 
    //         </> },
  { name: 'ALL COMPANIES', content: <AllCompanies /> },
  { name: 'ACCOUNT', content: <Account /> },
  { name: 'PAGES', content: <Links /> },
  { name: 'REPORTS', content: <div /> },
];
 
function getTabs() {
  return tabList.map((tab, index) => ({
    title: tab.name,
    getContent: () => tab.content,
    /* Optional parameters */
    key: index,
    tabClassName: 'tab',
    panelClassName: 'panel',
  }));
}

const tabSubTitleList = [
  "Dashboard & Reports", "Company Management", "Accounting", "Page Editor", "Tools & Metrics"
]

export default function Dashboard() {

  useEffect(() => {
    if(document.querySelector(`#tab-0`).childElementCount < 2) {
      for( let i = 0 ; i < tabSubTitleList.length ; i ++) {
        let span = document.createElement("SPAN");
        let br = document.createElement("BR");
        span.innerHTML = tabSubTitleList[i];
        span.style.fontSize = "1rem";
        span.style.color = "#B5B5C3";
        document.querySelector(`#tab-${i}`).appendChild(br)
        document.querySelector(`#tab-${i}`).appendChild(span)
      }
    }
  });

  return (
    <>        
      <Tabs items={getTabs()} showMore={false} /> 
    </>
  );
}
