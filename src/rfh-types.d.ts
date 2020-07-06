import { fhirclient } from 'fhirclient/lib/types';

export enum LoadingState {
  NOT_STARTED,
  IN_PROGRESS,
  SUCCESS,
  FAILURE
}

export interface IUseResource {
  resource: fhirclient.FHIR.Resource | undefined;
  loading: LoadingState;
  error: unknown;
}
