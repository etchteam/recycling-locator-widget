import { ActionFunctionArgs, redirect } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export default async function placesSearchAction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const search = formData.get('search') as string;
  const materials = await LocatorApi.post<Material[]>('materials', formData);
  const { name, id } = materials?.[0] ?? {};
  const postcode = params.postcode;
  const safeName = encodeURIComponent(name ?? search);
  return redirect(
    `/${postcode}/places?materialId=${id}&materialName=${safeName}`,
  );
}
