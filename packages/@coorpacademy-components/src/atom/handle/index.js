import React from 'react';
import PropTypes from 'prop-types';
import addClassName from '../../util/add-class-name';
import style from './style.css';

const Hammer = typeof window !== 'undefined' ? require('hammerjs') : undefined;

class Handle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.ref = this.ref.bind(this);
  }

  componentDidMount() {
    if (Hammer && this.element) {
      this.hammer = new Hammer(this.element);
      this.hammer.on('panstart', this.props.onPanStart);
      this.hammer.on('panend', this.props.onPanEnd);

      if (this.onX()) {
        this.hammer.on('panleft panright', this.props.onPan);
      }

      if (this.onY()) {
        this.hammer.on('panup pandown', this.props.onPan);
      }
    }
  }

  componentWillUnmount() {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();
    }
    this.hammer = null;
  }

  ref(element) {
    this.element = element;
  }

  onX() {
    return this.props.axis === 'x' || this.props.axis === 'both';
  }

  onY() {
    return this.props.axis === 'y' || this.props.axis === 'both';
  }

  render() {
    const {x, y} = this.props;

    return (
      <div
        {...addClassName(`${style.default}`)({
          className: this.props.className
        })}
        data-name={'handle'}
        style={{
          ...this.props.style,
          left: `${x}px`,
          top: `${y}px`
        }}
        ref={this.ref}
      />
    );
  }
}

Handle.defaultProps = {
  axis: 'both'
};

Handle.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  axis: PropTypes.oneOf(['x', 'y', 'both']),
  style: PropTypes.object,
  onPan: PropTypes.func,
  onPanStart: PropTypes.func,
  onPanEnd: PropTypes.func
};

export default Handle;
