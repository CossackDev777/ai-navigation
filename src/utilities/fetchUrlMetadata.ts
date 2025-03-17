// src/utilities/fetchUrlMetadata.ts
import ogs from 'open-graph-scraper';
import type { OpenGraphScraperOptions } from 'open-graph-scraper/types';

export async function fetchUrlMetadata(url: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const options: OpenGraphScraperOptions = {
      url,
      fetchOptions: {
        signal: controller.signal,
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'accept': 'text/html,application/xhtml+xml',
        },
      },
      customMetaTags: [
        { multiple: false, property: 'twitter:title', fieldName: 'twitterTitle' },
        { multiple: false, property: 'twitter:description', fieldName: 'twitterDescription' },
        { multiple: false, property: 'twitter:image', fieldName: 'twitterImage' },
      ],
    };


    const { result, error } = await ogs(options);
    clearTimeout(timeoutId);

    if (error) {
      console.error('OGS Error:', error);
      throw new Error('Metadata extraction failed');
    }

    return {
      title: result.ogTitle || result.twitterTitle || '',
      description: result.ogDescription || result.twitterDescription || '',
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || '',
      url: url,
    };

  } catch (error) {
    console.error('Fetch Error:', {
      url,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    // フォールバック処理
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      const html = await res.text();
      return {
        title: new URL(url).hostname,
        description: html.match(/<title>(.*?)<\/title>/i)?.[1] || '',
        image: '',
        url: url,
      };
    } catch (fallbackError) {
      return {
        title: new URL(url).hostname,
        description: '',
        image: '',
        url: url,
      };
    }
  }
}
