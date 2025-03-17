'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { login } from '../../actions'
import { loginSchema } from '../../schema'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const user = await login(data)

      if (user.success) {
        toast.success(user.message, {
          duration: 1800,
        })
        reset()
        router.push('/agency/my-account')
      }
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
        <h1 className="text-primary font-bold text-3xl text-center">掲載企業専用ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-6">
          <div className="flex flex-col gap-4">
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
          </div>
          <Button
            type="submit"
            variant="default"
            className="w-full rounded-full mt-5"
            disabled={loading}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </Button>
          <Button type="button" variant="outline" className="w-full rounded-full mt-5">
            Googleでログイン
          </Button>

          <span className="mt-5 text-center text-sm block">
            アカウントをお持ちではありませんか？{' '}
            <Link
              href={'/agency/signup'}
              className="text-primary transition duration-300 hover:underline"
            >
              サインアップ
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
