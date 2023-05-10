import { forwardRef } from 'react';

const UtilsInput = forwardRef(({ ...props }, ref) => {
  return (
    <input ref={ref} className="w-full bg-slate-600 text-sm text-white block border-2 border-slate-700 border-solid focus:outline-none rounded-xl p-4" {...props} />
  );
});

UtilsInput.displayName = 'UtilsInput';

export default UtilsInput;