import Client from 'fhirclient/lib/Client';
import { reactFhirHooks } from '../types';
export declare const useResource: (fhirClient: Client, query: string) => reactFhirHooks.IUseResource;
