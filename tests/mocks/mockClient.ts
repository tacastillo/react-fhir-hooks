interface IMockClient {
  request: (query: string) => Promise<unknown>;
}

export const mockClient = (mockData: unknown): IMockClient => {
  return {
    request: jest.fn().mockImplementation(() => Promise.resolve(mockData))
  };
};
