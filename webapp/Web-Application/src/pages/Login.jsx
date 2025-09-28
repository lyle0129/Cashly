import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      {/* Intro Section */}
      <div className="max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Cashly
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
          Your portable, all-in-one finance tracker.  
          Keep tabs on both your income and spending anytime, anywhere.
        </p>
      </div>

      {/* Clerk SignIn */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <SignIn signUpUrl="/signup" forceRedirectUrl={"/dashboard"} />
      </div>
    </div>
  );
}
