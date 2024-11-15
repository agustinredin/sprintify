"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"

type ToastState = "success" | "error" | "warning" | "info"

export interface ToastProps {
  state: ToastState
  message: string
  duration: number
  onClose: () => void
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const bgColorMap = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
}

export function Toast({ state, message, duration, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 500) // Match this with the animation duration
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const Icon = iconMap[state]

  return (
    <div
    className={`fixed bottom-4 right-0 flex items-center justify-end pointer-events-none transition-all duration-500 ease-in-out ${
      isVisible ? 'translate-x-0' : 'translate-x-full'
    }`}
  >
    <div
      className={`flex items-center p-4 text-white rounded-lg shadow-xl ${bgColorMap[state]} transition-all duration-500 ease-in-out ${
        isExiting ? 'translate-x-full' : '-translate-x-4'
      } max-w-md w-full mr-0`}
      role="alert"
      >
        <Icon className="flex-shrink-0 w-6 h-6 mr-3" />
        <div className="flex-grow">
          <span className="sr-only">{state}:</span>
          <div className="text-lg font-medium break-words">{message}</div>
        </div>
        <button
          type="button"
          className="flex-shrink-0 ml-5 rounded-lg focus:ring-2 focus:ring-gray-300 inline-flex text-white hover:bg-gray-100 hover:text-black/50 pointer-events-auto"
          aria-label="Close"
          onClick={() => {
            setIsExiting(true)
            setTimeout(() => {
              setIsVisible(false)
              onClose()
            }, 500) // Match this with the animation duration
          }}
        >
          <span className="sr-only">Close</span>
          <XCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
