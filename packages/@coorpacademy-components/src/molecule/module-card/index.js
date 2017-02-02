import React, {PropTypes} from 'react';
import partial from 'lodash/fp/partial';
import unary from 'lodash/fp/unary';
import identity from 'lodash/fp/identity';
import ModuleBubble from '../../molecule/module-bubble';
import style from './style.css';

function ModuleCard(props, context) {
  const {skin} = context;
  const {label, level, onClick} = props;
  const hideLabel = true;

  return (
    <div
      className={style.default}
      data-name='module-card'
      onClick={onClick}
    >
      <div className={style.title}>
        {label}
      </div>
      <div className={style.level}>
        {level}
      </div>
      <div className={style.module}>
        <ModuleBubble
          hideLabel
          module={props}
          onClick={onClick}
        />
      </div>
    </div>
  );
}

ModuleCard.contextTypes = {
  skin: React.PropTypes.object
};

ModuleCard.propTypes = {
  label: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ModuleCard;
