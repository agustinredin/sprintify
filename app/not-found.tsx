"use client"
import { Button } from "@/components/ui/button"
import { FileIcon } from "@/components/ui/icons"


export default function NotFound() {
  function handleClick() {
    window.history.back()
  }

  return (
    <div className='flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-md text-center'>
        <FileIcon className='mx-auto h-12 w-12 text-primary' />
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>Oops! Page not found</h1>
        <p className='mt-4 text-muted-foreground'>
          The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        <div className='mt-6'>
          <Button
            onClick={handleClick}
            className='inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
