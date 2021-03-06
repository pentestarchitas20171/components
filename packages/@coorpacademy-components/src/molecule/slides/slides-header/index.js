import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';
import classnames from 'classnames';
import BackIcon from '@coorpacademy/nova-icons/composition/navigation/arrow-left';
import Link from '../../../atom/link';
import Provider from '../../../atom/provider';
import Life from '../../../atom/life';
import style from './style.css';

const SlidesHeader = (props, context) => {
  const {backHref, primary, secondary, lives, className} = props;
  const {skin} = context;

  const primarySkinColor = get('common.primary', skin);

  const primarySubtitleView = primary && primary.subtitle
    ? <div
        className={style.primarySubtitle}
        style={{
          color: primarySkinColor
        }}
      >
        {primary.subtitle}
      </div>
    : null;

  const secondarySubtitleView = secondary && secondary.subtitle
    ? <div className={style.secondarySubtitle}>
        {secondary.subtitle}
      </div>
    : null;

  const secondaryTitleView = secondary && secondary.title
    ? <div className={style.secondaryTitle}>
        {secondary.title}
      </div>
    : null;

  return (
    <div data-name="slidesHeader" className={classnames(style.wrapper, className)}>
      <Link href={backHref} className={style.backLink}>
        <BackIcon className={style.backIcon} color="inherit" />
        <div className={style.primary}>
          {primarySubtitleView}
          <div data-name="primaryTitle" className={style.primaryTitle}>
            {primary.title}
          </div>
        </div>
      </Link>
      <div className={style.secondary}>
        {secondarySubtitleView}
        {secondaryTitleView}
      </div>
      <div className={style.livesWrapper}>
        <Life {...lives} className={style.life} mode="small" />
      </div>
    </div>
  );
};

SlidesHeader.contextTypes = {
  skin: Provider.childContextTypes.skin
};

SlidesHeader.propTypes = {
  backHref: Link.propTypes.href,
  primary: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
  }),
  secondary: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string
  }),
  lives: PropTypes.shape({
    count: PropTypes.number.isRequired
  })
};

export default SlidesHeader;
