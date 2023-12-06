// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require){
  var Backbone = require('backbone');
  var OriginView = require('core/views/originView');

  var DebugView = OriginView.extend({
    tagName: 'div',
    className: 'debug',

    initialize: function(options) {
      if (options && options.plugins) {
        this.plugins = options.plugins;
      }
      OriginView.prototype.initialize.apply(this, arguments);
    },

    postRender: function() {
      for(var i = 0, count = this.plugins.length; i < count; i++) {
        var view = new this.plugins[i].view();
        $('.view', this.$el).append(view.$el);
      }
      this.setViewToReady();
    }
  }, {
    template: 'debug'
  });

  return DebugView;
});
