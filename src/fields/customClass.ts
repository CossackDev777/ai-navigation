import { Field } from 'payload'

export interface CustomClassFieldProps {
  className?: string;
}

export const customClassField: Field = {
  name: 'className',
  type: 'text',
  label: 'カスタムクラス名',
  admin: {
    description: '任意のカスタムクラス名を追加できます',
    position: 'sidebar',
  }
}

// カスタムクラス名のバリデーション関数
export const validateCustomClass = (className?: string): boolean => {
  if (!className) return true; // 空文字列やundefinedの場合はOK

  // クラス名に使用できない文字が含まれていないかチェック
  const validClassNamePattern = /^[a-zA-Z0-9_-][\w-]*$/;
  return validClassNamePattern.test(className);
};

// クラス名を結合するユーティリティ関数
export const combineClassNames = (...classNames: (string | undefined)[]): string => {
  return classNames.filter(Boolean).join(' ');
};
