import { LoaderFunctionArgs } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export interface MaterialStartLoaderResponse {
  name: string;
  id: string;
}

export default async function materialStartLoader({
  request,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const materialName = url.searchParams.get('name');
  const formData = new FormData();
  formData.set('search', materialName);
  const materials = await LocatorApi.post<Material[]>('materials', formData);
  const { name, id } = materials?.[0] ?? {};

  if (!id) {
    throw new Response('Material not found', { status: 404 });
  }

  return {
    name,
    id,
  };
}
