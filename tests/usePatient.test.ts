import { renderHook } from '@testing-library/react-hooks';
import Client from 'fhirclient/lib/Client';

import { mockClient } from './mocks/mockClient';
import Patient from './mocks/Patient.json';

import { usePatient } from '../src/hooks/usePatient';

import { LoadingState } from '../src/constants';

test('that the patient can be fetched', async () => {
  const client = mockClient(Patient);
  const { result, waitForNextUpdate } = renderHook(() =>
    usePatient(client as Client)
  );

  expect(result.current).toEqual({
    loading: LoadingState.IN_PROGRESS
  });

  await waitForNextUpdate();

  expect(result.current).toEqual({
    resource: Patient,
    loading: LoadingState.SUCCESS,
    firstName: 'Peter',
    lastName: 'Chalmers',
    fullName: 'Peter James Chalmers',
    gender: 'male'
  });
});
