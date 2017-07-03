import omit from 'lodash/fp/omit';
import fixtures from './default';

export default {
  props: omit('assets', fixtures.props)
};
