'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { getClientSideURL, getServerSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/cn'
import { StepsBlock } from '@/blocks/Steps/Component'
import { BannerCard } from '@/blocks/Banner/Component'
import './Component.scss'
import { CheckIcon } from 'lucide-react'

const SuccessIcon = <CheckIcon className="h-6 w-6" />

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  introLayout?: 'full' | 'half' | 'oneThird' | 'twoThirds'
  form: FormType
  introContent?: {
    [k: string]: unknown
  }[]
  steps?: any[]
}

export const FormBlock: React.FC<
  {
    id?: string
    title?: string
    subTitle?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    introLayout = 'full',
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    steps,
    title,
    subTitle,
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  // Use refs to maintain references to DOM elements
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const fileNameRef = useRef<HTMLSpanElement | null>(null)

  // Watch the file_url field to update the display
  const fileUrl = watch('file_url')

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            const redirectUrl = url
            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  const layoutStyle = 'grid__layout'
  const colsSpanClasses = {
    full: { intro: '10', form: '10' },
    half: { intro: '5', form: '5' },
    oneThird: { intro: '4', form: '6' },
  }
  const colFull = introLayout === 'full'
  const colHalf = introLayout === 'half'
  const colOneThird = introLayout === 'oneThird'

  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const existingInput = document.querySelector('input[name="file_url"]')
    if (!existingInput || wrapperRef.current) return

    if (existingInput?.parentElement?.parentElement) {
      existingInput.parentElement.parentElement.className = 'hidden absolute -z-1'
    }

    const wrapper = document.createElement('div')
    wrapper.className = 'flex items-center gap-2 border bg-[hsl(210,20%,98%)] p-4'
    wrapperRef.current = wrapper

    const fileUpload = document.createElement('input')
    fileUpload.type = 'file'
    fileUpload.style.display = 'none'
    fileInputRef.current = fileUpload

    const fileLabel = document.createElement('button')
    fileLabel.type = 'button'
    fileLabel.className =
      'bg-primary text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2'
    updateButtonContent(fileLabel, false)

    const fileNameSpan = document.createElement('span')
    fileNameSpan.className = 'flex-1'
    fileNameSpan.textContent = 'ファイルが選択されていません'
    Object.assign(fileNameSpan.style, {
      fontSize: '14px',
      color: '#555',
    })
    fileNameRef.current = fileNameSpan

    function updateButtonContent(button, loading) {
      button.innerHTML = ''
      if (loading) {
        const spinner = document.createElement('span')
        spinner.className = 'animate-spin'
        spinner.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>`
        button.appendChild(spinner)
        const text = document.createElement('span')
        text.textContent = 'アップロード中...'
        button.appendChild(text)
        button.disabled = true
      } else {
        button.textContent = 'アップロード'
        button.disabled = false
      }
    }

    const handleFileChange = async (event) => {
      const file = event.target.files?.[0]
      if (file) {
        setIsUploading(true)
        updateButtonContent(fileLabel, true)

        const formData = new FormData()
        formData.append('file', file)

        try {
          const response = await fetch('/api/files', {
            method: 'POST',
            body: formData,
          })
          const data = await response.json()

          if (data.destFileName) {
            setValue(
              'file_url',
              `https://ai-navigation.co.jp/files?destFileName=${data.destFileName}`,
            )
            fileNameRef.current.textContent = file.name
          } else {
            console.error('Upload failed', data)
          }
        } catch (error) {
          console.error('Upload error', error)
        } finally {
          setIsUploading(false)
          updateButtonContent(fileLabel, false)
        }
      }
    }

    fileUpload.addEventListener('change', handleFileChange)

    const handleButtonClick = (e) => {
      e.preventDefault()
      if (!isUploading) {
        fileInputRef.current?.click()
      }
    }

    fileLabel.addEventListener('click', handleButtonClick)

    wrapper.appendChild(fileUpload)
    wrapper.appendChild(fileNameSpan)
    wrapper.appendChild(fileLabel)

    const el = existingInput?.parentElement?.parentElement
    el?.parentNode?.insertBefore(wrapper, el)

    return () => {
      fileUpload.removeEventListener('change', handleFileChange)
      fileLabel.removeEventListener('click', handleButtonClick)
    }
  }, [setValue, isUploading])

  return (
    <div
      className={introLayout && !colFull ? 'grid lg:grid-cols-10' : 'container lg:max-w-[48rem]'}
    >
      {enableIntro && introContent && (
        <div
          className={cn(
            layoutStyle,
            'col__text',
            `flex flex-col gap-12 mx-0 px-6 lg:col-span-${colsSpanClasses[introLayout].intro}`,
            introLayout && !colFull && 'py-8 lg:py-16 xl:px-16',
          )}
        >
          {/* After Submit */}
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div className={cn('block__content block__form_title')}>
              <div className="section__title">
                <h2 className="text-page-h2 font-bold font-title text-gradient">Thank you</h2>
                <p className="text-post-h3 sm:text-post-h2 font-bold tracking-wider">
                  フォーム送信完了
                </p>
              </div>
              <div className="step-list dark">
                <div className="step-list_item">
                  <div className="step-list__image">{SuccessIcon}</div>
                </div>
              </div>
            </div>
          )}
          {/* Before Submit */}
          {!hasSubmitted && (
            <>
              <div className="block__content block__form_text">
                <h2 className="posc__title posc__title_h2 text-post-h2 font-bold">
                  <strong>{title}</strong>
                </h2>
                <RichText className={cn('mx-0')} content={introContent} enableGutter={false} />
              </div>
              {steps && steps.length > 0 && <StepsBlock steps={steps} />}
            </>
          )}
        </div>
      )}
      <div
        className={cn(
          'block__form_fields',
          introLayout
            ? `${layoutStyle} lg:col-span-${colsSpanClasses[introLayout].form}`
            : 'block__form',
          introLayout && !colFull && 'p-8 lg:p-12 xl:px-16 bg-white',
        )}
      >
        <div
          className={cn(
            colFull
              ? 'form__inner p-4 lg:p-6 border border-border rounded-[0.8rem]'
              : 'form__inner px-0 py-6',
          )}
        >
          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <div className="flex flex-col gap-8">
                <RichText content={confirmationMessage} enableGutter={false} />
                <BannerCard style="info" className="py-4">
                  <div className="form__message_card flex flex-col gap-2">
                    <p>ご記入頂いたメールアドレスへ、自動返信の確認メールをお送りしております。</p>
                    <p>
                      しばらく経ってもメールが届かない場合は、入力頂いたメールアドレスが間違っているか、迷惑メールフォルダに振り分けられている可能性がございます。
                    </p>
                    <p>
                      また、ドメイン指定をされている場合は、「<strong>@ai-navigation.co.jp</strong>
                      」からのメールが受信できるようあらかじめ設定をお願いいたします。
                    </p>
                  </div>
                </BannerCard>
              </div>
            )}
            {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
            {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
            {!hasSubmitted && (
              <form className="form" id={formID} onSubmit={handleSubmit(onSubmit)}>
                <div className="form__fields">
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType]
                      if (Field) {
                        return (

                            <Field
                              key={index}
                              form={formFromProps}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                        )
                      }
                      return null
                    })}
                </div>

                <Button form={formID} type="submit" variant="default">
                  {submitButtonLabel}
                </Button>
              </form>
            )}
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
