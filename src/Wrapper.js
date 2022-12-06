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
      arrowClosed={
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      }
      arrowOpen={
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      }
      checkboxChecked={
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{marginRight: '3px'}}>
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      }
      checkboxUnchecked={
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{marginRight: '3px'}}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        </svg>
      }
    />
  );
};
