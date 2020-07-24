import { useState, useEffect } from 'react';

import { fhirclient } from 'fhirclient/lib/types';
import Client from 'fhirclient/lib/Client';

import { LoadingState } from '../constants';
import { IUseResource } from '../rfh-types';

export const useResource = (
  fhirClient: Client,
  query: string
): IUseResource => {
  const [resource, setResource] = useState<fhirclient.FHIR.Resource>();
  const [loading, setLoading] = useState<LoadingState>(
    LoadingState.NOT_STARTED
  );
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(LoadingState.IN_PROGRESS);

    fhirClient
      .request(query)
      .then((resource) => {
        setResource(resource);
        setLoading(LoadingState.SUCCESS);
      })
      .catch((caughtError) => {
        setError(caughtError);
        setLoading(LoadingState.FAILURE);
      });
  }, [fhirClient, query]);

  return {
    resource,
    loading,
    error
  };
};
