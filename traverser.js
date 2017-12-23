
function traverser(ast, visitor) {

  function traverseArray(array, parent) {
    array.forEach(child => {
      traversNode(child, parent);
    })
  }
  function traversNode(node, parent) {
      let method = visitor[node.type];

      if(method && method.enter) {
        method.enter(node, parent);
      }
      switch (node.type) {
        case 'Program':
          traverseArray(node.body, node);
          break;
        case 'ArrowFunctionExpression':
          traverseArray(node.params, node);
          traversNode(node.body, node);
          break;
        case 'BlockStatement':
          traverseArray(node.body, node);
          break;
        case 'Identifier':
          break;
        default:
          throw new TypeError(node.type);
      }
      if(method && method.exit) {
        method.exit(node, parent);
      }
  }

  traversNode(ast, null);
}

module.exports = traverser;
