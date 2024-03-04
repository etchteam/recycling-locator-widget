import { useTranslation } from 'react-i18next';

import '@/components/content/PlaceSummary/PlaceSummary';
import { Location } from '@/types/locatorApi';

export default function Place({
  location,
  withAddress = true,
}: {
  readonly location: Location;
  readonly withAddress?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <locator-place-summary>
      <h4>{location.name}</h4>
      {withAddress && <p>{location.address}</p>}
      <dl>
        <dd>{location.distance}</dd>
        <dt>
          {t('common.miles', {
            count: location.distance,
          })}
        </dt>
        <dd>{location.materials.length}</dd>
        <dt>
          {t('common.materialsAccepted', {
            count: location.materials.length,
          })}
        </dt>
      </dl>
    </locator-place-summary>
  );
}
