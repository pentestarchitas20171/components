import test from 'ava';
import set from 'lodash/fp/set';
import pipe from 'lodash/fp/pipe';
import {
  getChoices,
  getProgressionId,
  getQuestionType,
  getCurrentProgression,
  getSlide
} from '../state-extract';

test('should getChoices', t => {
  const choices = ['foo', 'bar'];
  const plop = set('question.content.choices', choices, {});
  t.is(getChoices(plop), choices);
});

test('should getProgressionId', t => {
  const progressionId = '1234';
  const plop = set('ui.current.progressionId', progressionId, {});
  t.is(getProgressionId(plop), progressionId);
  t.is(getProgressionId({}), null);
});

test('should getQuestionType', t => {
  const type = 'foo';
  const plop = set('question.type', type, {});
  t.is(getQuestionType(plop), type);
});

test('should getCurrentProgression', t => {
  const progression = {foo: 'bar'};
  const state = pipe(
    set('ui.current.progressionId', '0'),
    set('data.progressions.entities', {'0': progression})
  )({});

  t.is(getCurrentProgression(state), progression);
});

test('should getSlide', t => {
  const slide = {_id: '0'};
  const progression = {state: {nextContent: {ref: '0'}}};
  const state = pipe(
    set('ui.current.progressionId', '0'),
    set('data.progressions.entities', {'0': progression}),
    set('data.slides.entities', {'0': slide})
  )({});

  t.is(getSlide(state), slide);
});