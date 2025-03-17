export const spacingField = {
  name: 'spacing',
  type: 'select',
  defaultValue: 'default',
  options: [
    {
      label: 'Small',
      value: 'small',
    },
    {
      label: 'Default',
      value: 'default',
    },
    {
      label: 'Large',
      value: 'large',
    },
    {
      label: 'None',
      value: 'none',
    }
  ],
  admin: {
    description: 'ブロックの上下の余白を設定します',
  },
}
