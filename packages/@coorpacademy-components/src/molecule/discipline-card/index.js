import getOr from 'lodash/fp/getOr';
import partial from 'lodash/fp/partial';
import unary from 'lodash/fp/unary';
import identity from 'lodash/fp/identity';
import {checker, createValidate} from '../../util/validation';
import createModuleBubble from '../../molecule/module-bubble';
import CenteredTextBehaviour from '../../behaviour/align/centered/';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    discipline: checker.shape({
      visible: checker.bool.optional,
      modules: checker.array
    }),
    onClick: checker.func,
    onModuleClick: checker.func
  }).strict,
  children: checker.none
});

export default (treant, options = {}) => {
  const ModuleBubble = createModuleBubble(treant, options);
  const CenteredText = CenteredTextBehaviour(treant, options);

  const DisciplineCard = (props, children) => {
    const {h} = treant;
    const {translate = identity, skin} = options;
    const {discipline, onClick, onModuleClick} = props;

    const hidden = discipline.visible === false;
    const disciplineClass = hidden ? style.hidden : style.default;
    const rand = (Math.floor(Math.random() * 7) + 3) * .2;
    const duration = hidden ? 1 : rand;
    const animationDuration = `${duration}s`;

    const modules = discipline.modules.map(_module => (
      <ModuleBubble
        module = {_module}
        onClick = {onModuleClick}
        key = {_module.ref}
      >
      </ModuleBubble>
    ));

    const click = unary(partial(onClick, [discipline]));
    const label = translate(discipline.label);
    const hasCourse = discipline.courseNum !== 'undefined';

    const bg = getOr('#fff', ['courses', discipline.courseNum], skin);
    const bar =
      <div
        style={{
          background: bg,
          height: '5px'
        }}
      />;

    return (
      <div className={disciplineClass}
           attributes={{
             'data-name': 'discipline-card'
           }}
           onClick={click}
           style={{
             animationDuration
           }}
      >
        <div className={style.area}>
          <div className={style.text}>
            <p className={style.headerModule}>
              {label}
            </p>
          </div>
        </div>

        {hasCourse && bar}

        <CenteredText>
          <div className={style.moduleProgressionWrapper}>
            {modules}
          </div>
        </CenteredText>
      </div>
    );
  };

  DisciplineCard.validate = createValidate(conditions);
  return DisciplineCard;
};