import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/fp/get';
import keys from 'lodash/fp/keys';
import isEmpty from 'lodash/fp/isEmpty';
import pick from 'lodash/fp/pick';
import LockIcon from '@coorpacademy/nova-icons/solid/locks/lock-1';
import ClockIcon from '@coorpacademy/nova-icons/composition/coorpacademy/clock';
import AdaptivIcon from '@coorpacademy/nova-icons/composition/coorpacademy/adaptive';
import TimerIcon from '@coorpacademy/nova-icons/composition/coorpacademy/timer';
import PicturesIcon from '@coorpacademy/nova-icons/composition/coorpacademy/pictures';
import Provider from '../../atom/provider';
import style from './style.css';

const viewStyle = {
  grid: style.grid,
  list: style.list
};

const Timer = ({time, color}) =>
  <div className={style.timer}>
    <ClockIcon className={style.clockIcon} color={color} /> {time}
  </div>;

const AdaptivBubble = ({background, color}) =>
  <div className={style.adaptiv} style={{backgroundColor: background}}>
    <AdaptivIcon className={style.adaptivIcon} color={color} />
  </div>;

const Card = (props, context) => {
  const {skin} = context;
  const {
    view = 'grid',
    image,
    time,
    adaptiv,
    freerun,
    disabled = false,
    type,
    title,
    author,
    progress,
    onClick
  } = props;

  const lazyClass = title ? style.default : style.lazy;
  const empty = isEmpty(pick(['title', 'type', 'author', 'image'], props));
  const defaultColor = get('common.primary', skin);
  const darkColor = get('common.dark', skin);
  const mediumColor = get('common.medium', skin);
  const whiteColor = get('common.white', skin);
  const cardStyle = viewStyle[view];

  const myprogress = !adaptiv && !empty
    ? <div className={style.progressWrapper}>
        <div
          className={style.progress}
          style={{
            width: progress,
            backgroundColor: defaultColor
          }}
        />
      </div>
    : null;
  const emptyIcon = empty
    ? <PicturesIcon className={style.emptyIcon} color={whiteColor} background={defaultColor} />
    : null;
  const freeRunIcon = freerun
    ? <div className={style.timerIconWrapper}>
        <TimerIcon className={style.freerunIcon} color={mediumColor} background={defaultColor} />
      </div>
    : null;
  const adaptivIcon = adaptiv ? <AdaptivBubble color="white" background={defaultColor} /> : null;
  const lock = disabled
    ? <LockIcon color={darkColor} className={style.lock} outline={mediumColor} />
    : null;

  const timer = time ? <Timer time={time} color={darkColor} /> : null;

  return (
    <div
      className={classnames(cardStyle, empty ? style.empty : null)}
      data-name="card"
      data-lock={disabled}
      data-type={freerun ? 'microlearning' : 'learner'}
    >
      <div className={lazyClass} disabled={disabled} data-type={disabled ? 'lock' : 'unlock'}>
        {disabled ? <div className={style.lockWrapper}>{lock}</div> : null}
        <div disabled={disabled}>
          <div
            className={style.imageWrapper}
            style={{
              backgroundColor: defaultColor,
              backgroundImage: image ? `url('${image}')` : 'none'
            }}
          >
            <div data-name="cover" className={style.ctaWrapper} onClick={!disabled && onClick}>
              {freeRunIcon}
              {emptyIcon}
              {adaptivIcon}
              {timer}
            </div>

          </div>
          {myprogress}
          <div data-name="info" className={style.infoWrapper} onClick={!disabled && onClick}>
            <div
              data-name="type"
              className={classnames(style.type, empty ? style.empty : null)}
              style={{
                color: !disabled && defaultColor
              }}
            >
              {type}
            </div>
            <div className={classnames(style.title, empty ? style.empty : null)}>
              <div data-name="title" title={title}>
                {title}
              </div>
            </div>
            <div
              data-name="author"
              title={author}
              className={classnames(style.author, empty ? style.empty : null)}
            >
              {author}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.contextTypes = {
  skin: Provider.childContextTypes.skin
};

Card.propTypes = {
  view: PropTypes.oneOf(keys(viewStyle)),
  image: PropTypes.string,
  time: PropTypes.string,
  disabled: PropTypes.bool,
  adaptiv: PropTypes.bool,
  freerun: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  progress: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;
