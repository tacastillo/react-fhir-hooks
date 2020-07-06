"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResource = void 0;

var _react = require("react");

var _types = require("../types");

const useResource = (fhirClient, query) => {
  const [resource, setResource] = (0, _react.useState)();
  const [loading, setLoading] = (0, _react.useState)(_types.LoadingState.NOT_STARTED);
  const [error, setError] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    setLoading(_types.LoadingState.IN_PROGRESS);
    fhirClient.request(query).then(resource => {
      setResource(resource);
      setLoading(_types.LoadingState.SUCCESS);
    }).catch(caughtError => {
      setError(caughtError);
      setLoading(_types.LoadingState.FAILURE);
    });
  }, [fhirClient, query]);
  return {
    resource,
    loading,
    error
  };
};

exports.useResource = useResource;