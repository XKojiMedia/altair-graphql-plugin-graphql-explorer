import React, { useCallback, useEffect, useState } from 'react';
import GraphiQLExplorer from 'graphiql-explorer';
import { buildSchema } from 'graphql';
import './wrapper.css';

const colors = {
  keyword: 'var(--editor-keyword-color)',
  // OperationName, FragmentName
  def: 'var(--editor-def-color)',
  // FieldName
  property: 'var(--editor-property-color)',
  // FieldAlias
  qualifier: 'var(--editor-attribute-color)',
  // ArgumentName and ObjectFieldName
  attribute: 'var(--editor-attribute-color)',
  number: 'var(--editor-number-color)',
  string: 'var(--editor-string-color)',
  // Boolean
  builtin: 'var(--editor-builtin-color)',
  // Enum
  string2: 'var(--editor-string-color)',
  variable: 'var(--editor-variable-color)',
  // Type
  atom: 'var(--editor-atom-color)',
};

const buildSchemaNullable = (sdl) => {
  let schema = null;
  if (sdl) {
    try {
      schema = buildSchema(sdl);
    } catch(error) {}
  }
  return schema;
};

export const Wrapper = ({ context }) => {
  const [ appState, setAppState ] = useState({});
  const [ currentWindowId, setCurrentWindowId ] = useState(null);
  const noop = (...args) => console.log(...args);
  const onEdit = (query) => context.app.setQuery(currentWindowId, query);
  const setQuery = useCallback(({ windowId, data }) => {
    setAppState((appState) => ({
      ...appState,
      [windowId]: {
        ...appState[windowId],
        query: data,
      }
    }));
  }, []);
  const setSDL = useCallback(({ windowId, data }) => {
    setAppState((appState) => ({
      ...appState,
      [windowId]: {
        ...appState[windowId],
        sdl: data,
        schema: buildSchemaNullable(data),
      }
    }));
  }, []);

  const initializeCurrentWindowState = (state) => {
    setCurrentWindowId(state.windowId);
    setAppState((appState) => ({
      ...appState,
      [state.windowId]: {
        ...state,
        schema: buildSchemaNullable(state.sdl),
      },
    }));
  };

  useEffect(() => {
    context.app.getCurrentWindowState().then(state => {
      initializeCurrentWindowState(state);
    });

    context.events.on('query.change', setQuery);

    context.events.on('sdl.change', setSDL);

    context.events.on('current-window.change', async({ windowId }) => {
      const newWindowState = await context.app.getWindowState(windowId);
      initializeCurrentWindowState(newWindowState);
    });

    return () => {
      context.events.off();
    };
  }, [ setQuery, setSDL ]);

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
    />
  );
};
