import { Button } from '@headlessui/react'

const LoadingIcon = () => {
  return (
    <>
      <Button type="button" className="rounded bg-purple-600 px-4 py-2 text-sm data-active:bg-sky-700 data-hover:bg-sky-500 text-white" disabled>
        Loading...
      </Button>
    </>
  );
};

export default LoadingIcon
