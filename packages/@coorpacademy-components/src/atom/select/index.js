import {checker, createValidate} from '../../util/validation';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    field: checker.shape({
      title: checker.string,
      placeholder: checker.string,
      type: checker.string,
      value: checker.string.optional,
      onChange: checker.func.optional
    })
  }),
  children: checker.none
});

export default (treant, options) => {
  const {h} = treant;

  const Select = (props, children) => (
    <div className={style.default}>
      <label>
        Color
        <select>
          <option value="pouet">Option</option>
          <option value="pouet2">Something</option>
          <option value="pouet3">Something else</option>
        </select>
      </label>
    </div>
  );

  Select.validate = createValidate(conditions);
  return Select;
};
