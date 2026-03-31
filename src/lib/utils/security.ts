/**
 * Escapes characters that have special meaning in XML/SVG to their respective entities.
 * This prevents XSS and malformed XML when user-provided data is interpolated into strings.
 *
 * @param str The string to escape
 * @returns The escaped string
 */
export const escapeXml = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: return char;
    }
  });
};
