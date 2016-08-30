import identity from 'lodash/fp/identity';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';
import map from 'lodash/fp/map';

import createCenteredText from '../../atom/centered-text';
import createSpinner from '../../atom/spinner';
import createCatalogCard from '../../molecule/catalog-card';
import {checker, createValidate} from '../../util/validation';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    products: checker.arrayOf(checker.object)
  }),
  children: checker.none
});

export default (treant, options = {}) => {
  const {h} = treant;
  const {translate = identity} = options;
  const CenteredText = createCenteredText(treant, options);
  const Spinner = createSpinner(treant, options);
  const CatalogCard = createCatalogCard(treant, options);

  const CatalogCards = ({products}, children) => {
    if (isNil(products))
      return (
        <CenteredText>
          <Spinner/>
        </CenteredText>
      );

    if (isEmpty(products))
      return (
        <CenteredText>
          {translate('Sorry there are no results for your search')}
        </CenteredText>
      );

    const productViews = map(product => (
      <CatalogCard
        product = {product}
      >
      </CatalogCard>
    ), products);

    return (
      <ul className={style['category-list']}>
        {productViews}
      </ul>
    );
  };

  CatalogCards.validate = createValidate(conditions);
  return CatalogCards;
};