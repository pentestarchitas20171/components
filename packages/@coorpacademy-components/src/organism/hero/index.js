import React, {PropTypes} from 'react';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import identity from 'lodash/fp/identity';
import * as CustomPropTypes from '../../util/proptypes';
import Link from '../../atom/link';
import style from './style.css';

function Hero(props, context) {
  const {translate = identity, skin} = context;
  const bg = get('images.hero', skin);
  const {url, title, touch = false} = props;
  const text = translate(title);
  const backgroundImage = bg ? `url(${bg})` : '';
  const ctaClass = touch ? 'ctaTouch' : 'ctaNoTouch';

  return (
    <div
      className={style.hero}
      style={{
        backgroundImage
      }}
    >
      <Link
        href={url}
        className={style[ctaClass]}
      >
        <div
          className={style.label}
          style={{
            color: getOr('#00b0ff', 'common.primary', skin)
          }}
        >
          {text}
          <span
            className={style.bar}
            style={{
              backgroundColor: getOr('#00b0ff', 'common.primary', skin)
            }}
          />
        </div>
      </Link>
    </div>
  );
}

Hero.contextTypes = {
  skin: React.PropTypes.object,
  translate: React.PropTypes.func
};

Hero.propTypes = {
  url: PropTypes.oneOfType([
    CustomPropTypes.url,
    PropTypes.string
  ]).isRequired,
  title: PropTypes.string.isRequired
};

export default Hero;
