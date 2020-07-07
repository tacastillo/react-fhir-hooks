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

export interface IPatientParsed {
  fullName: string | undefined;
  lastName: string | undefined;
  firstName: string | undefined;
  gender: string | undefined;
}

export interface IUsePatient extends IUseResource, IPatientParsed {}

export interface IMedicationRequestParsed {
  status: string | undefined;
  intent: string | undefined;
  medication: string | undefined;
  patient: string | undefined;
  requester: string | undefined;
  reason: string | undefined;
  note: string | undefined;
  dosageInstruction: string[] | undefined;
  validityPeriod:
    | {
        start: string;
        end: string;
      }
    | undefined;
  refills: number | undefined;
  quantity: string | undefined;
  duration: string | undefined;
}

export interface IUseMedicationRequest extends IUseResource {
  medications: IMedicationRequestParsed[] | undefined;
}
