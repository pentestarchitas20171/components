import test from 'ava';
import forEach from 'lodash/fp/forEach';
import identity from 'lodash/fp/identity';
import isArray from 'lodash/fp/isArray';
import isFunction from 'lodash/fp/isFunction';
import set from 'lodash/fp/set';
import {UI_TOGGLE_ACCORDION, selectResource} from '../../actions/ui/corrections';
import createMapStateToProps from '../popin-correction';
import statePopinFailure from './fixtures/popin-correction/popin-failure';
import statePopinSuccess from './fixtures/popin-correction/popin-success';
import testRendering from './helpers/render';

const translate = key => `__${key}`;
const commonOptions = {
  translate
};

const mapStateToProps = createMapStateToProps(commonOptions, {dispatch: identity});

test('should set properties for success popin', t => {
  const vNode = mapStateToProps(statePopinSuccess);
  testRendering(vNode);
  const {props} = vNode;

  t.is(props.header.lives, 1);
  t.false(props.header.fail);
  t.is(props.header.title, '__Good job');
  t.is(props.header.subtitle, '__Good answer');
  t.is(props.question.answer, '__Correct answer {{answer}}');
  t.false(props.resources.open);
  t.false(props.klf.open);
  t.true(props.tips.open);

  const resetHandler = props.header.cta.onClick;
  t.true(isFunction(resetHandler));
  const actionReset = resetHandler();
  t.true(isFunction(actionReset));

  const toggleAccordionHandler = props.onClick;
  t.true(isFunction(toggleAccordionHandler));
  const actionToggleAccordion = toggleAccordionHandler(0);
  t.deepEqual(actionToggleAccordion, {
    type: UI_TOGGLE_ACCORDION,
    payload: {id: 0}
  });
});

test('should set properties to open resource tab if wrong answer and no resource viewed', t => {
  const vNode = mapStateToProps(statePopinFailure);
  testRendering(vNode);
  const {props} = vNode;

  t.is(props.header.lives, 0);
  t.true(props.header.fail);
  t.is(props.header.title, '__Ouch');
  t.is(props.header.subtitle, '__Wrong answer');
  t.is(props.question.answer, '__Correct answer {{answer}}');
  t.true(props.resources.open);
  t.false(props.klf.open);
  t.false(props.tips.open);

  const resources = props.resources.value;

  t.true(isArray(resources));
  t.is(resources.length, 2);
  t.true(resources[0].selected);
  t.false(resources[1].selected);

  forEach(resource => {
    const {onClick} = resource;
    const actionSelectRessource = onClick();
    t.deepEqual(selectResource(resource._id), actionSelectRessource);
  }, resources);
});

test('should set properties when selecting second resource', t => {
  const vNode = mapStateToProps(
    set('ui.corrections.playResource', '590b862e2e967f64333ad4fc', statePopinFailure)
  );
  testRendering(vNode);
  const {props} = vNode;

  t.is(props.header.lives, 0);
  t.true(props.header.fail);
  t.is(props.header.title, '__Ouch');
  t.is(props.header.subtitle, '__Wrong answer');
  t.is(props.question.answer, '__Correct answer {{answer}}');
  t.true(props.resources.open);
  t.false(props.klf.open);
  t.false(props.tips.open);

  const resources = props.resources.value;

  t.true(isArray(resources));
  t.is(resources.length, 2);
  t.false(resources[0].selected);
  t.true(resources[1].selected);
});

test('should display loading when correction is not still fetched', t => {
  const statePopinLoading = set('data.answers.entities.0.sli_Vy88~R-bX', null, statePopinSuccess);

  const vNode = mapStateToProps(statePopinLoading);
  testRendering(vNode);
  const {props} = vNode;

  t.deepEqual(props.header, {});
  t.is(props.question.answer, '__Correct answer {{answer}}');
  t.false(props.resources.open);
  t.false(props.klf.open);
  t.true(props.tips.open);
});

test("should display loading state when answer's result is not still received", t => {
  const statePopinLoading = set(
    'data.progressions.entities.0.state.isCorrect',
    null,
    statePopinSuccess
  );

  const vNode = mapStateToProps(statePopinLoading);
  testRendering(vNode);
  const {props} = vNode;

  t.deepEqual(props.header, {});
  t.is(props.question.answer, '__Correct answer {{answer}}');
  t.false(props.resources.open);
  t.false(props.klf.open);
  t.true(props.tips.open);
});

test('should display correction view when slide has not ressources', t => {
  const statePopinWithoutRessources = set(
    ['data', 'slides', 'entities', '1.B2.4', 'lessons'],
    [],
    statePopinFailure
  );
  const vNode = mapStateToProps(statePopinWithoutRessources);
  testRendering(vNode);
  const {props} = vNode;

  t.true(props.resources.open);
  t.false(props.klf.open);
  t.false(props.tips.open);

  const resources = props.resources.value;

  t.true(isArray(resources));
  t.is(resources.length, 0);
});