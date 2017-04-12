import React from 'react';
import style from './freemium.css';

const SubscriptionFreemiumDetails = props => (
  <div className={style.subscriptionFreemium}>
    <div className={style.subscriptionFreemiumTitle}>
      {props.translations.subscriptionFreemiumTitle}
    </div>
    <div className={style.subscriptionFreemiumContent}>
      {props.translations.subscriptionFreemiumDescription}
    </div>
    <button
      className={style.subscriptionFreemiumButton}
      onClick={props.handleSubscriptionFreemiumButton}
    >
      {props.translations.subscriptionFreemiumButton}
    </button>
  </div>
);

export default SubscriptionFreemiumDetails;