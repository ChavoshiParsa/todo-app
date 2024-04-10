import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import sanitizeHtml from 'sanitize-html';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function szh(text: string) {
  const sanitizeConf = {
    allowedTags: ['b', 'i', 'a', 'p'],
    allowedAttributes: { a: ['href'] },
  };
  return sanitizeHtml(text, sanitizeConf);
}
