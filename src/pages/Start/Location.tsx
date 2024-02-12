import { useTranslation } from 'react-i18next';

export default function StartLocationPage() {
  const { t } = useTranslation();

  return <h2>{t('start.location.title')}</h2>;
}
