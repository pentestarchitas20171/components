import React from 'react';
import uniqueId from 'lodash/fp/uniqueId';
import {checker, createValidate} from '../../util/validation';
import Loader from '../../atom/loader';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    description: checker.string.optional,
    browse: checker.string.optional,
    status: checker.oneOf(['default', 'loading', 'dropping']).optional,
    onLoad: checker.func.optional
  }),
  children: checker.none
});

const BrandUploadBox = ({children, ...props}) => {
  const {
    description = '',
    browse = '',
    onLoad
  } = props;

  const idBox = uniqueId('drop-box-');
  let content;

  switch (props.status) {
    case 'loading':
      content = (
        <div className={style.loading}>
          <Loader/>
        </div>
      );
      break;

    default:
      content = (
        <div className={style.wrapper}>
          <div
            id={idBox}
            className={style.default}
          >
            <div className={style.cont}>
              <i className={style.arrow}></i>
              <div className={style.desc}>
                {description}
              </div>
              <span className={style.browse}>{browse}</span>
            </div>
            <input
              type='file'
              className={style.inputFile}
              onChange={onLoad}
              onDragenter={() => {
                document.getElementById(idBox).classList.add(style.dropping);
              }}
              onDrop={() => {
                document.getElementById(idBox).classList.remove(style.dropping);
              }}
              onDragleave={() => {
                document.getElementById(idBox).classList.remove(style.dropping);
              }}
            />
          </div>
        </div>
      );
  }

  return content;
};

BrandUploadBox.validate = createValidate(conditions);
export default BrandUploadBox;
