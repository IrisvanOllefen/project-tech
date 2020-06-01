// The code below was code that lodash mentioned to put in your code
// Load the full build.
var fullBuild = require('lodash');

// Load the core build.
var coreBuild = require('lodash/core');

// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

// Using this console.log to see if my node index.js in scripts is working
console.log("Hello World!");

// testing out how cowsay works
var cowsay = require("cowsay");

console.log(cowsay.say({
    text: "what does the cow say?",
    e: "oO",
    T: "U "
}));
