import i18n from '@/lib/i18n';
import { Locale } from '@/types/locale';
import { PROPERTY_TYPE_CY, PROPERTY_TYPE_EN } from '@/types/locatorApi';

export default function getPropertyTypeEnum() {
  const locale = i18n.language as Locale;
  return locale === 'cy' ? PROPERTY_TYPE_CY : PROPERTY_TYPE_EN;
}
