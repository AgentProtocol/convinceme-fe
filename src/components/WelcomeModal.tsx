import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'

const BulletItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2">
    <div className="min-w-[20px] h-[20px] mt-1">
      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
    </div>
    <span>{children}</span>
  </li>
)

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div>
    <p className="text-lg text-primary-900 font-semibold mb-4">{title}</p>
    {children}
  </div>
)

const steps = [
  "Listen to two AI agents debating a topic in real-time",
  "Write your argument supporting either side of the debate",
  "Your argument will be scored based on its persuasiveness",
  "Watch the debate progress bar to see which side is winning"
]

const mechanics = [
  "Each argument requires a buy-in paid in ETH (starting at $1 USD equivalent)",
  "Buy-in increases by ~4.2% with each submitted argument",
  "Game runs on a 1-hour countdown, reset by each new argument",
  "The highest-scored argument on the winning side receives the prize pool",
  "A progress bar at the top shows the current winning side in real-time"
]

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 shadow-soft flex items-center justify-center text-white hover:opacity-90 active:opacity-100 transition-all text-xl"
        aria-label="Show instructions"
      >
        ❔
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-soft transition-all">
                  <DialogTitle as="h3" className="text-2xl font-bold text-primary-900 mb-6">
                    Welcome to ConvinceMe!
                  </DialogTitle>

                  <div className="space-y-8">
                    <Section title="Here's how it works:">
                      <ul className="text-base text-gray-600 space-y-3 pl-2">
                        {steps.map((step, index) => (
                          <BulletItem key={index}>{step}</BulletItem>
                        ))}
                      </ul>
                    </Section>

                    <Section title="Game mechanics:">
                      <ul className="text-base text-gray-600 space-y-3 pl-2">
                        {mechanics.map((mechanic, index) => (
                          <BulletItem key={index}>{mechanic}</BulletItem>
                        ))}
                      </ul>
                    </Section>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-base font-semibold text-white hover:opacity-90 active:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-all shadow-sm"
                      onClick={handleClose}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
} 