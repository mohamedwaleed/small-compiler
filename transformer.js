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
          body: {}
        };

        node._context = expression.params;
        node._body = expression.body;
        parent._context.push(expression);
      }
    },
    BlockStatement: {
      enter: function (node, parent) {
        if(parent.type === 'ArrowFunctionExpression') {
          let blockStatementExpression = {
            type: 'BlockStatement',
            body: []
          };

          node._context = blockStatementExpression.body;
          parent._body.type = blockStatementExpression.type;
          parent._body.body = blockStatementExpression.body;
        }
      }
    }
  });
  return newAst;
}

module.exports = transformer;
