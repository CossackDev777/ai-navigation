import { Field } from 'payload'

export interface CustomIdFieldProps {
  idName?: string;
}

export const customIdField: Field = {
  name: 'idName',
  type: 'text',
  label: 'カスタムID名',
  admin: {
    description: '任意のカスタムID名を追加できます',
    position: 'sidebar',
  }
}

// カスタムID名のバリデーション関数
export const validateCustomId = (idName?: string): boolean => {
  if (!idName) return true; // 空文字列やundefinedの場合はOK

  // ID名に使用できない文字が含まれていないかチェック
  const validIdNamePattern = /^[a-zA-Z0-9_-][\w-]*$/;
  return validIdNamePattern.test(idName);
};
