"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingState = void 0;
let LoadingState;
exports.LoadingState = LoadingState;

(function (LoadingState) {
  LoadingState[LoadingState["NOT_STARTED"] = 0] = "NOT_STARTED";
  LoadingState[LoadingState["IN_PROGRESS"] = 1] = "IN_PROGRESS";
  LoadingState[LoadingState["SUCCESS"] = 2] = "SUCCESS";
  LoadingState[LoadingState["FAILURE"] = 3] = "FAILURE";
})(LoadingState || (exports.LoadingState = LoadingState = {}));