function parser(tokens) {
  let position = 0;
  function walk() {
    let token = tokens[position ++];
    if((token.type === 'paren' && token.value === '(') || token.type === 'Identifier') {
      let arrowFucntionExepressionNode = {
        type: 'ArrowFunctionExpression',
        params: [],
        body: {}
      };
      while(token.type !== 'Identifier' && tokens[position].type !== 'paren' && tokens[position].value !== ')') {
        arrowFucntionExepressionNode.params.push({
          type: 'Identifier',
          value: tokens[position].value
        });
        position ++;
      }
      if(token.type === 'Identifier') {
        arrowFucntionExepressionNode.params.push({
          type: 'Identifier',
          value: token.value
        });
      }
      position ++;
      if(tokens[position].type === 'arrow') {
        position ++;
      }
      if(tokens[position].type === 'curlybrackets' && tokens[position].value === '{') {
        position ++;
        let blockStatementNode = {
          type: 'BlockStatement',
          body: []
        };
        while(tokens[position].type !== 'curlybrackets' && tokens[position].value !== '}') {
          position ++;
        }
        position ++;
        arrowFucntionExepressionNode.body = blockStatementNode;
      }else {
        throw new TypeError("Unknown expression");
      }
      return arrowFucntionExepressionNode;
    }
    throw new TypeError(token.type);
  }
  let ast = {
    type: 'Program',
    body: []
  };
  while(position < tokens.length) {
    ast.body.push(walk());
  }
  return ast;
}

module.exports = parser;
