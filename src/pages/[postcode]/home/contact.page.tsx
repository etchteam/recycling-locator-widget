import { useTranslation } from 'react-i18next';

import '@/components/composition/BorderedList/BorderedList';

import { useHomeRecyclingLoaderData } from './home.loader';

export default function HomeRecyclingPage() {
  const { t } = useTranslation();
  const { localAuthority } = useHomeRecyclingLoaderData();
  const tContext = 'homeRecycling.contact';

  return (
    <>
      <h3>{t(`${tContext}.title`)}</h3>
      <locator-bordered-list size="sm">
        <h4>{localAuthority.name}</h4>
        <dl>
          <div>
            <dt>{t(`${tContext}.website`)}</dt>
            <dd>
              <a
                href={localAuthority.recyclingUri}
                target="_blank"
                rel="noopener noreferrer"
              >
                {localAuthority.recyclingUri}
              </a>
            </dd>
          </div>
          <div>
            <dt>{t(`${tContext}.phone`)}</dt>
            <dd>{localAuthority.enquiryNumber}</dd>
          </div>
          <div>
            <dt>{t(`${tContext}.notes.title`)}</dt>
            <dd>
              <p>{t(`${tContext}.notes.paragraphOne`)}</p>
              <ul>
                {(t(`${tContext}.notes.list`) as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{t(`${tContext}.notes.paragraphTwo`)}</p>
            </dd>
          </div>
        </dl>
      </locator-bordered-list>
    </>
  );
}
