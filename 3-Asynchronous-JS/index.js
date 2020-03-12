const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that File');
      resolve(data);
    });
  });
};

const WriteFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not file');
      resolve('succses');
    });
  });
};

const getDogpic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed:${data}`);
    const res1Pro = superagent.get(`https://dog.ceo/api/breeds/image/random`);
    const res2Pro = superagent.get(`https://dog.ceo/api/breeds/image/random`);
    const res3Pro = superagent.get(`https://dog.ceo/api/breeds/image/random`);
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);
    await WriteFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2:Ready';
};
//IIFE
(async () => {
  try {
    console.log('1:Will get dig pics!');
    const x = await getDogpic();
    console.log(x);
    console.log('3:Done getting dog pics!');
  } catch (err) {
    console.log('error');
  }
})();
/*console.log('1:Will get dig pics!');
getDogpic()
  .then(x => {
    console.log(x);
    console.log('3:Done getting dog pics!');
  })
  .catch(err => {
    console.log('error');
  });
*/

/*readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed:${data}`);
    return superagent.get(`https://dog.ceo/api/breeds/image/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return WriteFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch(err => {
    console.log(err);
  });*/
