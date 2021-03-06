import React from 'react';
import PropTypes from 'prop-types';
import ModuleBubble from '../module-bubble';
import style from './style.css';

function ModuleCard(props, context) {
  const {label, level, onClick} = props;

  return (
    <div className={style.default} data-name="module-card" onClick={onClick}>
      <div className={style.title}>
        {label}
      </div>
      <div className={style.level}>
        {level}
      </div>
      <div className={style.module}>
        <ModuleBubble {...props} onClick={onClick} />
      </div>
    </div>
  );
}

ModuleCard.propTypes = {
  label: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ModuleCard;
