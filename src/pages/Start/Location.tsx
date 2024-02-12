import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export default function StartLocationPage() {
  const { t } = useTranslation();
  const { postcode } = useParams();

  return (
    <h2>
      {t('start.location.title')} {postcode}
    </h2>
  );
}
