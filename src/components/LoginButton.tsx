import { useStarknetkitConnectModal } from "starknetkit";
import { useConnect } from "@starknet-react/core";

export default function LoginButton() {
  const { connect, connectors } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    //@ts-expect-error
    connectors: connectors
  })

  async function connectWallet() {
    const { connector } = await starknetkitConnectModal()
    if (!connector) {
      return
    }

    await connect({ connector });
  }

  return (
    <div className="flex flex-col items-center py-2">
      <button
        onClick={connectWallet}
        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="absolute inset-0 w-full h-full rounded-lg bg-blue-500"></span>
        <span className="relative flex items-center gap-2">
          Login to Participate
          <svg className="w-5 h-5 ml-2 transition-transform duration-200 ease-in-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </button>
      <p className="mt-3 text-sm text-gray-600">Connect your wallet to join the debate</p>
    </div>
  );
} 