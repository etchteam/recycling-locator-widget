import '@etchteam/diamond-ui/control/Button/Button';
import '@etchteam/diamond-ui/composition/Enter/Enter';

import '@/components/content/Icon/Icon';
import config from '@/config';
import i18n from '@/lib/i18n';
import { usePostcodeLoaderData } from '@/pages/[postcode]/postcode.loader';
import { RecyclingMeta } from '@/types/locatorApi';

interface TipContentProps {
  readonly tip?: RecyclingMeta;
  readonly ctaWidth?: 'full-width' | 'full-width-mobile';
}

function CtaLink({ tip, ctaWidth }: TipContentProps) {
  const locale = i18n.language;
  const { inWales } = usePostcodeLoaderData();

  /* Locations in Wales have separate en links to match different recycling requirements */
  const cta = inWales && locale !== 'cy' ? tip.ctaCyEn : tip.cta;
  const ctaLink = inWales && locale !== 'cy' ? tip.ctaLinkCyEn : tip.ctaLink;

  return (
    <diamond-button width={ctaWidth} className="diamond-spacing-top-md">
      <a href={ctaLink} target="_blank" rel="noopener noreferrer">
        {cta}
        <locator-icon icon="external"></locator-icon>
      </a>
    </diamond-button>
  );
}

export default function TipContent({
  tip,
  ctaWidth = 'full-width',
}: TipContentProps) {
  if (!tip) {
    return null;
  }

  return (
    <diamond-enter type="fade">
      <img
        className="diamond-spacing-bottom-sm"
        src={tip.image ?? config.imagePath + 'material-tip.svg'}
        alt=""
      />
      <p className="diamond-text-weight-bold">{tip.subtitle}</p>
      <h2>{tip.title}</h2>
      <p>{tip.content}</p>
      {tip.cta && tip.ctaLink && <CtaLink tip={tip} ctaWidth={ctaWidth} />}
    </diamond-enter>
  );
}
