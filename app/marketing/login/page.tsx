import { Suspense } from 'react'
import { LoginForm } from './login-form'

function LoginFallback() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="bg-white border-b border-[#E5E5E5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="h-8 w-24 bg-[#E5E5E5] rounded animate-pulse" />
            <div className="h-4 w-32 bg-[#E5E5E5] rounded animate-pulse" />
          </div>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center py-12 px-4 bg-[#FAFAFA]">
        <div className="w-full max-w-md p-8 border border-[#E5E5E5] rounded-lg bg-white shadow-sm space-y-6">
          <div className="h-8 bg-[#E5E5E5] rounded animate-pulse w-3/4 mx-auto" />
          <div className="h-4 bg-[#E5E5E5] rounded animate-pulse w-1/2 mx-auto" />
          <div className="h-10 bg-[#E5E5E5] rounded animate-pulse" />
          <div className="h-10 bg-[#E5E5E5] rounded animate-pulse" />
          <div className="h-10 bg-[#FF6B00]/20 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  )
}
