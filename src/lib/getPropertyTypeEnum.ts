import i18n from '@/lib/i18n';
import { PROPERTY_TYPE_CY, PROPERTY_TYPE_EN } from '@/types/locatorApi';

export default function getPropertyTypeEnum() {
  const locale = i18n.language;
  return locale === 'cy' ? PROPERTY_TYPE_CY : PROPERTY_TYPE_EN;
}
