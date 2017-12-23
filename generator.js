
function generator(node) {

  switch (node.type) {
    case 'Program':
      return node.body.map(generator).join('\n');
    case 'FunctionExpression':
        return `function(${node.params.map(generator)}){\n\n}`;
    case 'Identifier':
      return node.value;
    default:
        throw new TypeError(node.type);
  }
}

module.exports = generator;
