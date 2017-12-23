function parser(tokens) {
  let position = 0;
  function walk() {
    let token = tokens[position ++];
    if((token.type === 'paren' && token.value === '(') || token.type === 'Identifier') {
      let node = {
        type: 'ArrowFunctionExpression',
        params: [],
        body: []
      };
      while(token.type !== 'Identifier' && tokens[position].type !== 'paren' && tokens[position].value !== ')') {
        node.params.push({
          type: 'Identifier',
          value: tokens[position].value
        });
        position ++;
      }
      if(token.type === 'Identifier') {
        node.params.push({
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
        while(tokens[position].type !== 'curlybrackets' && tokens[position].value !== '}') {
          position ++;
        }
        position ++;
      }else {
        throw new TypeError("Unknown expression");
      }
      return node;
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
