const fallbackImage = '/assets/umrah-hajj.jpg';

export function getImageUrl(value: string | null | undefined): string {
  if (!value || value.startsWith('/airo-assets/')) {
    return fallbackImage;
  }

  return value;
}
