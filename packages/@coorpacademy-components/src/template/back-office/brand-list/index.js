import React from 'react';
import {checker, createValidate} from '../../../util/validation';
import GridList from '../../../organism/grid-list';
import BrandCard from '../../../molecule/brand-card';
import BrandCardCreate from '../../../molecule/brand-card-create';
import Layout from '../layout';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    brands: checker.arrayOf(checker.shape({
      title: checker.string,
      edit: checker.string,
      editHref: checker.string,
      see: checker.string,
      seeHref: checker.string,
      image: checker.string
    })).optional,
    create: checker.shape({
      edit: checker.string,
      editHref: checker.string
    })
  }),
  children: checker.none
});

const BrandList = Layout((props, children) => {
  const {
    brands,
    create
  } = props;

  const brandCards = brands.map(brand => {
    return (
      <div className={style.brand}>
        <BrandCard {...brand}/>
      </div>
    );
  });

  if (create) {
    brandCards.push(
      <div className={style.brand}>
        <BrandCardCreate {...create} />
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <GridList>
          {brandCards}
        </GridList>
      </div>
    </div>
  );
});

BrandList.validate = createValidate(conditions);
export default BrandList;
