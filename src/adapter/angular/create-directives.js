'use strict';

import mapKeys from 'lodash/fp/mapKeys';

const linkWithEngine = (engine) => (component, $rootScope, scope, element) => {
  const update = engine.render(element[0]);

  const refresh = () => {
    const props = scope.props();
    const shallowTree = component(props);
    update(shallowTree);
  };

  $rootScope.$on('i18nLanguageChange', function() {
    refresh();
  });

  scope.$watch('watch', function() {
    refresh();
  }, true);

  scope.$on('$destroy', function() {
    window.angular.element(element).remove();
  });
};

const lowerFirstLetter = (string) => {
  return string[0].toLowerCase() + string.slice(-(string.length - 1));
};

const createDirective = (app, engine, componentName, createComponent) => {
  const directive = (config, $rootScope, $i18next) => {
    const options = {
      skin: config.skin,
      translate: $i18next
    };

    const component = createComponent(engine, options);

    const link = (scope, element, attrs) => {
      linkWithEngine(engine)(component, $rootScope, scope, element);
    };

    return {
      restrict: 'E',
      link: link,
      scope: {
        watch: '=',
        props: '&'
      }
    };
  };

  app.directive(componentName, [
    'config',
    '$rootScope',
    '$i18next',
    directive
  ]);
};

/**
 * examples :
 * <slide value="slideContent"></slide>
 * <module-bubble value="modData()"></module-bubble>
 */
const createDirectives = (app, engine, components) => {
  const toDirective = (key) => {
    const isFactory = key.split('create')[1];
    if (!isFactory) return;

    const componentName = lowerFirstLetter(isFactory);
    const createComponent = components[key];
    createDirective(app, engine, componentName, createComponent);
  };

  mapKeys(toDirective, components);
};

export default createDirectives;