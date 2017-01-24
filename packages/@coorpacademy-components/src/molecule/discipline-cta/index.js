import React, {PropTypes} from 'react';
import identity from 'lodash/fp/identity';
import {hoverFill} from '../../atom/button/hover-fill.css';
import style from './style.css';

const DisciplineCTA = (props, context) => {
  const {
    startLabel,
    buyLabel,
    start,
    buy
  } = props;

  const {
    translate = identity
  } = context;

  const startLearning = (
    <span
      dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
        __html: translate(startLabel)
      }}
    />
  );
  const premium = (
    <span
      dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
        __html: translate(buyLabel)
      }}
    />
  );

  const startButton = start && (
    <a
      className={`${style.start} ${hoverFill}`}
      onClick={start}
    >
      {startLearning}
    </a>
  );

  const buyButton = buy && (
    <a
      className={`${style.buy} ${hoverFill}`}
      onClick={buy}
    >
      {premium}
    </a>
  );

  return (
    <div className={style.head}>
      {startButton}
      {buyButton}
    </div>
  );
};

DisciplineCTA.contextTypes = {
  translate: React.PropTypes.func
};

DisciplineCTA.propTypes = {
  startLabel: PropTypes.string,
  buyLabel: PropTypes.string,
  start: PropTypes.func,
  buy: PropTypes.func
};

export default DisciplineCTA;