import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'

interface InactivityModalProps {
  isOpen: boolean;
  onResume: () => void;
}

export default function InactivityModal({ isOpen, onResume }: InactivityModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                <DialogTitle as="h3" className="text-2xl font-bold text-primary-900 mb-4">
                  Game Paused
                </DialogTitle>

                <p className="text-base text-gray-600 mb-6">
                  The game has been paused due to inactivity. Click below to resume.
                </p>

                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-base font-semibold text-white hover:opacity-90 active:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition-all shadow-sm"
                  onClick={onResume}
                >
                  Resume Game
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 