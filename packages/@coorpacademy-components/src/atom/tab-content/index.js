import React from 'react';
import style from './style.css';

const TabContent = props => {
  const detailsClassName = `${style.tabContentDetails}
  ${props.hideContentBackground ? '' : style.tabContentDetailsBackground}`;
  return (
    <div className={style.tabContent}>
      <div className={style.tabContentTitle}>
        {props.translations.titles[props.activeContent]}
      </div>
      <div className={detailsClassName}>
        {props.children}
      </div>
    </div>
  );
};

export default TabContent;