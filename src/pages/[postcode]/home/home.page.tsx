import { useTranslation } from 'react-i18next';

import { useHomeRecyclingLoaderData } from './home.loader';

export default function HomeRecyclingPage() {
  const { t } = useTranslation();
  const { localAuthority } = useHomeRecyclingLoaderData();
  console.log(localAuthority);
  return (
    <>
      <h3>{t('homeRecycling.collections.title')}</h3>
      <p>{t('homeRecycling.collections.help')}</p>
    </>
  );
}
