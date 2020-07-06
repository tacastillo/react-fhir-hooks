"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

function useCounter() {
  const [count, setCount] = (0, _react.useState)(0);
  const increment = (0, _react.useCallback)(() => setCount(x => x + 1), []);
  return {
    count,
    increment
  };
}

var _default = useCounter;
exports.default = _default;