const tokenizer = require('./tokenizer');
const parser = require('./parser');
const transformer = require('./transformer');
const generator = require('./generator');
let fs = require('fs');
let args = process.argv;

function compiler(input) {
  console.log(input);
  var tokens = tokenizer(input);
  console.log(tokens);
  var ast = parser(tokens);
  var newAst = transformer(ast);
  console.log(newAst);
  var generatedCode = generator(newAst);
  console.log(generatedCode);
}

if(args.length < 2)  {
    throw new Error('Wrong number of arguments');
}

fs.readFile(args[2],'utf8', function (err, data) {
  if(err) {
    return console.log(err)
  }
  compiler(data);
})
