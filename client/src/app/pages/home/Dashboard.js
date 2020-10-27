import React, { useState } from "react";
import HomeTab from './HomeTab';

// import Tabs from 'react-responsive-tabs';
// import 'react-responsive-tabs/styles.css';

// const tabList = [
//   { name: 'Home', content: <HomeTab /> },
// ];
 
// function getTabs() {
//   return tabList.map((tab, index) => ({
//     title: tab.name,
//     getContent: () => tab.content,
//     /* Optional parameters */
//     key: index,
//     tabClassName: 'tab',
//     panelClassName: 'panel',
//   }));
// }

export default function Dashboard() {

  return (
    <>        
      {/* <Tabs items={getTabs()} />  */}
      <HomeTab />
    </>
  );
}
