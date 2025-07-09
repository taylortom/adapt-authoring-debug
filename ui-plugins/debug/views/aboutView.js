// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require){
  var OriginView = require('core/views/originView');

  var AboutView = OriginView.extend({
    tagName: 'div',
    className: 'about',

    render: async function() {
      const modelData = await $.get('/api/debug/versions')
      const commit = modelData['adapt-authoring'].commit
      if(commit) modelData['adapt-authoring'].commit = commit.slice(0, 7)

      this.model = { toJSON: () => modelData }
      OriginView.prototype.render.apply(this, arguments);
    }
  }, {
    template: 'about'
  });

  return AboutView;
});
