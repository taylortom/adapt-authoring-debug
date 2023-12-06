// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
  var Origin = require('core/origin');
  var DebugView = require('./views/debugView');

  var FEATURE_NAME = 'debug';
  var FEATURE_PERMISSIONS = ["debug"];
  var plugins = [];

  Origin.on(`globalMenu:${FEATURE_NAME}:open`, function() {
    Origin.router.navigateTo(FEATURE_NAME);
  });

  Origin.on(`router:${FEATURE_NAME}`, function(location, subLocation, action) {
    Origin.trigger('location:title:update', { title: Origin.l10n.t(`app.${FEATURE_NAME}`) });
    Origin.trigger('sidebar:sidebarContainer:hide');
    Origin.contentPane.setView(DebugView, { plugins });

  });

  Origin.on(`${FEATURE_NAME}:addView`, function(pluginData) {
    plugins.push(pluginData);
  });

  Origin.on('origin:dataReady login:changed', function() {
    Origin.router.restrictRoute(FEATURE_NAME, FEATURE_PERMISSIONS);
    if (Origin.sessionModel.hasScopes(FEATURE_PERMISSIONS)) {
      Origin.globalMenu.addItem({
        "location": "global",
        "text": Origin.l10n.t(`app.${FEATURE_NAME}`),
        "icon": "fa-bug",
        "callbackEvent": `${FEATURE_NAME}:open`
      });
      Origin.trigger(`${FEATURE_NAME}:ready`);
    }
  });
});
