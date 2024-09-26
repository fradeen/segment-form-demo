import React from 'react'

export const Dialog = React.forwardRef<HTMLDialogElement, React.DialogHTMLAttributes<HTMLDialogElement>>(({ children, ...props }, ref) => {
    return (
        <dialog ref={ref} {...props}>
            {children}
        </dialog>
    )
})

Dialog.displayName = 'Dialog'
