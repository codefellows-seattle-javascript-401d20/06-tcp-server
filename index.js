// 'use strict';
//
// const read = require(`./lib/reader.js`);
//
// read.read();

'use strict'

const fs = require('fs')

// //const read = (path, callback) => {
fs.readFile('./__test__/asset/bitmap.bmp', (err, data) => {
  if(err) {
    console.error(err);
    return;
  }
  //console.log('header: ', data.slice(0, 2).toString())
  //console.log('size in bytes: ', data.readUInt32LE(2, 4))
  //console.log(data.readUInt32LE(10, 4))
  //return data

  //slice out the color array and mutate it, and the original buffer is changed
  //
  console.log('buffer: ', data)
  console.log('type: ', data.slice(0, 2).toString())
  console.log('size in bytes: ', data.readUInt32LE(2))
  console.log('pixel array offset: ', data.readUInt32LE(10))
  console.log('size of header: ', data.readUInt32LE(14))
  console.log('width in pixels: ', data.readUInt32LE(18))
  console.log('height in pixels: ', data.readUInt32LE(22))
  console.log('color planes: ', data.readUInt16LE(26))
  console.log('bits per pixel: ', data.readUInt16LE(28))
  console.log('compression method: ', data.readUInt16LE(30))
  console.log('image size: ', data.readUInt32LE(34))
  console.log('horizontal resolution: ', data.readUInt32LE(38))
  console.log('vertical resolution: ', data.readUInt32LE(42))
  console.log('number of colors in the color palette: ', data.readUInt32LE(46))
  console.log('number of important colors used: ', data.readUInt32LE(50))

  let color_table = data.slice(41, 1065);
  for (let i = 0; i < color_table.length; i++) {
    if (color_table[i] === 0)
      color_table[i] = Math.random() * 100;
    color_table[i] = 255 - Math.random() * 100;
  }
  console.log(color_table);

  fs.writeFile('./__test__/asset/noise_bitmap.bmp', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});

// fs.writeFile('./__test__/asset/new_house.bmp', './__test__/asset/house.bmp', (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });
//}
//  module.exports = {
//    read: read,
//  };


// 'use strict';
//
// const infile = require('./lib/infile.js')
// const transforms = require('./lib/transforms.js')
//
// if (process.argv[2] && process.argv[3] && process.argv[4]) {
//   let infilename = process.argv[2]
//   let outfilename = process.argv[3]
//   let transform = process.argv[4]
//   infile(infilename, transforms[transform], outfilename)
// } else {
//   throw new Error('infile, outfile, and transform required')
// }

// node index.js ./__test__/asset/house.bmp ./__test__/asset/house_new.bmp whiteout
// node index.js ./__test__/asset/house.bmp ./__test__/asset/house_new.bmp blackout
// node index.js ./__test__/asset/house.bmp ./__test__/asset/house_new.bmp invert
//
// 'use strict';
//
// const fs = require('fs');
//
// //const read = (path, callback) => {
// fs.readFile('./__test__/asset/bitmap.bmp', (err, data) => {
//   if(err) {
//     console.error(err);
//     return;
//   }
//   console.log('header: ', data.slice(0, 2).toString());
//   console.log('size in bytes: ', data.readUInt32LE(2, 4));
//   console.log(data.readUInt32LE(10, 4));
//   return data;
//
//   // slice out the color array and mutate it, and the original buffer is changed
//
//   // console.log('buffer: ', data);
//   // console.log('type: ', data.slice(0, 2).toString());
//   // console.log('size in bytes: ', data.readUInt32LE(2));
//   // console.log('pixel array offset: ', data.readUInt32LE(10));
//   // console.log('size of header: ', data.readUInt32LE(14));
//   // console.log('width in pixels: ', data.readUInt32LE(18));
//   // console.log('height in pixels: ', data.readUInt32LE(22));
//   // console.log('color planes: ', data.readUInt16LE(26));
//   // console.log('bits per pixel: ', data.readUInt16LE(28));
//   // console.log('compression method: ', data.readUInt16LE(30));
//   // console.log('image size: ', data.readUInt32LE(34));
//   // console.log('horizontal resolution: ', data.readUInt32LE(38));
//   // console.log('vertical resolution: ', data.readUInt32LE(42));
//   // console.log('number of colors in the color palette: ', data.readUInt32LE(46));
//   // console.log('number of important colors used: ', data.readUInt32LE(50));
//
// // INVERT THE COLORS
//   // let color_table = data.slice(41, 1065);
//   // for (let i = 0; i < color_table.length; i++) {
//   //   color_table[i] = -255;
//   //   // color_table[i] = 255 - color_table[i];
//   // }
//   // console.log(color_table);
//
// // SCALE THE COLORS
// //   let color_table = data.slice(41, 1065);
// //   for (let i = 1; i < color_table.length; i+=4) {
// //     //color_table[i] = -255;
// //     color_table[i] = Math.round(color_table[i]/10);
// //   }
// //   console.log(color_table);
// //
// // ADD NOISE TO IMAGE
// //   let color_table = data.slice(41, 1065);
  // for (let i = 0; i < color_table.length; i++) {
  //   if (color_table[i] === 0)
  //     color_table[i] = Math.random() * 100;
  //   color_table[i] = 255 - Math.random() * 100;
  // }
// //   console.log(color_table);
// //
// //   // GRAYSCALE
// //   let color_table = data.slice(41, 1065);
// //   for (let i = 0; i < color_table.length; i++) {
// //     let colors = color_table[i] + color_table[i + 1] + color_table[i+2]/3;
// //   }
// //   console.log(color_table);
//
//   // fs.writeFile('./__test__/asset/new_bitmap.bmp', data, (err) => {
//   //   if (err) throw err;
//   //   console.log('The file has been saved!');
//   // });
// // });
//
// fs.writeFile('./__test__/asset/bitmap.bmp', './__test__/asset/new_bitmap.bmp', (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });
// // }
//  // module.exports = {
//  //   read: read,
//  };
