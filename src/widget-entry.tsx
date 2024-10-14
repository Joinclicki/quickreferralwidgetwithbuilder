import React from 'react';
import ReactDOM from 'react-dom/client';
import Widget from './components/Widget';

class ClickiWidget {
  constructor(config) {
    const container = document.getElementById('clicki-widget-container');
    if (container) {
      ReactDOM.createRoot(container).render(
        <React.StrictMode>
          <Widget {...config} />
        </React.StrictMode>
      );
    } else {
      console.error('Clicki widget container not found');
    }
  }
}

window.ClickiWidget = ClickiWidget;
