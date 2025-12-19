import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const MyModal = ({party}) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => 
    setIsOpen(false)

    const openModal = () =>
    setIsOpen(true)

    const joinLink = `${window.location.origin}/parties/join/${party?.join_code || ''}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(joinLink)
        .then(() => alert('Link copied to clipboard'))
        .catch(err => console.error('Failed to copy:', err))
    }

  return (
    <>
        <button
          type="button"
          onClick={openModal}
          className="flex w-full justify-center tracking-wide rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-3 mt-3"
        >
          Invite Friends
        </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-purple-900"
                  >
                    Invite Friends to Your Party
                  </Dialog.Title>
                  <div className="mt-4">
                <input type='text' value={joinLink} readOnly className='w-full border border-gra-300 rounded-md p-2 text-gray-900 focus:outline-none focus:ring-2 focus'/>
                  <button type='button' onClick={copyToClipboard} className='mt-2 w-full rounded-md bg-purple-500 px-3 py-1.5 text-white hover:bg-purple-600'>
                    Copy Link
                  </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MyModal
