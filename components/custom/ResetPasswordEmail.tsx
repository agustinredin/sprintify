export default function ResetPasswordEmail({ id }: { id: string }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Reset your password - Sprintify</title>
        <link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.0.0/dist/tailwind.min.css' rel='stylesheet' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />{" "}
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body className='font-sans max-w-[600px] mx-auto p-6 bg-gray-100'>
        <div className="font-['Bricolage_Grotesque',sans-serif] max-w-[600px] mx-auto p-6 bg-gray-100">
          <div className='bg-white p-8 rounded-2xl shadow-lg'>
            <h1 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>Sprintify</h1>
            <p className='text-gray-600 mb-6 text-center'>
              You have requested a password reset. Follow the link below to continue.
            </p>
            <div className='text-center'>
              <a
                href={`${process.env.BASE_URL}/signup?resetPasswordUserId=${id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-blue-500 hover:bg-blue-600 text-white font-normal py-3 px-6 rounded-full inline-block no-underline shadow-md transition-all duration-300 ease-in-out hover:shadow-lg'>
                Reset Password
              </a>
            </div>
            <p className='text-sm text-gray-500 mt-8 text-center'>
              If you didn&apos;t request a password reset on Sprintify, please ignore this email.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}