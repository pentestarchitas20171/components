import take from 'lodash/fp/take';
import disciplineHeader from '../../../../../molecule/discipline-header/test/fixtures/default';
import disciplineRightAside from '../../../../../organism/discipline-rightaside/test/fixtures/default';
import disciplineScope from '../../../../../molecule/discipline-scope/test/fixtures/default';
import catalogCards from '../../../../../organism/catalog-cards/test/fixtures/default';

const {title, description, image} = disciplineHeader.props;
const {rating, maxRating, linkBuy, linkTry, author} = disciplineRightAside.props;
const {content, levels} = disciplineScope.props;
const {products} = catalogCards.props;

/* eslint-disable max-len */

export default {
  props: {}
};