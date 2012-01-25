#!/usr/bin/env node

"use strict";

var fs = require('fs');

function onWatch(event, filename) {
  console.log('event is: ' + event);
  if (filename) {
    console.log('filename: ' + filename);
  } else {
    console.log('filename not provided');
  }
}
fs.watch(process.cwd(), onWatch);

function onReadDir(err, files) {
  files.forEach(function (file) {
    console.log("file: " + file);
    if (file === "node_modules") {
      return;
    }
    if (/^\./.test(file)) {
      return;
    }
    fs.stat(file, function (err, stat) {
      if (stat.isDirectory()) {
        fs.watch(file, onWatch);
      }
    });
  });
}
fs.readdir(process.cwd(), onReadDir);


