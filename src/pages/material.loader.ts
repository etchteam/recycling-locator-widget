import { LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { MaterialSearch } from '@/types/locatorApi';

export type MaterialStartLoaderResponse = MaterialSearch;

export default async function materialStartLoader({
  request,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  const formData = new FormData();
  formData.set('search', search);

  const materials = await LocatorApi.post<MaterialSearch[]>(
    'materials',
    formData,
  );
  const material = materials?.[0];

  if (!material?.id) {
    throw new Response('Material not found', { status: 404 });
  }

  return material;
}
