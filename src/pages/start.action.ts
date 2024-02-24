import { ActionFunctionArgs, redirect } from 'react-router-dom';

import PostCodeResolver from '@/lib/PostcodeResolver';

export default async function startAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const location = formData.get('location') as string;

  try {
    const postcode = await PostCodeResolver.fromString(location);
    return redirect(`/${postcode}`);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      if (
        [
          PostCodeResolver.ERROR_NOT_IN_UK,
          PostCodeResolver.ERROR_POSTCODE_NOT_FOUND,
          PostCodeResolver.ERROR_SEARCH_FAILED,
        ].includes(error.message)
      ) {
        throw new Response(error.message, { status: 404 });
      }
    }

    throw error;
  }
}
