## require-inject-scope - Inject scoped variables when requiring a file.

[![NPM](https://nodei.co/npm/require-inject-scope.png?mini=true)](https://nodei.co/npm/require-inject-scope/)

[![Build Status](https://travis-ci.org/ralphv/require-inject-scope.svg?branch=master)](https://travis-ci.org/ralphv/require-inject-scope)
[![Coverage Status](https://coveralls.io/repos/github/ralphv/require-inject-scope/badge.svg?branch=master)](https://coveralls.io/github/ralphv/require-inject-scope?branch=master)
        
* [What is it?](#what-is-it)
* [Getting started](#getting-started)
* [Usage](#usage)
* [License](#License)
* [Changelog](#Changelog)

## What is it

The built in require of Node.js does not have a way to allow you to inject scoped variables. 
The variables module, exports, __dirname, __filename... are available in the context of a required file but there is no easy way to provide your own variables. 

Many developers will revert to using either globally defined variables or using singleton variables like globals, but neither of these are best practices.

This library allows you to inject your own variables to the context of the required file.

## Getting started

    $ npm install --save require-inject-scope

## Usage

require this library as early as possible in your own code.

```javascript
require("require-inject-scope");
```

require will work normally as expected.

When you need to inject variables into a scope, instead of calling require with one parameter which 
is the `path`, you call it using an array with exactly two elements. 
The first element is the standard `path` and the second element will be an object having properties as variable names to inject and their values.

This is most useful when creating a plugin architecture where you want to provide the plugins a list of defined variables without requiring your plugins to require them manually.

example:

```javascript
require(["./sample.js", {"$config":configObject, "$helper": helperObject}]);
```

The file sample.js will have the two variables `$config` and `$helper` defined in it's scope similar to the standard available variables.

### License

require-inject-scope is licensed under the [MIT](https://github.com/ralphv/require-inject-scope/raw/master/LICENSE).

### Changelog

* 1.0.0: Initial version
