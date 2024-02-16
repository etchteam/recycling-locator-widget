import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';

import PostCodeResolver from '../PostcodeResolver';

interface PostcodeLoaderResponse {
  postcode: string;
  city: string;
}

export async function postcodeLoader({
  params,
}: LoaderFunctionArgs): Promise<PostcodeLoaderResponse> {
  try {
    const postcode = params.postcode;
    const geocode = await PostCodeResolver.getValidGeocodeData(postcode);

    return {
      postcode,
      city: geocode.items[0].address.city,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (
        [
          PostCodeResolver.ERROR_NOT_IN_UK,
          PostCodeResolver.ERROR_SEARCH_FAILED,
        ].includes(error.message)
      ) {
        throw new Response(error.message, { status: 404 });
      }
    }

    throw error;
  }
}

export function usePostcodeLoaderData() {
  return useRouteLoaderData('postcode') as PostcodeLoaderResponse;
}
