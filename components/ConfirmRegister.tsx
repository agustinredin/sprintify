import { Button } from "@/components/ui/button"

export default function ConfirmRegister({email} : {email: string}) {
  return (
    <div className="font-sans max-w-[600px] mx-auto p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome to Sprintify!</h1>
        <p className="text-gray-600 mb-6 text-center">
          Thank you for registering. Please confirm your email to get started with managing your Scrum workflow.
        </p>
        <div className="text-center">
          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            <a href={`${process.env.BASE_URL}/signup?confirmUser=${email}`} target="_blank">
              Confirm Email & Log In
            </a>
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-6 text-center">
          If you didn&apos;t create an account with Sprintify, please ignore this email.
        </p>
      </div>
    </div>
  )
}