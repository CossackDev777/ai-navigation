export type LayoutType = 'horizontal' | 'vertical';

/**
 * Determines the optimal `sizes` attribute based on the screen width and layout type.
 *
 * @param layout - The layout type, either 'horizontal' or 'vertical'.
 * @returns The appropriate sizes string for the image.
 */
export const getSizes = (layout: LayoutType): string => {
  if (typeof window !== 'undefined') {
    const screenWidth = window.innerWidth;

    if (layout === 'horizontal') {
      if (screenWidth <= 768) return '33vw';
      if (screenWidth <= 1024) return '20vw';
      return '33vw';
    } else {
      if (screenWidth <= 768) return '50vw';
      if (screenWidth <= 1024) return '40vw';
      return '50vw';
    }
  }

  // Default values for SSR (Server-Side Rendering)
  return layout === 'horizontal' ? '33vw' : '50vw';
};
