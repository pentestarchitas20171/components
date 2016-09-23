import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import identity from 'lodash/fp/identity';
import {checker, createValidate} from '../../util/validation';
import createTitledCheckbox from '../titled-checkbox';
import style from './style.css';

const DEFAULT = 'default';
const NORMAL = 'normal';
const CLOSABLE = 'closable';
const CLOSED = 'closed';

const conditions = checker.shape({
  props: checker.shape({
    close: checker.func.optional,
    onToggle: checker.func.optional,
    onClose: checker.func.optional,
    onOpen: checker.func.optional,
    theme: checker.string.optional,
    mode: checker.string.optional,
    status: checker.string.optional,
    title: checker.string,
    choices: checker.array
  }).strict,
  children: checker.none
});

export default (treant, options = {}) => {
  const {h} = treant;
  const {skin, translate = identity} = options;
  const TitledCheckbox = createTitledCheckbox(treant, options);

  const cross = String.fromCharCode(getOr('x', 'icons.close', skin));
  const arrow = String.fromCharCode(getOr('v', 'icons["arrow-bottom"]', skin));

  const closedHeader = ({onOpen, title}) => (
    <div className={style.closedHeader}>
      <span onClick={onOpen}>
        <span>{title}</span>
        <span className={style.arrow}>
          {arrow}
        </span>
      </span>
    </div>
  );

  const openHeader = _options => (
    <div className={style.openHeader}>
      <span
        className={style.closeText}
      >
        {_options.close}
      </span>
      <span
        className={style.close}
        onClick={_options.onClose}
      >
        {cross}
      </span>
    </div>
  );

  const createHeader = props => {
    const _status = get('status', props);
    return _status === CLOSED ? closedHeader(options) : openHeader(options);
  };

  /**
   * themes
   *  - default (default)
   *  - courses
   *
   * modes
   *  - normal (default)
   *  - closable
   *
   * status
   *  - closed (default)
   *  - open
   */
  const Checkboxes = (props, children) => {
    const {
      title,
      choices,
      onToggle,
      onClose,
      onOpen,
      theme = DEFAULT,
      mode = NORMAL
    } = props;

    const _close = get('close', props);
    const _status = getOr(CLOSED, 'status', props);

    const isCourses = theme === 'courses';
    let header = null;

    if (mode === CLOSABLE) {
      header = createHeader({
        title: translate(title),
        close: translate(_close),
        status: _status,
        onClose,
        onOpen
      });
    }

    const lines = choices.map((choice, i) => {
      const defaultBG = '#ededed';
      const coursesBG = getOr(defaultBG, ['courses', i - 1], skin);
      const background = isCourses ? coursesBG : defaultBG;

      return (
        <li className={style.line}>
          <TitledCheckbox
            state={choice}
            onToggle={onToggle}
            background={background}
          >
          </TitledCheckbox>
        </li>
      );
    });

    return (
      <div className={style[_status]}>
        {header}
        <ul className={style.list}>
          {lines}
        </ul>
      </div>
    );
  };

  Checkboxes.validate = createValidate(conditions);
  return Checkboxes;
};