import React from 'react';
import ReactDOM from 'react-dom';
import { Wrapper } from './Wrapper';

class GraphQLExplorer {
  constructor() {}

  initialize(context) {
    const div = document.createElement('div');

    ReactDOM.render(
      <Wrapper
        context={context}
      />
    ,div);
    context.app.createPanel(div);

    // context.app.createAction({
    //   title: 'Test',
    //   execute(state) {
    //     alert('First');
    //     alert(`Found me!. query: ${state.query}`);
    //   }
    // });
  }

  async destroy() {}
}

// Add the class to the Altair plugins object
window.AltairGraphQL.plugins.GraphQLExplorer = GraphQLExplorer;
