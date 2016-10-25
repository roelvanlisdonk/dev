import { div, getVirtualDom, IVirtualDomNode, span } from './services/virtual.dom'
import { render } from './services/dom'

const body = document.querySelector('body');

const bodyVirtualDom = getVirtualDom(body);
bodyVirtualDom.childNodes = [
    div({ text: 'my test'})
];

render(body, bodyVirtualDom);



// const childs = div(
//     div(),
//     span()
// );
// div({ text: 'Dit is mijn tekst' })

//      const result = 
//      div({ class: [container], childs: [
//          div({ class: [label], text: resources.infoOnCars, deps: [])
//          button({ class: [action-button], text: resources.save, onclick: fn, deps: [])
//      ], deps: []});


// Update dom
// const body = document.createElement('body');
// const element = document.createElement('div');
// element.appendChild(document.createTextNode('Test !!!'));
// body.appendChild(element);

// const html = document.childNodes[1];
// html.appendChild(body);

