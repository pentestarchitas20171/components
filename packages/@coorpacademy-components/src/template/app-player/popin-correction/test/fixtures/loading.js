export default {
  props: {
    header: {},
    question: {
      header: '',
      answer: ''
    },
    resources: {
      title: 'Voir le cours',
      value: [],
      open: false,
      onClick: () => {}
    },
    klf: {
      title: 'Point clés',
      value: '',
      onClick: () => {},
      open: false
    },
    tips: {
      title: 'Le saviez vous',
      value: '',
      onClick: () => {},
      open: false
    }
  }
};
