import React, { Component } from 'react';
import GraphiQLExplorer from 'graphiql-explorer';
import { buildSchema } from 'graphql';
import './wrapper.css';

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
      />
    );
  }

  onEdit(query) {
    const { ctx } = this.props;

    ctx.setQuery(query);
  }
}
