import i18n from '@/lib/i18n';

export interface ContainerNameArgs {
  readonly displayName: string;
  readonly bodyColour?: string;
  readonly lidColour?: string;
}

export default function containerName({
  displayName,
  bodyColour,
  lidColour,
}: ContainerNameArgs) {
  const bodyColourName = i18n.t(`components.container.${bodyColour}`, {
    defaultValue: '',
  });
  const lidColourName = i18n.t(`components.container.${lidColour}`, {
    defaultValue: '',
  });

  if (lidColourName && lidColourName !== bodyColourName) {
    return `${bodyColourName} ${i18n.t('common.and')} ${lidColourName} ${displayName}`;
  }

  if (bodyColourName && i18n.language === 'cy') {
    // In Welsh, the object comes first followed by the descriptor
    return `${displayName} ${bodyColourName}`;
  }

  if (bodyColourName) {
    return `${bodyColourName} ${displayName}`;
  }

  return displayName;
}
