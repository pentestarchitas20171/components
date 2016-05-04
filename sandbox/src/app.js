import { createCheckboxes, createDisciplineCard } from '../../src';
import skin from '../assets/skin';
import disciplines from '../assets/disciplines';
import sandbox from './sandbox.css';

export default engine => {
  const {h} = engine;
  const options = {
    skin
  };

  const choices = [{
    label: 'plop',
    checked: false
  }, {
    label: 'plup',
    checked: false
  }, {
    label: 'ploup',
    checked: true
  }];

  const Checkboxes = createCheckboxes(engine, options);
  const DisciplineCard = createDisciplineCard(engine, options);

  return (props, children) => (
    <div>
      <Checkboxes
        title='Pick me'
        theme='courses'
        mode='closable'
        status='closed'
        choices={choices}
      />
      <DisciplineCard discipline={disciplines[0]}/>
    </div>
  );
};
