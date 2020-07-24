import { renderHook } from '@testing-library/react-hooks';
import Client from 'fhirclient/lib/Client';

import { mockClient } from './mocks/mockClient';
import Patient from './mocks/Patient.json';

import { useResource } from '../src';
import { LoadingState } from '../src/constants';

test('that a resource can be fetched', async () => {
  const client = mockClient(Patient);
  const { result, waitForNextUpdate } = renderHook(() =>
    useResource(client as Client, 'Patient/1231323')
  );

  expect(result.current).toEqual({
    loading: LoadingState.IN_PROGRESS
  });

  await waitForNextUpdate();

  expect(result.current).toEqual({
    resource: Patient,
    loading: LoadingState.SUCCESS
  });
});
