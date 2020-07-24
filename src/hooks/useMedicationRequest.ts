import { useEffect, useState } from 'react';
import { useResource } from './useResource';

import Client from 'fhirclient/lib/Client';
import { IUseMedicationRequest, IMedicationRequestParsed } from '../rfh-types';
import { fhirclient } from 'fhirclient/lib/types';

export const useMedicationRequest = (
  client: Client,
  params: Record<string, unknown> = {}
): IUseMedicationRequest => {
  const queryStringArray = Object.keys(params).map(
    (key) => `${key}=${params[key]}`
  );
  const queryString =
    queryStringArray.length > 0 ? `?${queryStringArray.join('&')}` : '';

  const { resource, ...rest } = useResource(
    client,
    `MedicationRequest${queryString}`
  );

  const [values, setValues] = useState<IMedicationRequestParsed[]>();

  useEffect(() => {
    if (!resource) {
      return;
    }

    const resources: fhirclient.FHIR.Resource[] = resource.entry
      ? resource.entry.map(
          ({ resource }: { resource: fhirclient.FHIR.Resource }) => resource
        )
      : [];

    const medications: IMedicationRequestParsed[] = resources.map(
      (resource: fhirclient.FHIR.Resource) => {
        const status = resource.status;
        const intent = resource.intent;

        const medication = resource.contained
          .map((med: { code: fhirclient.FHIR.CodeableConcept }) =>
            med.code.coding ? med.code.coding[0].display : ''
          )
          .filter((med: string) => med.length > 0)
          .join(', ');

        const patient = resource.subject.display;
        const requester = resource.requester.display;

        const reason = resource.reasonCode
          .map((reasonCode: fhirclient.FHIR.CodeableConcept) =>
            reasonCode.coding ? reasonCode.coding[0].display : ''
          )
          .filter((reasonCode: string) => reasonCode.length > 0)
          .join(', ');

        const note = resource.note
          .map(({ text }: { text: string }) => text)
          .join('; ');

        const dosageInstruction = resource.dosageInstruction.map(
          ({ text }: { text: string }) => text
        );

        const validityPeriod = resource.dispenseRequest.validityPeriod;

        const refills = resource.dispenseRequest.numberOfRepeatsAllowed;

        const { value, unit } = resource.dispenseRequest.quantity;
        const quantity = `${value} ${unit}`;

        const {
          value: durationValue,
          unit: durationUnit
        } = resource.dispenseRequest.expectedSupplyDuration;

        const duration = `${durationValue} ${durationUnit}`;

        return {
          status,
          intent,
          medication,
          patient,
          requester,
          reason,
          note,
          dosageInstruction,
          validityPeriod,
          refills,
          quantity,
          duration
        };
      }
    );

    setValues(medications);
  }, [resource]);

  return {
    resource,
    medications: values,
    ...rest
  };
};
