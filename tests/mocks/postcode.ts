import config from '@/config';
import { PostcodeResponse } from '@/types/locatorApi';

export const POSTCODE_ENDPOINT = `${config.locatorApiPath}postcode/**`;

export const ValidPostcodeResponse: PostcodeResponse = {
  postcode: 'EX327RB',
};

export const InvalidPostcodeResponse: PostcodeResponse = {
  error: 'Not Found',
};
