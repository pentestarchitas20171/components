import cond from 'lodash/fp/cond';
import constant from 'lodash/fp/constant';
import get from 'lodash/fp/get';
import isEqual from 'lodash/fp/isEqual';
import pipe from 'lodash/fp/pipe';
import {getCurrentExitNode, getCurrentProgression} from '../../utils/state-extract';
import headerProps from './header';

const popinEndStateToProps = ({translate}, dispatch) => state => {
  const exitNode = getCurrentExitNode(state);
  const progression = getCurrentProgression(state);

  const header = cond([
    [
      pipe(get('type'), isEqual('success')),
      () => ({
        title: '',
        subtitle: translate('Congratulations!'),
        fail: false,
        stars: get('state.stars')(progression),
        cta: {
          title: translate('Back to dashboard'),
          subtitle: '',
          href: '/'
        }
      })
    ],
    [
      pipe(get('type'), isEqual('failure')),
      () => ({
        title: translate('O O O P S'),
        subtitle: translate('You are missing lives!'),
        fail: true,
        lives: get('state.lives')(progression),
        cta: {
          title: translate('Retry level'),
          href: `/`
        }
      })
    ],
    [constant(true), constant(null)]
  ])(exitNode);
  const recommendation = {
    title: translate('Related subjects'),
    coards: null
  };
  const footer = {
    title: translate('Back to dashboard'),
    href: '/'
  };
  return {
    header: headerProps(state),
    summary: {
      header,
      recommendation,
      footer
    }
  };
};

export default popinEndStateToProps;