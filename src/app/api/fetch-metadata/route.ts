// app/api/fetch-metadata/route.ts
import ogs from 'open-graph-scraper';
import type { OpenGraphScraperOptions } from 'open-graph-scraper/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return Response.json({ error: 'URL required' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒タイムアウト
    const options: OpenGraphScraperOptions = {
      url,
      fetchOptions: {  // 正しいプロパティ名
        signal: controller.signal,
        headers: {
          'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
      }
    };

    const { result } = await ogs(options);
    clearTimeout(timeoutId);

    return Response.json({
      title: result.ogTitle || result.twitterTitle,
      description: result.ogDescription || result.twitterDescription,
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url
    });

  } catch (error: any) {
    if (error.name === 'AbortError') {
      return Response.json(
        { error: 'リクエストがタイムアウトしました' },
        { status: 408 }
      );
    }
    return Response.json(
      { error: 'メタデータの取得に失敗しました' },
      { status: 500 }
    );
  }
}
