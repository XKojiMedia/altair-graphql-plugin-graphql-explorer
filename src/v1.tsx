import { createRoot } from "react-dom/client";
import { Wrapper } from "./V1Wrapper";
import { PluginContext } from "altair-graphql-core/build/plugin/context/context.interface";

class GraphQLExplorer {
  initialize(context: PluginContext) {
    const div = document.createElement("div");

    const root = createRoot(div);
    root.render(<Wrapper context={context} />);
    context.app.createPanel(div);

    // context.app.createAction({
    //   title: 'Test',
    //   execute(state) {
    //     alert('First');
    //     alert(`Found me!. query: ${state.query}`);
    //   }
    // });

    // context.theme.add('graphql-explorer', {
    //   colors: {
    //     primary: '#88C0D0',
    //     secondary: '#8FBCBB',
    //   },
    // });
    // context.theme.enable('graphql-explorer');
  }

  async destroy() {}
}

// Add the class to the Altair plugins object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).AltairGraphQL.plugins.GraphQLExplorer = GraphQLExplorer;
