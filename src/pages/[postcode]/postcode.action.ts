import { ActionFunctionArgs, redirect } from 'react-router-dom';

import LocatorApi from '@/lib/LocatorApi';
import { MaterialSearchResponse } from '@/types/locatorApi';

export default async function postcodeAction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const materials = await LocatorApi.post<MaterialSearchResponse[]>(
    'materials',
    formData,
  );
  const { name, id } = materials?.[0] ?? {};
  const postcode = params.postcode;

  if (name === formData.get('search')) {
    const safeName = encodeURIComponent(name);
    return redirect(`/${postcode}/material?id=${id}&name=${safeName}`);
  }

  return redirect(`/${postcode}/material/not-found`);
}
