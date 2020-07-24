import { useEffect, useState } from 'react';
import { useResource } from './useResource';

import Client from 'fhirclient/lib/Client';
import { IUseCondition, IConditionParsed } from '../rfh-types';
import { fhirclient } from 'fhirclient/lib/types';

export const useCondition = (
  client: Client,
  params: Record<string, unknown> = {}
): IUseCondition => {
  const queryStringArray = Object.keys(params).map(
    (key) => `${key}=${params[key]}`
  );
  const queryString =
    queryStringArray.length > 0 ? `?${queryStringArray.join('&')}` : '';

  const { resource, ...rest } = useResource(client, `Condition${queryString}`);

  const [values, setValues] = useState<IConditionParsed[]>();

  useEffect(() => {
    if (!resource) {
      return;
    }

    const resources: fhirclient.FHIR.Resource[] = resource.entry
      ? resource.entry.map(
          ({ resource }: { resource: fhirclient.FHIR.Resource }) => resource
        )
      : [];

    const conditions: IConditionParsed[] = resources.map(
      (resource: fhirclient.FHIR.Resource) => {
        const clinicalStatus = resource.clinicalStatus.coding
          .map((status: any) => status.code)
          .join(', ');

        const verificationStatus = resource.verificationStatus.coding
          .map((status: any) => status.code)
          .join(', ');

        const category = resource.category
          .map((category: any) => {
            return category.coding.map(
              (code: fhirclient.FHIR.Coding) => code.display
            );
          })
          .join(', ');

        const severity = resource.severity.coding
          .map((coding: any) => coding.display)
          .join(', ');

        const code = resource.code.coding
          .map((coding: any) => coding.display)
          .join(', ');

        const bodySite = resource.bodySite
          .map((category: any) => {
            return category.coding.map(
              (code: fhirclient.FHIR.Coding) => code.display
            );
          })
          .join(', ');

        const onsetDateTime = resource.onsetDateTime;

        return {
          clinicalStatus,
          verificationStatus,
          category,
          severity,
          code,
          bodySite,
          onsetDateTime
        };
      }
    );

    setValues(conditions);
  }, [resource]);

  return {
    resource,
    conditions: values,
    ...rest
  };
};
