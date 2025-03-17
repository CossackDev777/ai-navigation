import React from 'react'
import { EmbedUrlBlock as EmbedUrlProps } from '@/payload-types'


export const EmbedUrl: React.FC<{ block: EmbedUrlProps }> = ({ block }) => {
  const { embedUrl, metadata } = block;

  if (!embedUrl) return null;

  return (
    <div className="embed-url-block">
      <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="embed-url-link">
        {metadata?.image && (
          <img src={metadata.image} alt={metadata.title || 'Embedded content'} className="embed-url-image" />
        )}
        <div className="embed-url-content">
          {metadata?.title && <h3 className="embed-url-title">{metadata.title}</h3>}
          {metadata?.description && <p className="embed-url-description">{metadata.description}</p>}
          <p className="embed-url-domain">{new URL(embedUrl).hostname}</p>
        </div>
      </a>
    </div>
  );
};

export default EmbedUrl;
