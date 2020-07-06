export const mockFetch = (mockData: unknown): void => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData)
    })
  );
};

export const mockFetchError = (error: unknown): void => {
  global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

export const mockFetchCleanUp = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetch: any = global.fetch;
  fetch.mockClear();
  delete global.fetch;
};
