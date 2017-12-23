
function tokenizer(input) {

  var position = 0 ;
  var tokens = [];

  while(position < input.length) {
    var char = input[position];
    if(char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      });
      position ++;
      continue;
    }
    if(char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      });
      position ++;
      continue;
    }

    if(char === '{') {
      tokens.push({
        type: 'curlybrackets',
        value: '{'
      });
      position ++;
      continue;
    }
    if(char === '}') {
      tokens.push({
        type: 'curlybrackets',
        value: '}'
      });
      position ++;
      continue;
    }

    if(char === '=' && input[position + 1] === '>') {
      tokens.push({
        type: 'arrow',
        value: '=>'
      });
      position += 2;
      continue;
    }

    if(char === ',') {
      position ++;
      continue;
    }

    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      position++;
      continue;
    }

    let VARIABLE = /[a-zA-Z]/;
    if(VARIABLE.test(char)) {
      var variableName = char;
      position ++;
      let restOfVariableRegex = /[a-zA-Z0-9_]/;
      while(restOfVariableRegex.test(input[position])) {
        variableName += input[position];
        position ++;
      }
      tokens.push({
        type: 'Identifier',
        value: variableName
      });
      continue;
    }

    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens;
}

module.exports = tokenizer;
