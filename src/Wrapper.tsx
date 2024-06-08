import { useCallback, useEffect, useState } from "react";
import GraphiQLExplorer from "graphiql-explorer";
import {
  ChevronDown,
  ChevronRight,
  Square,
  SquareCheckBig,
} from "lucide-react";
import { buildSchema } from "graphql";
import { PluginV3Context } from "altair-graphql-core/build/plugin/v3/context";
import { PluginWindowState } from "altair-graphql-core/build/plugin/context/context.interface";

const colors = {
  keyword: "var(--editor-keyword-color)",
  // OperationName, FragmentName
  def: "var(--editor-def-color)",
  // FieldName
  property: "var(--editor-property-color)",
  // FieldAlias
  qualifier: "var(--editor-attribute-color)",
  // ArgumentName and ObjectFieldName
  attribute: "var(--editor-attribute-color)",
  number: "var(--editor-number-color)",
  string: "var(--editor-string-color)",
  // Boolean
  builtin: "var(--editor-builtin-color)",
  // Enum
  string2: "var(--editor-string-color)",
  variable: "var(--editor-variable-color)",
  // Type
  atom: "var(--editor-atom-color)",
};

const defaultArrowOpen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
const defaultArrowClosed = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const defaultCheckboxChecked = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "3px" }}
  >
    <polyline points="9 11 12 14 22 4"></polyline>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);

const defaultCheckboxUnchecked = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "3px" }}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  </svg>
);

const maybeBuildSchema = (sdl: string) => {
  let schema;
  if (sdl) {
    try {
      schema = buildSchema(sdl);
    } catch (error) {
      // noop
    }
  }
  return schema;
};

interface AppState {
  [key: string]: PluginWindowState & {
    schema: ReturnType<typeof maybeBuildSchema>;
  };
}

interface WrapperProps {
  context: PluginV3Context;
}
export const Wrapper = ({ context }: WrapperProps) => {
  const [appState, setAppState] = useState<AppState>({});
  const [currentWindowId, setCurrentWindowId] = useState<string>("");
  const noop = (...args: unknown[]) => console.log(...args);
  const onEdit = (query: string) => context.setQuery(currentWindowId, query);
  const setQuery = useCallback(
    ({ windowId, data }: { windowId: string; data: string }) => {
      setAppState((appState) => ({
        ...appState,
        [windowId]: {
          ...appState[windowId],
          query: data,
        },
      }));
    },
    []
  );
  const setSDL = useCallback(
    ({ windowId, data }: { windowId: string; data: string }) => {
      setAppState((appState) => ({
        ...appState,
        [windowId]: {
          ...appState[windowId],
          sdl: data,
          schema: maybeBuildSchema(data),
        },
      }));
    },
    []
  );

  const initializeCurrentWindowState = (state: PluginWindowState) => {
    setCurrentWindowId(state.windowId);
    setAppState((appState) => ({
      ...appState,
      [state.windowId]: {
        ...state,
        schema: maybeBuildSchema(state.sdl),
      },
    }));
  };

  useEffect(() => {
    context.getCurrentWindowState().then((state) => {
      if (!state) {
        return;
      }
      initializeCurrentWindowState(state);
    });

    context.on("query.change", setQuery);

    context.on("sdl.change", setSDL);

    context.on("current-window.change", async ({ windowId }) => {
      const newWindowState = await context.getWindowState(windowId);
      if (!newWindowState) {
        return;
      }
      initializeCurrentWindowState(newWindowState);
    });

    return () => {
      context.off();
    };
  }, [context, setQuery, setSDL]);

  if (!appState[currentWindowId]) {
    return null;
  }

  return (
    <GraphiQLExplorer
      schema={appState[currentWindowId].schema}
      query={appState[currentWindowId].query}
      onEdit={(query) => onEdit(query)}
      explorerIsOpen={true}
      onToggleExplorer={noop}
      colors={colors}
      arrowClosed={
        <ChevronRight size={15} style={{ marginRight: "3px" }} /> ??
        defaultArrowClosed()
      }
      arrowOpen={
        <ChevronDown size={15} style={{ marginRight: "3px" }} /> ??
        defaultArrowOpen()
      }
      checkboxChecked={
        <SquareCheckBig size={15} style={{ marginRight: "3px" }} /> ??
        defaultCheckboxChecked()
      }
      checkboxUnchecked={
        <Square size={15} style={{ marginRight: "3px" }} /> ??
        defaultCheckboxUnchecked()
      }
    />
  );
};
