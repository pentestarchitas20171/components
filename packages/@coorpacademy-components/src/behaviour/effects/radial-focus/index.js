import addClassName from '../../../util/add-class-name';
import createBehaviour from '../../../util/behaviour';
import style from './style.css';

const radialFocus = (treant, options) => (props, child) => ({
  className: addClassName(style.focus)(child)
});

export default createBehaviour(radialFocus);