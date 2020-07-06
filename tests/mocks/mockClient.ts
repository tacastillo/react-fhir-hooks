interface IMockClient {
  request: (query: string) => Promise<unknown>;
  patient: {
    id: string;
  };
}

export const mockClient = (mockData: unknown): IMockClient => {
  return {
    request: jest.fn().mockImplementation(() => Promise.resolve(mockData)),
    patient: {
      id: '123123'
    }
  };
};
