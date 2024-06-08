import { createRoot } from "react-dom/client";
import { PluginV3Context } from "altair-graphql-core/build/plugin/v3/context";
import { AltairV3Panel } from "altair-graphql-core/build/plugin/v3/panel";
import { Wrapper } from "./Wrapper";

export class GraphQLExplorerPanel extends AltairV3Panel {
  create(ctx: PluginV3Context, container: HTMLElement): void {
    const root = createRoot(container);
    root.render(<Wrapper context={ctx} />);
  }
}
