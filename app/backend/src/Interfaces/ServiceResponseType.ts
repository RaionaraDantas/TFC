export type ServiceResponseSuccessful<T> = {
  status: 'SUCCESSFUL',
  data: T,
};

export type ServiceResponseError = {
  status: string,
  data: { message: string },
};

export type ServiceResponseType<T> = ServiceResponseSuccessful<T> | ServiceResponseError;
