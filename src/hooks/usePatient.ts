import { useEffect, useState } from 'react';
import { useResource } from './useResource';

import Client from 'fhirclient/lib/Client';
import { IUsePatient, IPatientParsed } from '../rfh-types';

const usePatient = (client: Client): IUsePatient => {
  const { resource, ...rest } = useResource(
    client,
    `Patient/${client.patient.id}`
  );

  const [values, setValues] = useState<IPatientParsed>({
    firstName: '',
    fullName: '',
    gender: '',
    lastName: ''
  });

  useEffect(() => {
    if (!resource) {
      return;
    }

    const name = {
      fullName: `${resource.name[0].given.join(' ')} ${
        resource.name[0].family
      }`,
      lastName: resource.name[0].family,
      firstName: resource.name[0].given[0]
    };

    const gender = resource.gender;

    setValues({
      ...name,
      gender
    });
  }, [resource]);

  return {
    resource,
    ...rest,
    ...values
  };
};

export default usePatient;
