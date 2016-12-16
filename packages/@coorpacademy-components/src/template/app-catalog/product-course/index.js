import Inferno from 'inferno';
import identity from 'lodash/fp/identity';
import {checker, createValidate} from '../../../util/validation';
import DisciplineHeader from '../../../molecule/discipline-header';
import DisciplineScope from '../../../molecule/discipline-scope';
import DisciplineRightaside from '../../../organism/discipline-rightaside';
import CatalogCards from '../../../organism/catalog-cards';
import layout from '../layout.css';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    popularity: checker.number.optional,
    maxPopularity: checker.number.optional,
    title: checker.string.optional,
    description: checker.string.optional,
    image: checker.shape({
      '1x': checker.url.optional,
      '2x': checker.url.optional
    }).optional,
    video: checker.shape({
      type: checker.oneOf(['vimeo', 'youtube']),
      id: checker.string
    }).optional,
    linkBuy: checker.string.optional,
    linkTry: checker.string.optional,
    author: checker.shape({
      name: checker.string,
      socialLinks: checker.array
    }).optional,
    relatedDisciplines: checker.oneOfType([checker.arrayOf(checker.object), checker.null]).optional,
    level: checker.object.optional,
    levels: checker.arrayOf(checker.string).optional,
    selected: checker.number.optional,
    changeLevel: checker.func.optional
  }),
  children: checker.none
});

const ProductCourse = ({children, ...props}, {translate}) => {
  const cardsTitle = translate('They also liked:');
  const {
    selected = 0,
    level,
    levels,
    changeLevel,
    linkBuy,
    linkTry,
    maxPopularity,
    relatedDisciplines = null,
    image,
    title = '',
    video,
    author = {name: '', socialLinks: []},
    description = '',
    popularity = 0
  } = props;

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <DisciplineHeader
          image={image}
          video={video}
          title={title}
          description={description}
        />
      </div>
      <div className={style.colContainer}>
        <DisciplineRightaside
          linkBuy={linkBuy}
          linkTry={linkTry}
          author={author}
          rating={popularity}
          maxRating={maxPopularity}
        />
      </div>
      <div
        className={style.contentContainer}
      >
        <DisciplineScope
          content={level}
          levels={levels}
          selected={selected}
          onClick={changeLevel}
        />
      </div>
      <div className={layout.container}>
        <span className={layout.cardsTitle}>
          {cardsTitle}
        </span>
        <CatalogCards
          products={relatedDisciplines}
        />
      </div>
    </div>
  );
};

ProductCourse.validate = createValidate(conditions);
export default ProductCourse;
