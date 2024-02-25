import { PostcodeResponse } from '@/types/locatorApi';

export const ValidPostcodeResponse: PostcodeResponse = {
  postcode: 'EX327RB',
};

export const InvalidPostcodeResponse: PostcodeResponse = {
  error: 'Not Found',
};
