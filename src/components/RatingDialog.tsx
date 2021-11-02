import StarRating from 'react-svg-star-rating'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Heading from './Heading'
import Button from '@/components/Button';

interface RatingDialogProps {
  open: boolean
  onSubmit?: (rating: number, comment: string) => void
  onClose?: () => void
}

const RatingDialog = ({
  open,
  onSubmit,
  onClose,
}: RatingDialogProps) => {

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => {
    setRating(0)
    setComment('')

    onClose?.();
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await onSubmit?.(rating, comment)
    setIsSubmitting(false)

    handleClose();
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={handleClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="space-y-6 inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-10">
              <Heading as="h3" className="mb-5">
                {"What's your rating?"}
              </Heading>
              <Heading as="h4">
                Rating
              </Heading>
              <StarRating
                containerClassName="flex space-x-1"
                starClassName="filter drop-shadow"
                unit="half"
                emptyColor="#E0E0E0"
                activeColor="#FFCD69"
                handleOnClick={(rating) => setRating(rating)}
              />
              <Heading as="h4">
                Review
              </Heading>
              <textarea
                className="w-full border-0 focus:outline-none"
                placeholder="Start typing..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={handleSubmit}>
                {isSubmitting ? 'Submitting...' : 'Submit review'}
              </Button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default RatingDialog;