import { validate, checker } from '../../../util/validation';
import style from './module-bubble.css';
import fixtures from './fixtures';
import createLabelModName from '../../atom/label-mod-name';

const conditions = checker.shape({
  props: checker.shape({
    module: checker.shape({
      disabled: checker.bool.optional,
      filtered: checker.bool.optional,
      label: checker.string,
      status: checker.string
    }),
    onClick: checker.func
  }),
  children: checker.none
});

export default (engine, options = {}) => {
  const {h} = engine;
  const {skin, translate} = options;

  const icons = skin && skin.icons;
  const LabelModName = createLabelModName(engine, options);

  const ModuleBubble = (props, children) => {
    const {module, onClick} = props;
    const icon = icons && String.fromCharCode(icons[module.status]);
    const filtered = module.filtered;
    const disabled = module.disabled;
    const label = translate ? translate(module.label) : module.label;

    return (
      <div className={style.modulewrapper}
            attributes={{
              'data-name': 'module-bubble'
            }}
      >
        <div
          className={style.bubble}
          style={{
            cursor: disabled ? 'default' : 'pointer'
          }}
          onClick={e => {
            e.stopPropagation();
            if (!disabled) {
              onClick(module);
            }
          }}
        >
          <span
            className={style.bubbleBG}
            style={{
              background: skin && skin.mod[module.status]
            }}
          >
          </span>
          <span
            className={disabled ? style.iconDisabled : style.icon}
            style={{
              color: disabled ? skin.theme.lock : 'white'
            }}
          >
              {icon}
          </span>
        </div>
        <LabelModName>
          {label}
        </LabelModName>
      </div>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    ModuleBubble.validate = validate(conditions);
    ModuleBubble.fixtures = fixtures;
  }

  return ModuleBubble;
};
