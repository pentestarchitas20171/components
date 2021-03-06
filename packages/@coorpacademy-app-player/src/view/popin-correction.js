import PopinCorrection from '@coorpacademy/components/es/template/app-player/popin-correction';
import mapStateToProps from './state-to-props/popin-correction';
import createView from './create-view';

const createPopinCorrection = createView(PopinCorrection, mapStateToProps);

export default createPopinCorrection;
