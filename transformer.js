const traverser = require('./traverser');

function transformer(ast) {
  // generate new abstract syntax tree
  let newAst = {
    type: 'Program',
    body: []
  };
  ast._context = newAst.body;
  traverser(ast, {
    Identifier: {
      enter: function(node, parent) {
        parent._context.push({
          type: 'Identifier',
          value: node.value
        });
      }
    },
    ArrowFunctionExpression: {
      enter: function (node, parent) {

        let expression = {
          type: 'FunctionExpression',
          params: [],
          body: []
        };

        node._context = expression.params;
        parent._context.push(expression);
      }
    }
  });
  return newAst;
}

module.exports = transformer;
