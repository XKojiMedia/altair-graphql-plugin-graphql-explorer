import { PluginV3 } from "altair-graphql-core/build/plugin/v3/plugin";
import { PluginV3Context } from "altair-graphql-core/build/plugin/v3/context";
import "./index.css";
import { GraphQLExplorerPanel } from "./panel";

class GraphQLExplorer extends PluginV3 {
  constructor() {
    super({
      panels: {
        "graphql-explorer": new GraphQLExplorerPanel(),
      },
    });
  }

  async initialize(ctx: PluginV3Context) {
    console.log("PLUGIN initialize", ctx);
    console.log("PLUGIN isElectron", await ctx.getCurrentWindowState());
    ctx.on("query.change", (x) => {
      console.log("PLUGIN query.change", x);
    });
    const panelId = await ctx.createPanel("graphql-explorer");
    if (panelId) {
      // setTimeout(() => {
      //   ctx.destroyPanel(panelId);
      // }, 1000 * 60);
    }
    // const actionId1 = await ctx.createAction({
    //   title: "Test 1",
    //   execute(state) {
    //     console.log("PLUGIN Found me!", state);
    //   },
    // });
    // if (actionId1) {
    //   setTimeout(() => {
    //     ctx.destroyAction(actionId1);
    //   }, 1000 * 60);
    // }
    // const div = document.createElement("div");

    // ReactDOM.render(<Wrapper context={ctx} />, div);
    // ctx.app.createPanel(div);

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
console.log("GraphQLExplorer loaded!");
new GraphQLExplorer();
