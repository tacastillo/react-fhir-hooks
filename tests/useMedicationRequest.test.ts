import { renderHook } from '@testing-library/react-hooks';
import Client from 'fhirclient/lib/Client';

import { mockClient } from './mocks/mockClient';
import MedicationRequest from './mocks/MedicationRequest.json';

import { useMedicationRequest } from '../src/hooks/useMedicationRequest';

import { LoadingState } from '../src/rfh-types';

test('that the patient can be fetched', async () => {
  const client = mockClient(MedicationRequest);
  const { result, waitForNextUpdate } = renderHook(() =>
    useMedicationRequest(client as Client, {
      name: 'MedRx123'
    })
  );

  expect(result.current).toEqual({
    loading: LoadingState.IN_PROGRESS
  });

  await waitForNextUpdate();

  expect(result.current).toEqual({
    resource: MedicationRequest,
    loading: LoadingState.SUCCESS,
    medications: [
      {
        status: 'active',
        intent: 'order',
        medication: 'Azithromycin 250mg capsule (product)',
        patient: 'Donald Duck',
        requester: 'Patrick Pump',
        reason: "Traveller's Diarrhea (disorder)",
        note: 'Patient told to take with food',
        dosageInstruction: [
          'Two tablets at once',
          'One tablet daily for 4 days'
        ],
        validityPeriod: {
          start: '2015-01-15',
          end: '2016-01-15'
        },
        refills: 1,
        quantity: '6 TAB',
        duration: '5 days'
      }
    ]
  });
});
