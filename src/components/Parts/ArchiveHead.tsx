import React from 'react';

interface ArchiveHeadProps {
  title: string;
  className?: string;
}

export const ArchiveHead: React.FC<ArchiveHeadProps> = ({ title, className }) => {
  return (
    <div className={`archive__header ${className}`}>
      <div className="prose max-w-full px-6 text-center">
        <h1 className="archive__header_title en">{title}</h1>
        <p className="text-p-sm text-slate-700 font-noto tracking-body">全ての企業にAIの力を<br/>AI naviがお届けする生成AI活用マガジン</p>
      </div>
    </div>
  );
};
