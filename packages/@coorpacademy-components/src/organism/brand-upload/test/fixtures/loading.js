import defaultsDeep from 'lodash/fp/defaultsDeep';
import Upload from '../../../../molecule/brand-upload-box/test/fixtures/loading';
import Default from './default';

const {props} = Default;

export default {
  props: defaultsDeep(props, {
    upload: Upload.props
  })
};