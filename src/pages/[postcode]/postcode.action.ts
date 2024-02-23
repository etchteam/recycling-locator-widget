import { ActionFunctionArgs, redirect } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { Material } from '@/types/locatorApi';

export default async function postcodeAction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const materials = await LocatorApi.post<Material[]>('materials', formData);
  const { name, id } = materials?.[0] ?? {};
  const postcode = params.postcode;

  if (name === formData.get('search')) {
    const safeName = encodeURIComponent(name);
    return redirect(`/${postcode}/material?id=${id}&name=${safeName}`);
  }

  const safeSearchTerm = encodeURIComponent(formData.get('search') as string);
  return redirect(`/${postcode}/material/search?name=${safeSearchTerm}`);
}
