import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      {/* Intro Section */}
      <div className="max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Cashly
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
          Take control of your money with Cashly —  
          a portable tracker for both income and expenses.
        </p>
      </div>

      {/* Clerk SignUp */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <SignUp signInUrl="/login" forceRedirectUrl={"/dashboard"} />
      </div>
    </div>
  );
}
