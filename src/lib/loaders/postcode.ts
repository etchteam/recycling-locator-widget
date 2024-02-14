import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';

import PostCodeResolver from '../PostcodeResolver';

interface PostcodeLoaderResponse {
  postcode: string;
  city: string;
}

export async function postcodeLoader({
  params,
}: LoaderFunctionArgs): Promise<PostcodeLoaderResponse> {
  const postcode = params.postcode;
  const geocode = await PostCodeResolver.getValidGeocodeData(postcode);

  return {
    postcode,
    city: geocode.items[0].address.city,
  };
}

export function usePostcodeLoaderData() {
  return useRouteLoaderData('postcode') as PostcodeLoaderResponse;
}
