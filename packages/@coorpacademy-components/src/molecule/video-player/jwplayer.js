import React from 'react';
import PropTypes from 'prop-types';
import ReactJWPlayer from 'react-jw-player';
import {SrcPropType} from '../../util/proptypes';
import style from './jwplayer.css';

class JWPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
  }

  handlePlay(e) {
    this.props.onPlay && this.props.onPlay(e);
  }

  handleResume(e) {
    this.props.onResume && this.props.onResume(e);
  }

  handlePause(e) {
    this.props.onPause && this.props.onPause(e);
  }

  handleEnded(e) {
    this.props.onEnded && this.props.onEnded(e);
  }

  render() {
    return (
      <div className={style.wrapper}>
        <ReactJWPlayer
          onPlay={this.handlePlay}
          onResume={this.handleResume}
          onPause={this.handlePause}
          onOneHundredPercent={this.handleEnded}
          {...this.props.jwpOptions}
        />
      </div>
    );
  }
}

JWPlayer.propTypes = {
  jwpOptions: PropTypes.shape({
    file: SrcPropType,
    customProps: PropTypes.shape({
      aspectratio: PropTypes.string,
      width: PropTypes.string,
      skin: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    licenseKey: PropTypes.string.isRequired,
    playerScript: SrcPropType.isRequired
  }),
  onPlay: PropTypes.func,
  onResume: PropTypes.func,
  onPause: PropTypes.func,
  onEnded: PropTypes.func
};

export default JWPlayer;
