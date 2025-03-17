import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  name: yup.string().required('名前は必須です'),
  email: yup.string().email('無効なメール形式です').required('メールは必須です'),
  password: yup.string().required('パスワードは必須です'),
  cpassword: yup
    .string()
    .oneOf([yup.ref('password')], 'パスワードが一致する必要があります')
    .required('パスワード確認は必須です'),
  companyName: yup.string().required('会社名は必須です'),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('無効なメール形式です').required('メールは必須です'),
  password: yup.string().required('パスワードは必須です'),
})