(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("transform-image-js", [], factory);
	else if(typeof exports === 'object')
		exports["transform-image-js"] = factory();
	else
		root["transform-image-js"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "TransformImage", function() { return /* reexport */ src; });

// CONCATENATED MODULE: ./src/defaults.js
/* harmony default export */ var defaults = ({
  sizeLimit: 16777216,
  // 16MB
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.5,
  base64OutputType: false,
  blobOutputType: true,
  allowedFileTypes: ["jpg", "png", "jpeg"]
});
// CONCATENATED MODULE: ./src/utils.js
var validateFileType = function validateFileType(fileType, options) {
  var accepted = false;
  options.allowedFileTypes.forEach(function (allowedFileType) {
    var regEx = new RegExp("image/" + allowedFileType);
    if (regEx.test(fileType)) accepted = true;
  });
  return accepted;
};
var validateFileSize = function validateFileSize(imageSize, options) {
  if (imageSize > options.sizeLimit) {
    throw "Please upload an image of size less than " + options.sizeLimit / (1024 * 1024) + "MB";
  }
};
var base64ToBlob = function base64ToBlob(base64, fileType) {
  var sliceSize = 512; // uses 512 as packet size for efficient conversion

  var regEx = new RegExp("^data:image/" + fileType + ";base64,");
  base64 = base64.replace(regEx, "");
  var byteCharacters = atob(base64);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);

    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {
    type: "image/" + fileType
  });
  return blob;
};
// CONCATENATED MODULE: ./src/resizeImage.js
function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 // Returns a promise

var resizeImageFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file, options) {
    var reader;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (file) {
              _context.next = 2;
              break;
            }

            throw "File is null or undefined";

          case 2:
            if (validateFileType(file.type, options)) {
              _context.next = 4;
              break;
            }

            throw "File " + file.name + " is not a supported image.";

          case 4:
            // read the files
            reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = function (event) {
              var blob = new Blob([event.target.result]); // create blob...

              var imageSize = blob.size;
              validateFileSize(imageSize, options);
              window.URL = window.URL || window.webkitURL;
              var blobURL = window.URL.createObjectURL(blob); // and get it's URL
              // helper Image object

              var image = new Image();
              image.src = blobURL;

              image.onload = function () {
                // have to wait till it's loaded
                var resized = resizeImageCanvas(image, file.type, options); // send it to canvas

                if (options.base64OutputType) {
                  return resized;
                } else if (options.blobOutputType) {
                  return base64ToBlob(resized, file.type);
                }
              };
            };

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resizeImageFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var resizeImageCanvas = function resizeImageCanvas(img, fileType, options) {
  var canvas = document.createElement("canvas");
  var width = img.width;
  var height = img.height; // calculate the width and height, constraining the proportions

  if (width > height) {
    if (width > options.maxWidth) {
      height = (_readOnlyError("height"), Math.round(height *= (_readOnlyError("height"), options.maxWidth / width)));
      width = (_readOnlyError("width"), options.maxWidth);
    }
  } else {
    if (height > options.maxHeight) {
      width = (_readOnlyError("width"), Math.round(width *= (_readOnlyError("width"), options.maxHeight / height)));
      height = (_readOnlyError("height"), options.maxHeight);
    }
  } // resize the canvas and draw the image data into it


  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/" + fileType, options.quality);
};
// CONCATENATED MODULE: ./src/index.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var src_TransformImage = /*#__PURE__*/function () {
  /*
    Options - An object with following properties
    sizeLimit : the byte size limit for the output file
    maxWidth: the max width for the file in px
    maxHeight: the max height for the file in px
    quality: a value between 0 and 1 to denote the quality of the output image
    base64OutputType: boolean to return a base64 string as the output
    blobOutputType: boolean to return a blob as output
    allowedFileTypes: allowed types for the image file e.g. PNG, JPEG, JPG
  */
  function TransformImage(options) {
    _classCallCheck(this, TransformImage);

    options.sizeLimit = options.sizeLimit || defaults.sizeLimit;
    options.maxWidth = options.maxWidth || defaults.maxWidth;
    options.maxHeight = options.maxHeight || defaults.maxHeight;
    options.quality = options.quality || defaults.quality; // Quality - A value between 0 and 1 to denote the quality of the image in the output

    options.base64OutputType = options.base64OutputType || defaults.base64OutputType; // return Base64 string

    options.blobOutputType = options.blobOutputType || defaults.blobOutputType; // return Blob // NOTE: you can only choose one of the base64 or blob options

    options.allowedFileTypes = options.allowedFileTypes || defaults.allowedFileTypes; // An array of allowed file types

    this.options = options;
  }
  /*
  @params
  imageFile - The image file object obtained after user has uploaded the file
  */


  _createClass(TransformImage, [{
    key: "resizeImage",
    value: function resizeImage(imageFile) {
      resizeImageFile(imageFile, _objectSpread({}, this.options));
    }
  }]);

  return TransformImage;
}();

/* harmony default export */ var src = (src_TransformImage);
// CONCATENATED MODULE: ./index.js


/***/ })
/******/ ]);
});
//# sourceMappingURL=transform-image-js.map