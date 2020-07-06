"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResource = void 0;
const react_1 = require("react");
const types_1 = require("../types");
exports.useResource = (fhirClient, query) => {
    const [resource, setResource] = react_1.useState();
    const [loading, setLoading] = react_1.useState(types_1.reactFhirHooks.LoadingState.NOT_STARTED);
    const [error, setError] = react_1.useState();
    react_1.useEffect(() => {
        setLoading(types_1.reactFhirHooks.LoadingState.IN_PROGRESS);
        fhirClient.request(query)
            .then((resource) => {
            setResource(resource);
            setLoading(types_1.reactFhirHooks.LoadingState.SUCCESS);
        })
            .catch((caughtError) => {
            setError(caughtError);
            setLoading(types_1.reactFhirHooks.LoadingState.FAILURE);
        });
    }, [fhirClient, query]);
    return {
        resource,
        loading,
        error
    };
};
