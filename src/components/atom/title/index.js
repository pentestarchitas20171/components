import { spec, validate, check } from '../../../util/proptypes-checker';
import fixtures from './fixtures';

const conditions = {
  props: null,
  children: spec({
  })
};

export default (engine, options) => {
  const {h} = engine;
  const Title = (props, children) => (
    <h1>
      {children}
    </h1>
  );

  if (process.env.NODE_ENV !== 'production') {
    Title.validate = validate(conditions);
    Title.fixtures = fixtures;
  }

  return Title;
};
