// @flow
import test from 'ava';
import type {QCMGraphicQuestion, AcceptedAnswers} from '../types';
import {assertCorrect, assertIncorrect} from './helpers/assert-check-answer-correctness';

const engine = {
  ref: 'microlearning',
  version: 'latest'
};

function createQuestion(answers: AcceptedAnswers): QCMGraphicQuestion {
  return {
    type: 'qcmGraphic',
    content: {
      answers
    }
  };
}

test('should return true when the given answer is in the accepted answers', t => {
  const question = createQuestion([
    ['answer1', 'answer3'],
    ['answer2', 'answer4'],
    ['answer1', 'answer4']
  ]);

  assertCorrect(t, engine, question, ['answer1', 'answer3']);
  assertCorrect(t, engine, question, ['answer2', 'answer4']);
  assertCorrect(t, engine, question, ['answer1', 'answer4']);
});

test('should return true even when the given answer does not have the same case as the accepted answers', t => {
  const question = createQuestion([['answer2']]);

  assertCorrect(t, engine, question, ['ANSWER2']);
});

test('should return true when the given answer is in the accepted answers but values are in a different order', t => {
  const question = createQuestion([
    ['answer1', 'answer3'],
    ['answer2', 'answer4'],
    ['answer1', 'answer4']
  ]);

  assertCorrect(t, engine, question, ['answer3', 'answer1']);
  assertCorrect(t, engine, question, ['answer4', 'answer2']);
  assertCorrect(t, engine, question, ['answer4', 'answer1']);
});

test('should return false when the given answer is not in the accepted answers', t => {
  const question = createQuestion([
    ['answer1', 'answer3'],
    ['answer2', 'answer4'],
    ['answer1', 'answer4']
  ]);

  assertIncorrect(t, engine, question, ['answer2', 'answer1'], [false, true]);
  assertIncorrect(t, engine, question, ['answer1', 'answer2'], [true, false]);
  assertIncorrect(t, engine, question, ['answer3', 'answer4'], [true, false]);
  assertIncorrect(t, engine, question, ['answer5', 'answer4'], [false, true]);
});

test('should return false when the given answer has more elements that the accepted answers', t => {
  const question = createQuestion([
    ['answer1', 'answer3'],
    ['answer2', 'answer4'],
    ['answer1', 'answer4']
  ]);

  assertIncorrect(t, engine, question, ['answer1', 'answer3', 'answer2'], [true, true, false]);
  assertIncorrect(t, engine, question, ['answer1', 'answer5', 'answer3'], [true, false, true]);
});

test('should return false when the given answer has less elements that the accepted answers', t => {
  const question = createQuestion([
    ['answer1', 'answer3'],
    ['answer2', 'answer4'],
    ['answer1', 'answer4']
  ]);

  assertIncorrect(t, engine, question, ['answer1'], [true]);
  assertIncorrect(t, engine, question, ['answer2'], [true]);
  assertIncorrect(t, engine, question, ['answer5'], [false]);
  assertIncorrect(t, engine, question, [], []);
});

test("should return false when the given answer isn't the same but resembles the accepted answers", t => {
  const question = createQuestion([['answer2']]);

  assertIncorrect(t, engine, question, ['answe2r'], [false]);
});
