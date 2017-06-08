// @flow
import {type Slide} from '../../types';

const slides: Array<Slide> = [
  {
    ref: '1.A1.1',
    chapter_id: '1.A1',
    question: {
      type: 'qcm',
      header: "Qu'est-ce que le Knowledge Graph de Google ?",
      explanation: 'Sélectionnez la bonne réponse.',
      content: {
        maxTypos: null,
        answers: [['foo', 'bar']],
        choices: [
          {
            label: 'Une invention prometteuse, mais abandonnée en 2002\n',
            value: 'discipline_1.module_avance.chapter_1.slide_1.choice1',
            _id: '590b862e2e967f64333ad463',
            items: [],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          },
          {
            label: 'Un test de QI développé par le moteur de recherche',
            value: 'discipline_1.module_avance.chapter_1.slide_1.choice2',
            _id: '590b862e2e967f64333ad462',
            items: [],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          },
          {
            label: "Un nouvel outil pour enrichir le résultat d'une requête",
            value: 'discipline_1.module_avance.chapter_1.slide_1.choice3',
            _id: '590b862e2e967f64333ad461',
            items: [],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          },
          {
            label: 'Un graphique à télécharger et à colorier',
            value: 'discipline_1.module_avance.chapter_1.slide_1.choice4',
            _id: '590b862e2e967f64333ad460',
            items: [],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          }
        ],
        media: {
          subtitles: [],
          posters: [],
          src: []
        }
      },
      medias: []
    }
  },
  {
    ref: '1.A1.2',
    chapter_id: '1.A1',
    question: {
      type: 'qcmDrag',
      header: "Quels types d'éléments peut-on trouver dans la fenêtre relative au Knowledge Graph ?",
      explanation: 'Déplacez les bonnes réponses dans la colonne de droite.',
      content: {
        matchOrder: false,
        maxTypos: null,
        answers: [['bar', 'foo']],
        choices: [
          {
            label: 'Des photos',
            value: 'discipline_1.module_avance.chapter_1.slide_2.choice1',
            _id: '590b862e2e967f64333ad469',
            items: [],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          },
          {
            label: 'Des bannières publicitaires',
            value: 'discipline_1.module_avance.chapter_1.slide_2.choice2',
            _id: '590b862e2e967f64333ad468',
            items: [],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          },
          {
            label: 'Des recherches associées',
            value: 'discipline_1.module_avance.chapter_1.slide_2.choice3',
            _id: '590b862e2e967f64333ad467',
            items: [],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          },
          {
            label: 'Une date de naissance',
            value: 'discipline_1.module_avance.chapter_1.slide_2.choice4',
            _id: '590b862e2e967f64333ad466',
            items: [],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          },
          {
            label: 'La liste des courses à faire',
            value: 'discipline_1.module_avance.chapter_1.slide_2.choice5',
            _id: '590b862e2e967f64333ad465',
            items: [],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          }
        ],
        media: {
          subtitles: [],
          posters: [],
          src: []
        }
      },
      medias: []
    }
  },
  {
    ref: '1.A1.3',
    chapter_id: '1.A1',
    question: {
      type: 'qcm',
      header: 'En enrichissant ses résultats, Google cherche aussi à…\n',
      explanation: 'Sélectionnez la bonne réponse dans la liste déroulante.',
      content: {
        matchOrder: false,
        template: '{{sel11921}}',
        maxTypos: null,
        choices: [
          {
            name: 'sel11921',
            label: ' ',
            type: 'select',
            _id: '590b862e2e967f64333ad46b',
            items: [
              {
                text: 'Être le leader des moteurs de recherche',
                value: 'discipline_1.module_avance.chapter_1.slide_3.choice1',
                _id: '590b862e2e967f64333ad46e'
              },
              {
                text: 'Vendre plus de publicité',
                value: 'discipline_1.module_avance.chapter_1.slide_3.choice2',
                _id: '590b862e2e967f64333ad46d'
              },
              {
                text: 'En savoir plus sur ses clients',
                value: 'discipline_1.module_avance.chapter_1.slide_3.choice3',
                _id: '590b862e2e967f64333ad46c'
              }
            ],
            media: {
              subtitles: [],
              posters: [],
              src: []
            }
          }
        ],
        media: {
          subtitles: [],
          posters: [],
          src: []
        },
        answers: []
      },
      medias: []
    }
  },
  {
    ref: '1.A1.4',
    chapter_id: '1.A1',
    question: {
      type: 'qcm',
      header: "Quelle proportion du volume d'une page de résultats occupe le Knowledge Graph ?",
      explanation: 'Faites glisser le curseur.',
      content: {
        id: 'discipline_1.module_avance.chapter_1.slide_4.title',
        min: 0,
        max: 100,
        defaultValue: 0,
        unitLabel: '%\n',
        maxTypos: null,
        choices: [],
        media: {
          subtitles: [],
          posters: [],
          src: []
        },
        answers: []
      },
      medias: []
    }
  }
];

export default slides;
