'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { signUp } from '../../actions'
import { signupSchema } from '../../schema'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const SignupPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const signUPCall = await signUp(data)
      if (signUPCall.success) {
        toast.success(signUPCall.message, {
          duration: 1800,
        })
        reset()
        router.push('/agency/login')
      }
      reset()
    } catch (error) {
      toast.error(error.message || 'Something went wrong! Please try again', {
        duration: 1800,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[500px] mx-auto min-h-[calc(100vh-104px)] flex flex-col items-center justify-center">
      <div className="w-full">
        <h1 className="text-primary font-bold text-3xl text-center">エージェンシーサインアップ</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
          <div className="flex flex-col gap-4">
            <div>
              <Label>名前</Label>
              <Input
                type="text"
                {...register('name')}
                placeholder="名前"
                className="focus-visible:!ring-offset-0 mt-1.5 bg-white"
              />
              <span className="text-end text-red-600 text-xs mt-0.5 block">
                {errors.name?.message}
              </span>
            </div>

            <div>
              <Label>メール</Label>
              <Input
                type="email"
                {...register('email')}
                placeholder="メール"
                className="focus-visible:!ring-offset-0 mt-1.5 bg-white"
              />
              <span className="text-end text-red-600 text-xs mt-0.5 block">
                {errors.email?.message}
              </span>
            </div>

            <div>
              <Label>パスワード</Label>
              <Input
                type="password"
                {...register('password')}
                placeholder="パスワード"
                className="focus-visible:!ring-offset-0 mt-1.5 bg-white"
              />
              <span className="text-end text-red-600 text-xs mt-0.5 block">
                {errors.password?.message}
              </span>
            </div>

            <div>
              <Label>パスワード確認</Label>
              <Input
                type="password"
                {...register('cpassword')}
                placeholder="パスワード確認"
                className="focus-visible:!ring-offset-0 mt-1.5 bg-white"
              />
              <span className="text-end text-red-600 text-xs mt-0.5 block">
                {errors.cpassword?.message}
              </span>
            </div>

            <div>
              <Label>会社名</Label>
              <Input
                type="text"
                {...register('companyName')}
                placeholder="会社名"
                className="focus-visible:!ring-offset-0 mt-1.5 bg-white"
              />
              <span className="text-end text-red-600 text-xs mt-0.5 block">
                {errors.companyName?.message}
              </span>
            </div>
          </div>
          <Button
            type="submit"
            variant="default"
            className="w-full rounded-full mt-5"
            disabled={loading}
          >
            サインアップ
          </Button>
          <span className="mt-5 text-center text-sm block">
            すでにアカウントをお持ちですか？{' '}
            <Link
              href={'/agency/login'}
              className="text-primary transition duration-300 hover:underline"
            >
              ログイン
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
