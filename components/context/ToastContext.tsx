'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Toast, ToastProps } from '@/components/custom/Toast'

type ToastContextType = {
  showToast: (state: ToastProps['state'], message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toastProps, setToastProps] = useState<ToastProps | null>(null)

  const showToast = (state: ToastProps['state'], message: string, duration = 3000) => {
    setToastProps({ state, message, duration, onClose: () => setToastProps(null) })
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastProps && <Toast {...toastProps} />}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}