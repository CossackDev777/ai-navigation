'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Typekit: {
      load: (config: { kitId: string }) => void;
    };
  }
}

export function AdobeFont() {
  useEffect(() => {
    ((d: Document) => {
      const config = {
        kitId: `${process.env.NEXT_PUBLIC_KIT_ID}`,
        scriptTimeout: 3000,
        async: true,
      };
      console.log('Adobe Font Config:', config);

      const h = d.documentElement;
      const t = setTimeout(() => {
        h.className = `${h.className.replace(/\bwf-loading\b/g, '')} wf-inactive`;
        console.log('Adobe Font Loading Timeout');
      }, config.scriptTimeout);
      const tk = d.createElement('script');

      h.className += 'wf-loading';
      tk.src = `https://use.typekit.net/${config.kitId}.js`;
      tk.async = true;
      tk.onload = () => {
        clearTimeout(t);
        try {
          console.log('Adobe Font Script Loaded');
          (window as Window).Typekit.load(config);
          console.log('Adobe Font Successfully Initialized');
        } catch (e) {
          console.error('Adobe Font Loading Error:', e);
        }
      };
      tk.onerror = () => {
        clearTimeout(t);
        console.error('Adobe Font Script Failed to Load');
      };

      const s = d.getElementsByTagName('script')[0];

      if (s.parentNode) {
        s.parentNode.insertBefore(tk, s);
      }
    })(document);
  }, []);

  return null;
}
