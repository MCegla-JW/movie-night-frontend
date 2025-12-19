import { useState } from "react"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useNavigate } from "react-router"
import { partyDelete } from "../../services/party";

const DeleteModal = ({partyId}) => {
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)
    
    const navigate = useNavigate()

    const handleDeleteParty = async () => {
    await partyDelete(partyId)
    navigate('/parties/')
    }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-3 mt-3"
      >
        Delete Party
      </button>

      <Dialog className="relative z-50" open={isOpen} onClose={closeModal}>
        <div className='fixed inset-0 bg-black/50' aria-hidden='true'/>
        <div className='fixed inset-0 flex items-center justify-center p-4'>
        <DialogPanel className='w-full max-w-md rounded bg-white p-6 shadow-lg'>
          <DialogTitle className="text-lg leading-6 text-purple-900 font-bold">Are you sure you want to delete the party?</DialogTitle>
          <div className='mt-4 flex justify-center gap-3'>
          <button onClick={handleDeleteParty} className="px-10 py-2 rounded bg-green-700">
            Yes 
          </button>
        <button onClick={closeModal} className="px-10 py-2 rounded bg-red-900">
            No
          </button>
          </div>
        </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteModal;
