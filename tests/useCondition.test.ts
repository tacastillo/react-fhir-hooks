import { renderHook } from '@testing-library/react-hooks';
import Client from 'fhirclient/lib/Client';

import { mockClient } from './mocks/mockClient';
import Condition from './mocks/Condition.json';

import { useCondition } from '../src/hooks/useCondition';

import { LoadingState } from '../src/constants';

test('that conditions can be fetched', async () => {
  const client = mockClient(Condition);
  const { result, waitForNextUpdate } = renderHook(() =>
    useCondition(client as Client, {
      name: 'gout'
    })
  );

  expect(result.current).toEqual({
    loading: LoadingState.IN_PROGRESS
  });

  await waitForNextUpdate();

  expect(result.current).toEqual({
    resource: Condition,
    loading: LoadingState.SUCCESS,
    conditions: [
      {
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        category: 'Encounter Diagnosis,Diagnosis',
        severity: 'Severe',
        code: 'Burn of ear',
        bodySite: 'Left external ear structure',
        onsetDateTime: '2012-05-24'
      }
    ]
  });
});
