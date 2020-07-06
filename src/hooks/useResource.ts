import { useState, useEffect } from 'react';

import { fhirclient } from 'fhirclient/lib/types';
import Client from 'fhirclient/lib/Client';

import { reactFhirHooks } from '../types';

export const useResource = (
  fhirClient: Client,
  query: string
): reactFhirHooks.IUseResource => {
  const [resource, setResource] = useState<fhirclient.FHIR.Resource>();
  const [loading, setLoading] = useState<reactFhirHooks.LoadingState>(
    reactFhirHooks.LoadingState.NOT_STARTED
  );
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(reactFhirHooks.LoadingState.IN_PROGRESS);

    fhirClient
      .request(query)
      .then((resource) => {
        setResource(resource);
        setLoading(reactFhirHooks.LoadingState.SUCCESS);
      })
      .catch((caughtError) => {
        setError(caughtError);
        setLoading(reactFhirHooks.LoadingState.FAILURE);
      });
  }, [fhirClient, query]);

  return {
    resource,
    loading,
    error
  };
};
