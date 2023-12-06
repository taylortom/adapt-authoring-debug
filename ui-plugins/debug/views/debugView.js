// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require){
  const Backbone = require('backbone');
  const OriginView = require('core/views/originView');
  
  const DebugView = OriginView.extend({
    tagName: 'div',
    className: 'debug',
    events: {
      'click .nav button': 'onNavClicked'
    },

    initialize: function(options) {
      this.model = new Backbone.Model({ plugins: options && options.plugins || [] });
      OriginView.prototype.initialize.apply(this, arguments);
    },

    postRender: function() {
      this.setViewToReady();
    },

    onNavClicked: function(e) {
      const name = $(e.currentTarget).attr('data-name');
      const p = this.model.get('plugins').find(p => p.name = name);
      
      this.$('.view').html(new p.view().$el)
    }
  }, {
    template: 'debug'
  });

  return DebugView;
});
