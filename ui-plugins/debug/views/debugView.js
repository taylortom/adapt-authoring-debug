// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require){
  const Backbone = require('backbone');
  const Origin = require('core/origin');
  const OriginView = require('core/views/originView');
  
  const DebugView = OriginView.extend({
    tagName: 'div',
    className: 'debug',
    events: {
      'click .nav-container .nav button': 'onNavClicked'
    },

    initialize: function(options) {
      this.model = new Backbone.Model({ plugins: options && options.plugins || [] });
      OriginView.prototype.initialize.apply(this, arguments);
    },

    postRender: function() {
      this.showPlugin(Origin.location.route1)
      this.setViewToReady();
    },

    showPlugin: function(name) {
      const p = name ?
        this.model.get('plugins').find(p => p.name === name) :
        this.model.get('plugins').at(0);
      this.$('.view-title').text(p.title);
      this.$('.view').html(new p.view().$el);
      this.$('.nav button').prop('disabled', false);
      this.$(`.nav button[data-name=${p.name}]`).prop('disabled', true);
    },

    onNavClicked: function(e) {
      Origin.router.navigateTo(`debug/${$(e.currentTarget).attr('data-name')}`);
    }
  }, {
    template: 'debug'
  });

  return DebugView;
});
