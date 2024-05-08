import { ActionFunctionArgs, redirect } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { MaterialSearch } from '@/types/locatorApi';

export default async function postcodeAction({
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

  if (!material || material?.name !== search) {
    const safeSearchTerm = encodeURIComponent(search);
    return redirect(`/${postcode}/material/search?name=${safeSearchTerm}`);
  }

  const searchType =
    material.type === 'LocatorMaterialCategory' ? 'category' : 'materials';
  const searchParams = new URLSearchParams();
  searchParams.set(searchType, material.id);
  searchParams.set('search', search);

  return redirect(`/${postcode}/material?${searchParams.toString()}`);
}
