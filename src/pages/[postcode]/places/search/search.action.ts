import { ActionFunctionArgs, redirect } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { MaterialSearch } from '@/types/locatorApi';

export default async function placesSearchAction({
  request,
  params,
}: ActionFunctionArgs) {
  const postcode = params.postcode;
  const formData = await request.formData();
  const search = formData.get('search') as string;
  const materials = await LocatorApi.post<MaterialSearch[]>(
    'materials',
    formData,
  );
  const material = materials?.[0];
  const searchParams = new URLSearchParams();
  searchParams.set('search', search);

  if (material && material?.name === search) {
    const searchType =
      material.type === 'LocatorMaterialCategory' ? 'category' : 'materials';
    searchParams.set(searchType, material.id);
  } else {
    searchParams.set('materials', 'undefined');
  }

  return redirect(`/${postcode}/places?${searchParams.toString()}`);
}
