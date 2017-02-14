import React, {PropTypes} from 'react';
import identity from 'lodash/fp/identity';
import getOr from 'lodash/fp/getOr';
import Picture from '../../atom/picture';
import Link from '../../atom/link';
import style from './style.css';

const getOrBlank = getOr('');

const Card = (props, context) => {
  const {translate = identity, skin} = context;
  const {
    view,
    image,
    time,
    adaptiv,
    certification,
    type,
    title,
    author,
    cta,
    progress,
    href,
    imghref
  } = props;

  const defaultColor = getOr('#00B0FF', 'common.primary', skin);

  const calltoaction = cta ? (
    <div className={style.cta}>{cta}</div>
  ) : null;

  const certif = certification ? (
    <div className={style.certification} />
  ) : null;

  const myprogress = !adaptiv ? (
    <div className={style.progressWrapper}>
      <div className={style.progress}
        style={{
          width: progress,
          background: defaultColor
        }}
      />
    </div>
  ) : (null);

  const adaptivIcon = adaptiv ? (
    <div className={style.adaptiv} />
  ) : null;

  return (
    <div className={view === 'dashboard' ? style.grid : style.list}>
      <div className={style.default}>
        <div className={style.imageWrapper}>
          <Link href={imghref}>
            {certif}
            {adaptivIcon}
            <span className={style.timer}>{time}</span>
            {calltoaction}
            <div className={style.overlay}
              style={{
                backgroundColor: defaultColor
              }}
            />
            <Picture src={image} />
          </Link>
        </div>
        {myprogress}
        <div className={style.infoWrapper}>
          <div className={style.type}
            style={{
              color: defaultColor
            }}
          >
            {type}
          </div>
          <div className={style.title}>
            <Link href={href}>
              {title}
            </Link>
          </div>
          <div className={style.author}>
            {author}
          </div>
        </div>
      </div>
    </div>
  );
};

Card.contextTypes = {
  skin: React.PropTypes.object,
  translate: React.PropTypes.func
};

Card.propTypes = {
  view: PropTypes.string,
  image: PropTypes.string,
  time: PropTypes.string,
  adaptiv: PropTypes.bool,
  certification: PropTypes.bool,
  type: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  cta: PropTypes.string,
  progress: PropTypes.string,
  href: PropTypes.string,
  imghref: PropTypes.string
};

export default Card;