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

interface IPatientParsed {
  fullName: string;
  lastName: string;
  firstName: string;
  gender: string;
}

export interface IUsePatient extends IUseResource, IPatientParsed {}
