import createCatalogueCard from '../../molecule/catalogue-card';
import { checker, createValidate } from '../../../util/validation';
import style from './catalogue-cards.css';

const conditions = checker.shape({
  props: checker.shape({
    products: checker.array
  }),
  children: checker.none
});

export default (engine, options) => {
  const {h} = engine;
  const CatalogueCard = createCatalogueCard(engine, options);

  const CatalogueCards = (props, children) => {
    const products = props.products.map(product => (
      <CatalogueCard
        product = {product}
      >
      </CatalogueCard>
    ));

    return (
      <ul className={style['category-list']}>
        {products}
      </ul>
    );
  };

  CatalogueCards.validate = createValidate(conditions);
  return CatalogueCards;
};