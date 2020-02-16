import 'document-register-element';
// import React, { createFactory } from 'react';
//import ReactWebComponent from 'react-web-component';
// import ReactDOM from 'react-dom';
// import { buildSchema } from 'graphql';
import { Wrapper } from './Wrapper';

import /*ReactiveElements,*/ { registerReact } from 'reactive-elements';
// import { register } from 'web-react-components';

// register(Wrapper, 'zzart-x', [
//   'props'
// ]);

registerReact('altair-graphql-plugin-graphql-explorer-element', Wrapper);
// ReactWebComponent.create(<Wrapper />, 'x-qwasezio');

// function defineElement(Component, elementName, observedAttributes) {
//   class CustomElement extends HTMLElement {
//     constructor(...args) {
//       super(...args);
//       console.log('XXXX', this);
//       this.proxy = new Proxy(this, {
//         get(target, prop) {
//           console.log('XXXX::', prop);
//           return target[prop];
//         },
//         set(target, prop, val) {
//           console.log('XXXXXX', prop);
//           if (this.observedAttributes.includes(prop)) {
//             this.attributeChangedCallback(prop, target[prop], val);
//             target[prop] = val;
//           }
//         }
//       });
//     }
//     connectedCallback() {
//       const customElement = this;
//       const shadowRoot = this.attachShadow({mode: 'open'});
//       const props = [...this.attributes].reduce((props, attribute) => ({...props, [attribute.name]: attribute.value }),
//         {customElement, shadowRoot});

//       const instance =(<Component {...(props)}/>);

//       ReactDOM.render(instance, shadowRoot);

//       this.instance = instance;
//       this.props = props;
//     }
//     attributeChangedCallback(name, oldValue, newValue) {

//       console.log('XXXXX', name, oldValue, newValue);
//       const { shadowRoot, instance, props } = this;
//       if(!instance) return;

//       const newProps = {...(this.props), ...({[name]: newValue})};
//       const newInstance =(<Component {...(newProps)}/>);

//       ReactDOM.render(newInstance, shadowRoot);

//       this.instance = newInstance;
//       this.props = newProps;
//     }
//   }
//   CustomElement.observedAttributes = observedAttributes;

//   window.customElements.define(elementName, CustomElement);
// }

// defineElement(Wrapper, 'x-qwasezio', ['query', 'schema']);


// class XSearch extends HTMLElement {
//     // static get properties() {
//     //     return {
//     //         schema: Object
//     //     };
//     // }
//   connectedCallback() {
//     const mountPoint = document.createElement('span');
//     this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

//     const name = this.getAttribute('name');
//       const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
//       const schema = buildSchema(`
//         type Query {
//             hello: String
//         }
//         type Mutation
//         type Subscription
//       `);
//       const query = `{ hello }`;
//       const noop = () => {};
//       this._upgradeProperty('schema');
//       console.log(this.schema, this.attributes, this);
//     ReactDOM.render(
//         <GraphiQLExplorer
//           schema={schema}
//           query={query}
//           onEdit={noop}
//           explorerIsOpen={true}
//           onToggleExplorer={noop}
//         />
//     , mountPoint);
//   }
//     _upgradeProperty(prop) {
//       if (this.hasOwnProperty(prop)) {
//           console.log('has prop', prop);
//         let value = this[prop];
//         delete this[prop];
//         this[prop] = value;
//       }
//     }
// }
// customElements.define('x-qwasezio', XSearch);

