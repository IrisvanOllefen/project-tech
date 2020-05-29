// function test(int) {
//   if (typeof int !== "number") {
//     throw new Error("You forgot to input a number in the first argument");
//   }
// }

// function mooieFunctie() {
//   try {
//     test("a");
//     console.log("hoi");
//   } finally {
//     console.log("HEYO");
//   }
// }

// mooieFunctie();

const fs = require("fs");

// fs.readFile("./package.json", (err, result) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   const text = result.toString()
//   fs.writeFile('./PACKMAN.txt', text, (err, writtenResult) => {
//     if (err) {
//         console.error(err);
//         return;
//       }

//       console.log(writtenResult)

//       fs.writeFile('./PACKMAN.txt', text, (err, writtenResult) => {
//         if (err) {
//             console.error(err);
//             return;
//           }

//           console.log(writtenResult)
//       })
//   })
// });

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.toString());
    });
  });
}

// readFile("./package.json").then((result) => {
//   return result.toString();
// });

async function run() {
  const result = await readFile("./package.json");
  console.log(result);
}

run();
