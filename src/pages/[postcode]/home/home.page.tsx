import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import '@etchteam/diamond-ui/canvas/Card/Card';

import '@/components/content/Container/Container';
import SchemeContainerSummary from '@/components/template/SchemeContainerSummary/SchemeContainerSummary';
import getPropertyDisplayName from '@/lib/getPropertyDisplayName';

import { useHomeRecyclingLoaderData } from './home.loader';

export default function HomeRecyclingPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();
  const { properties } = useHomeRecyclingLoaderData();
  const propertyTypes = Object.keys(properties);

  return (
    <section className="diamond-spacing-bottom-lg">
      <h3>{t('homeRecycling.collections.title')}</h3>
      <p>{t('homeRecycling.collections.help')}</p>

      {propertyTypes.map((propertyType) => {
        const safePropertyType = encodeURIComponent(propertyType);
        const property = properties[propertyType];
        const containers = property.flatMap((scheme) => scheme.containers);

        return (
          <Link
            to={`/${postcode}/home/collection?propertyType=${safePropertyType}`}
            key={safePropertyType}
          >
            <diamond-card className="diamond-spacing-bottom-md" border radius>
              <h4 className="diamond-spacing-bottom-md">
                {getPropertyDisplayName(properties, propertyType)}
              </h4>
              <SchemeContainerSummary containers={containers} limit={3} />
            </diamond-card>
          </Link>
        );
      })}
    </section>
  );
}
