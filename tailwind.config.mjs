/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  // darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
  prefix: '',
  safelist: [
    'lg:grid-cols-2',
    'lg:grid-cols-3',
    'lg:grid-cols-4',
    'lg:grid-cols-5',
    'lg:grid-cols-6',
    'lg:grid-cols-7',
    'lg:grid-cols-8',
    'lg:grid-cols-9',
    'lg:grid-cols-10',
    'lg:grid-cols-11',
    'lg:grid-cols-12',
    'lg:col-span-1',
    'lg:col-span-2',
    'lg:col-span-3',
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-light-gradient-20',
    'bg-light-10',
    'bg-light-20',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        sm: '90rem',
        md: '90rem',
        lg: '90rem',
        xl: '90rem',
        '2xl': '90rem',
      },
    },
    extend: {
      screens: {
        xs: '375px',
      },
      spacing: {
        card: 'var(--card-spacing)',
      },
      containerNames: {
        common: 'common',
      },
      containers: {
        '8xl': '90rem',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        common: 'var(--radius-common)',
      },
      colors: {
        basic: 'hsl(var(--basic))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        border: 'hsl(var(--border))',
        'border-foreground': 'hsl(var(--border-foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        third: {
          DEFAULT: 'hsl(var(--third))',
          foreground: 'hsl(var(--third-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
        'odd-row': 'hsl(var(--odd-row))',
        'even-row': 'hsl(var(--even-row))',
        border: 'hsl(var(--border))',
        light: {
          10: 'hsl(var(--light-10))',
          20: 'hsl(var(--light-20))',
        },
      },
      fontFamily: {
        mono: ['var(--font-syne-mono)'],
        sans: ['var(--font-family-base)'],
        title: [
          '"neulis-sans"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans',
        ],
        inter: ['var(--font-inter)'],
        ja: [
          '"monopin-j"',
          'var(--font-noto-sans-jp)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans',
        ],
        noto: [
          'var(--font-noto-sans-jp)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans',
        ],
        body: [
          'var(--font-noto-sans-jp)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans',
        ],
      },
      fontSize: {
        '2xs': '0.625rem',
        'p-xs': 'clamp(0.625rem, 0.125rem + 3.75vw, 0.75rem)',
        'p-sm': 'clamp(0.75rem, 0.5rem + 1.25vw, 0.875rem)',
        'p-body': 'clamp(0.875rem, 0.625rem + 1.25vw, 1rem)',
        'common': 'var(--font-size-common)',
        'card-def': 'clamp(0.875rem, 0.125rem + 3.75vw, 1.25rem)',
        'card-vert': 'clamp(0.875rem, 0.625rem + 1.25vw, 1rem)',
        'card-main': 'clamp(0.875rem, -0.675rem + 7.75vw, 1.65rem)',
        'post-h1': 'clamp(1.75rem, 1.3929rem + 1.7857vw, 2.25rem)',
        'post-h2': 'clamp(1.375rem, 1.1964rem + 0.8929vw, 1.625rem)',
        'post-h3': 'clamp(0.875rem, 0.125rem + 3.75vw, 1.25rem)',
        'post-h4': 'clamp(0.875rem, 0.625rem + 1.25vw, 1rem)',
        'page-h2': 'clamp(1.75rem, 1.3929rem + 1.7857vw, 2.875rem)',
        'page-h1': 'clamp(0.875rem, 0.125rem + 3.75vw, 1.25rem)',
        'page-h1-en': 'clamp(2rem, 0.3478rem + 8.2609vw, 4.375rem)',
        'btn-xl': 'clamp(0.875rem, 0.125rem + 3.75vw, 1.25rem)',
      },
      lineHeight: {
        'body': '1.8'
      },
      letterSpacing: {
        'body': '0.025em'
      },
      backgroundImage: {
        'gradient-40': 'linear-gradient(40deg, var(--tw-gradient-stops))',
        'light-gradient-20': 'linear-gradient(90deg, #E9F0FC, #EBEAF5)',
        'dark-gradient-20': 'linear-gradient(90deg, #7F64AD, #466BE2)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      gap: {
        main: 'var(--grid-gap--main)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            '--tw-prose-bullets': 'hsl(var(--secondary))',
            fontSize: '1rem',
            lineHeight: '1.65',
            h1: {
              fontSize: '3.5rem',
              fontWeight: 'normal',
              marginBottom: '0.25em',
            },
          },
        },
        sm: {
          css: {
            fontSize: '0.875rem', // prose-smのサイズを変更
          },
        },
      }),
    },
  },
}
