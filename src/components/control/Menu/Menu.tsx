import { Fragment } from 'preact';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { formatPostcode } from '@/lib/format';
import { usePostcodeLoaderData } from '@/pages/[postcode]/postcode.loader';

export default function Menu() {
  const { postcode, city } = usePostcodeLoaderData();
  const { t } = useTranslation();

  const items = [
    {
      icon: 'pin',
      text: t('components.menu.changeLocation'),
      to: '/',
    },
    {
      icon: 'search',
      text: t('components.menu.recycleSpecificItem'),
      to: `/${postcode}`,
    },
    {
      icon: 'home',
      text: t('components.menu.homeRecycling'),
      to: `/${postcode}/home`,
    },
    {
      icon: 'distance',
      text: t('components.menu.findNearbyPlaces'),
      to: `/${postcode}/places`,
    },
  ];
  return (
    <>
      <diamond-enter type="fade">
        <locator-context-header>
          <div>
            <span className="diamond-text-weight-bold">
              {formatPostcode(postcode)}
            </span>{' '}
            &ndash; {city}
          </div>
        </locator-context-header>
      </diamond-enter>
      <diamond-section padding="md">
        <diamond-wrap>
          <diamond-enter type="fade" class="diamond-spacing-bottom-md">
            <p className="diamond-text-size-h4">
              {t('components.menu.whatDoYouWantToDo')}
            </p>
          </diamond-enter>
          <locator-bordered-list>
            <ul>
              {items.map((item, i) => (
                <li key={item.icon}>
                  <diamond-enter type="fade" delay={i * 0.1}>
                    <locator-icon-link key={item.icon}>
                      <Link to={item.to}>
                        <locator-icon-circle>
                          <locator-icon icon={item.icon} />
                        </locator-icon-circle>
                        {item.text}
                      </Link>
                    </locator-icon-link>
                  </diamond-enter>
                </li>
              ))}
            </ul>
          </locator-bordered-list>
        </diamond-wrap>
      </diamond-section>
    </>
  );
}
