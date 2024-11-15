import { Button } from "@/components/ui/button"

export default function ConfirmRegisterEmail({ id }: { id: string }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Confirm Email - Sprintify</title>
        <link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.0.0/dist/tailwind.min.css' rel='stylesheet' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />{" "}
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body className='font-sans max-w-[600px] mx-auto p-6 bg-gray-100'>
        <div className="font-['Bricolage_Grotesque',sans-serif] max-w-[600px] mx-auto p-6 bg-gray-100">
          <div className='bg-white p-8 rounded-2xl shadow-lg'>
            <h1 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>Welcome to Sprintify!</h1>
            <p className='text-gray-600 mb-6 text-center'>
              Thank you for registering. Please confirm your email to get started with managing your Scrum workflow.
            </p>
            <div className='text-center'>
              <a
                href={`${process.env.BASE_URL}/signup?confirmUserId=${id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-blue-500 hover:bg-blue-600 text-white font-normal py-3 px-6 rounded-full inline-block no-underline shadow-md transition-all duration-300 ease-in-out hover:shadow-lg'>
                Confirm Email & Log In
              </a>
            </div>
            <p className='text-sm text-gray-500 mt-8 text-center'>
              If you didn&apos;t create an account with Sprintify, please ignore this email.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
// return (

//   <div className="font-sans max-w-[600px] mx-auto p-6 bg-gray-100">
//     <div className="bg-white p-8 rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome to Sprintify!</h1>
//       <p className="text-gray-600 mb-6 text-center">
//         Thank you for registering. Please confirm your email to get started with managing your Scrum workflow.
//       </p>
//       <div className="text-center">
//         <Button
//           asChild
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//         >
//           <a href={`${process.env.BASE_URL}/signup?confirmUserId=${id}`} target="_blank">
//             Confirm Email & Log In
//           </a>
//         </Button>
//       </div>
//       <p className="text-sm text-gray-500 mt-6 text-center">
//         If you didn&apos;t create an account with Sprintify, please ignore this email.
//       </p>
//     </div>
//   </div>
// )
