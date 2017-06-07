import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';

export const getChoices = get('question.content.choices');
export const getCurrentProgressionId = get('ui.current.progressionId');
export const getQuestionType = get('question.type');

export const getProgression = id => state => {
  return get(['data', 'progressions', 'entities', id], state);
};

export const getCurrentProgression = state => {
  const id = getCurrentProgressionId(state);
  return getProgression(id)(state);
};

export const getAnswers = state => {
  const progressionId = getCurrentProgressionId(state);
  return get(['ui', 'answers', progressionId])(state);
};

export const getSlide = id => state => {
  const entities = get('data.slides.entities')(state);
  return get(id)(entities);
};

export const getCurrentSlide = state => {
  const id = get('state.nextContent.ref')(getCurrentProgression(state));
  return getSlide(id)(state);
};

export const getExitNode = ref => state => {
  const entities = get('data.exitNodes.entities')(state);
  return get(ref)(entities);
};

export const getCurrentExitNode = state => {
  const ref = get('state.nextContent.ref')(getCurrentProgression(state));
  return getExitNode(ref)(state);
};

export const getCurrentContent = state => {
  const {ref, type} = getOr({}, 'state.nextContent')(getCurrentProgression(state));
  switch (type) {
    case 'slide': {
      return getSlide(ref)(state);
    }
    case 'success':
    case 'failure': {
      return getExitNode(ref)(state);
    }
    default: {
      return null;
    }
  }
};
