// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require){
  var OriginView = require('core/views/originView');

  var DebugView = OriginView.extend({
    tagName: 'div',
    className: 'debug',

    initialize: function(options) {
      this.plugins = options && options.plugins || [];
      OriginView.prototype.initialize.apply(this, arguments);
    },

    postRender: function() {
      $('.nav button', this.$el).click(this.onNavClicked)
      this.setViewToReady();
    },

    onNavClicked: function(e) {
      alert($(e.currentTarget).attr('data-name'))
    }
  }, {
    template: 'debug'
  });

  return DebugView;
});
