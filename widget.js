// Clicki Widget Loader
window.initClickiWidget = function(config) {
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'clicki-widget-container';
  document.body.appendChild(widgetContainer);

  const script = document.createElement('script');
  script.src = 'https://quickreferralwidgetwithbuilder.vercel.app/widget-bundle.js';
  script.async = true;
  script.onload = function() {
    if (typeof ClickiWidget !== 'undefined') {
      new ClickiWidget(config);
    } else {
      console.error('ClickiWidget failed to load');
    }
  };
  document.body.appendChild(script);
};
