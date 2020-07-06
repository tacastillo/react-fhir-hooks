import { fhirclient } from 'fhirclient/lib/types';

declare namespace reactFhirHooks {
  enum LoadingState {
    NOT_STARTED,
    IN_PROGRESS,
    SUCCESS,
    FAILURE
  }

  interface IUseResource {
    resource: fhirclient.FHIR.Resource;
    loading: LoadingState;
    error: unknown;
  }
}
