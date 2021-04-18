export const render = (element, container) => {
  const dom = element.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(element.type)
  const isProperty = key => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach( prop => {
      dom[prop] = element.props[prop];
    })
  
  element.props.children?.forEach( child => render(child, ))
  container.appendChild(dom)
}