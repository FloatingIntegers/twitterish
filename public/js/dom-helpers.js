// eslint-disable-next-line no-unused-vars
const createDomHelpers = (document) => {
  const removeChildren = (parentElement) => {
    Array.from(parentElement.childNodes).forEach(childElement => {
      parentElement.removeChild(childElement);
    });
  };

  const addChildren = (childContents, parentElement, elemType = 'div') => {
    childContents.forEach(childContent => {
      const childElement = document.createElement(elemType);
      const childContentElement = document.createTextNode(childContent);
      childElement.appendChild(childContentElement);
      parentElement.appendChild(childElement);
    });
  };

  return {
    removeChildren,
    addChildren,
  };
};
