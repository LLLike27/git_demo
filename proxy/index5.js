const dom = new Proxy({}, {
    get(target, property) {
      return function(attrs = {}, ...children) {
        const el = document.createElement(property);
        for (let prop of Object.keys(attrs)) {
          el.setAttribute(prop, attrs[prop]);
        }
        for (let child of children) {
        //   if (typeof child === 'string') {
        //     child = document.createTextNode(child);
        //   }
        if (typeof child !== 'object' || !(child instanceof Node)) {
            child = document.createTextNode(child.toString());
          }
          el.appendChild(child);
        }
        return el;
      }
    }
  });
  const el = dom.div({},
    'Hello, my name is ',
    dom.a({href: '//example.com',class:'a_active'}, 'Mark'),
    '. I like:',
    dom.ul({},
      dom.li({}, 'The web'),
      dom.li({}, 'Food'),
      dom.li({}, '…actually that\'s it'),
      dom.li({}, 10086),
    )
  );
  document.body.appendChild(el);