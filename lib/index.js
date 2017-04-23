/**
 * Created by Ralph Varjabedian on 4/22/17.
 * require-inject-scope is licensed under the [MIT]
 * do not remove this notice.
 */
'use strict';

const Module = require("module");
const attachingProperty = "__injectedScope";

const _compile = Module.prototype._compile;
Module.prototype._compile = function(content, filename) {
  if(this.parent && this.parent[attachingProperty]) {
    const keys = Object.keys(this.parent[attachingProperty]);
    const keysFromScopeObject = [];
    keys.forEach(function(k) { keysFromScopeObject.push("module.parent." + attachingProperty + "['" + k + "']"); });
    return _compile.call(this, "(function(" + keys.join(",") + "){\r\n" + content + "\r\n})(" + keysFromScopeObject.join(",") + ")", filename);
  } else {
    return _compile.call(this, content, filename);
  }
};

const _require = Module.prototype.require;
Module.prototype.require = function(filename) {
  if(!filename || !Array.isArray(filename)) {
    return _require.call(this, filename);
  }

  if(filename.length !== 2) {
    throw new Error("require-inject-scope: require with scope injection needs 2 parameters.");
  }

  // pull out the extra scope variables
  this[attachingProperty] = filename[1];
  return _require.call(this, filename[0]);
};