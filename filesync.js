const fs = require('fs');

//blocking code
const disTxt = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(disTxt);

const withoutMe = `Hi Kids? You like violence? You want to see me stick Nine Inch Nails through each one of my eyelids? ${disTxt}.\n Graced earth on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', withoutMe, 'utf-8');
console.log('Em wrote it');

// no blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.log('ERROR OH NO!'); // error handling
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    if (err) return console.log('ERROR OH NO!'); // error handling

    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      if (err) return console.log('ERROR OH NO!'); // error handling

      fs.writeFile(
        './txt/final.txt',
        `${data2}\n${data3}`,
        'utf-8',
        (err) => {
          if (err) throw Error;
          console.log(`Content written to ./txt/final.txt`);
        }
      );
    });
  });
});
console.log('Will read file!'); // this will be logged before the file is read because the callback function is waiting for the file to be read before it execute because it it is not blocked by the file being read.
