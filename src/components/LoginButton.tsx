import { usePrivy } from '@privy-io/react-auth';

export default function LoginButton() {
  const { login } = usePrivy();

  return (
    <div className="flex flex-col items-center py-4">
      <button
        onClick={login}
        className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
      >
        <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 shadow-md"></span>
        <span className="relative flex items-center gap-2">
          Sign In
          <svg
            className="w-5 h-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
      </button>
      <p className="mt-3 text-sm text-gray-600">
        Sign in with your social account to join the debate
      </p>
    </div>
  );
}
