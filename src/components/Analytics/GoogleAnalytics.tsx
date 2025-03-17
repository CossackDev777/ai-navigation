'use client'

import Script from 'next/script'

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  // 開発環境またはGA_IDが設定されていない場合は何も表示しない
  if (!gaId || process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  )
}
