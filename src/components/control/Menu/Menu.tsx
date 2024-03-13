import { Fragment } from 'preact';
import { Link } from 'react-router-dom';

import { formatPostcode } from '@/lib/format';
import { usePostcodeLoaderData } from '@/pages/[postcode]/postcode.loader';

export default function Menu() {
  const { postcode, city } = usePostcodeLoaderData();

  const items = [
    {
      icon: 'pin',
      text: 'Change your location',
      to: '/',
    },
    {
      icon: 'search',
      text: 'Recycle a specific item',
      to: `/${postcode}`,
    },
    {
      icon: 'home',
      text: 'Check your home recycling',
      to: `/${postcode}/home`,
    },
    {
      icon: 'distance',
      text: 'Find nearby places to recycle',
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
          <diamond-enter type="fade">
            <p className="diamond-text-size-h4 diamond-spacing-bottom-md">
              What do you want to do?
            </p>
            <hr className="diamond-spacing-bottom-md" />
          </diamond-enter>
          {items.map((item, i) => (
            <diamond-enter type="fade-in-up" key={item.icon} delay={i * 0.1}>
              <locator-icon-link
                key={item.icon}
                className="diamond-spacing-bottom-md"
              >
                <Link to={item.to}>
                  <locator-icon-circle>
                    <locator-icon icon={item.icon} />
                  </locator-icon-circle>
                  {item.text}
                </Link>
              </locator-icon-link>
              {i < items.length - 1 && (
                <hr className="diamond-spacing-bottom-md" />
              )}
            </diamond-enter>
          ))}
        </diamond-wrap>
      </diamond-section>
    </>
  );
}
