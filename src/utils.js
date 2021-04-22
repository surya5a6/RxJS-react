export function render(element, container) {
  if (typeof element.type === "function") element = element.type();
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  const isProperty = key => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name];
    });
  // eslint-disable-next-line
  element.props.children?.forEach(child => render(child, dom));                            
  container.appendChild(dom);
}

// JSX
export function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
}

// RENDER-AND-COMMIT
// git commit
const noop = () => {};
export function performUnitOfWork(fiber, resetWipFiber = noop) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    // it is either a function component... (so call it)
    resetWipFiber(fiber);
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children.flat());
  } else {
    // or a host component... (so createDom)
    if (!fiber.dom) fiber.dom = createDom(fiber);
    reconcileChildren(fiber, fiber.props.children.flat());
  }
  if (fiber.child) return fiber.child;
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}