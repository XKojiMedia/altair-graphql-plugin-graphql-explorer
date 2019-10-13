import React, { Component } from 'react';
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

export class Wrapper extends Component {
  static defaultProps = {
    sdl: '',
    query: '{ yo }',
  };
  state = {
    schema: null
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log('XXXX', 'mounted');
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps &&
      newProps.sdl &&
      (!this.props.sdl || newProps.sdl.length !== this.props.sdl.length)
    ) {
      // console.log('XXXX', 'building schema', newProps, this.props);
      this.setState({ schema: buildSchema(newProps.sdl) });
    }
  }

  render() {
    const { query } = this.props;
    const noop = (...args) => console.log(...args);
    const { schema } = this.state;

    // console.log(this.schema);

    return (
      <GraphiQLExplorer
        schema={schema}
        query={query}
        onEdit={(query) => this.onEdit(query)}
        explorerIsOpen={true}
        onToggleExplorer={noop}
        colors={colors}
      />
    );
  }

  onEdit(query) {
    const { ctx } = this.props;

    ctx.setQuery(query);
  }
}
