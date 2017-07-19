import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';
import isNil from 'lodash/fp/isNil';
import join from 'lodash/fp/join';
import {
  getCurrentCorrection,
  getCurrentProgression,
  getCurrentProgressionId,
  getPreviousSlide,
  getResourcesToPlay
} from '../../utils/state-extract';
import buildResourcesBrowser from '../../utils/build-resources-browser';
import {toggleAccordion} from '../../actions/ui/corrections';
import {selectProgression} from '../../actions/ui/progressions';

const popinCorrectionStateToProps = ({translate}, {dispatch}) => state => {
  const progressionId = getCurrentProgressionId(state);
  const resetProgression = () => dispatch(selectProgression(progressionId));
  const toggleAccordionSection = sectionId => dispatch(toggleAccordion(sectionId));
  const slide = getPreviousSlide(state);
  const progression = getCurrentProgression(state);
  const accordion = get('ui.corrections.accordion', state);
  const answerResult = getCurrentCorrection(state);
  const correctAnswer = get('correctAnswer', answerResult) || [];
  const corrections = get('corrections', answerResult) || [];
  const isCorrect = isNil(answerResult) ? null : get('state.isCorrect')(progression);
  const isLoading = isNil(isCorrect);
  const resourcesToPlay = getResourcesToPlay(state);

  const header = isNil(answerResult)
    ? {}
    : {
        title: translate(isCorrect ? 'Good job' : 'Ouch'),
        subtitle: translate(isCorrect ? 'Good answer' : 'Wrong answer'),
        fail: isLoading ? null : !isCorrect,
        lives: progression.state.lives
      };

  const question = {
    header: getOr('', 'question.header', slide),
    answerPrefix: translate('Correct answer'),
    answer: join(', ', correctAnswer)
  };

  const resourcesBrowser = buildResourcesBrowser({dispatch, translate, slide, resourcesToPlay});

  return {
    header: isLoading
      ? {}
      : {
          lives: 1,
          title: '',
          subtitle: '',
          corrections,
          cta: {
            title: translate('Next'),
            onClick: resetProgression
          },
          ...header
        },
    question,
    resources: {
      title: translate('Access the lesson'),
      value: resourcesBrowser,
      open: getOr(false, '0', accordion)
    },
    klf: {
      title: translate('Key point'),
      value: getOr('', 'klf', slide),
      open: getOr(false, '1', accordion)
    },
    tips: {
      title: translate('Did you know that?'),
      value: getOr('', 'tips', slide),
      open: getOr(false, '2', accordion)
    },
    onClick: toggleAccordionSection
  };
};

export default popinCorrectionStateToProps;
