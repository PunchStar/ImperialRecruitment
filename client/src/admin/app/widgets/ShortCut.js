import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
// import { actions } from "../../_metronic/ducks/i18n";
import AddShortCut from "../partials/content/CustomDropdowns/AddShortCut";
import ButtonGroup from "../partials/content/CustomDropdowns/ButtonGroup";

import * as actions from "../../../app/actions";
import * as shortcutDuck from "../../../app/store/ducks/shortcut.duck";

import PerfectScrollbar from "react-perfect-scrollbar";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

function ShortCut(props) {
  
  let [isListLinkEdit, setIsListLinkEdit] = useState([]);
  let [listLink, setListLink] = useState([]);
  let [beforeListLinkValue, setBeforeListLinkValue] = useState([]);

  useEffect(() => {
    let tempIsListLinkEdit = [], tempBeforeListLinkValue = [];
    props.shortcuts.map(item => {
      tempIsListLinkEdit.push(false);
      tempBeforeListLinkValue.push(item.value);
    })

    setIsListLinkEdit(tempIsListLinkEdit);
    setListLink(props.shortcuts);
    setBeforeListLinkValue(tempBeforeListLinkValue);
  
  }, [props])

  const onLinkEditBtnClick = (selectedIndex, newValue) => {
    let tempIsListLinkEdit = isListLinkEdit;
    tempIsListLinkEdit.splice(selectedIndex, 1, newValue);
    setIsListLinkEdit([...tempIsListLinkEdit]);
  }

  const onSetLink = (selectedIndex, value) => {
    let tempListLink = listLink;
    let key = tempListLink[selectedIndex].key;
    tempListLink.splice(selectedIndex, 1, { key: key, value: value} );
    setListLink([...tempListLink]);
  }

  const onSetBeforeLink = (selectedIndex) => {
    let value = listLink[selectedIndex].value;
    let tempBeforeListLinkValue = beforeListLinkValue;
    tempBeforeListLinkValue.splice(selectedIndex, 1, value);
    setBeforeListLinkValue([...tempBeforeListLinkValue]);
  }

  const onRestoreBeforeLink = (selectedIndex) => {
    let value = beforeListLinkValue[selectedIndex];
    let tempListLink = listLink;
    let key = tempListLink[selectedIndex].key;
    tempListLink.splice(selectedIndex, 1, { key: key, value: value} );
    // setListLink([...tempListLink]);
  }

  const updateListLink = () => {
    actions.updateShortCut({links: listLink})
      .then(res => {
        let {data} = res;
        if(!data.success) {
          props.updateShortCut([]);
        } else {
          props.updateShortCut(data.shortcuts);
        }
      })
      .catch((err) => {
        // console.log(err)
        // props.updateShortCut([]);
      });
}

  return (
    <div className="kt-widget1" style={{backgroundColor: 'white', border: "1px solid #EBEDF3", borderRadius: "0.42rem"}}>
      <div className="kt-widget1__item ng-star-inserted" style={{marginBottom: 20}}>
        <div className="kt-widget1__info" style={{width: "100%"}}>
          <span className="shortcutTitle">Clarizen Shortcuts</span>

          <AddShortCut />
        </div>
      </div>

      <PerfectScrollbar
        options={perfectScrollbarOptions}
        style={{ maxHeight: "25vh", height: "25vh", position: "relative" }}
      >
        {listLink.map((eachLink, index) => 
          <div className="linkValue" key={index}>
            {isListLinkEdit[index] ?
              <div>
                <input type="text" value={eachLink.value} className="shortCutInput" onChange={ (e) => onSetLink(index, e.target.value) } />
                <i className="fa fa-check" style={{fontSize: 12, marginLeft: 10, backgroundColor: "rgb(104, 173, 91)", color: "white", padding: 5, cursor: "pointer" }} onClick={() => {onLinkEditBtnClick(index, false); updateListLink();}} />
                <i className="fa fa-close" style={{fontSize: 12, marginLeft: 10, color: "black", cursor: "pointer" }} onClick={() => {onLinkEditBtnClick(index, false); onRestoreBeforeLink(index);}} />
              </div>
              :
              <div>
                <span className="shortCutLink">
                  <a href={eachLink.value} target="_blank">
                    {eachLink.value.key > 40 ? eachLink.key.slice(0, 40) + "..." : eachLink.key } 
                  </a>
                </span>
                <ButtonGroup currentShortCut={eachLink} />
                {/* <i className="fa fa-edit pull-right" style={{fontSize: 14, marginLeft: 10, color: "rgb(104, 173, 91)", cursor: "pointer" }}  onClick={() => {onLinkEditBtnClick(index, true); onSetBeforeLink(index) }} /> */}
              </div>
            }
          </div>
        )}
      </PerfectScrollbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  shortcuts: state.shortcut.shortcuts
})

export default injectIntl(
  connect(
    mapStateToProps,
    shortcutDuck.actions
  )(ShortCut)
);
