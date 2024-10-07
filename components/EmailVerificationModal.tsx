import { Button } from "@/components/ui/button"
import { AlertCircle, XIcon } from "lucide-react"
import { verifyUserSession } from "@/app/actions/userActions"

async function EmailVerificationModal() {
  const userResult = await verifyUserSession()

  if (!userResult || userResult.verified) {
    return null
  }

  return (
    <div className="border-b border-gray-200 mb-4">
      <div className="py-4">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-blue-50">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </span>
            <div className="ml-3 font-medium text-gray-700">
              <span className="md:hidden">Verify your email</span>
              <span className="hidden md:inline">Your email address is not verified</span>
              <p className="text-sm text-gray-500 mt-1">
                Please check your inbox and verify your email to access all features
              </p>
            </div>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <Button
              variant="secondary"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Resend verification
            </Button>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerificationModal