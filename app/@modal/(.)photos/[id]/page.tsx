'use client'

import { useRouter } from 'next/navigation'
import { ElementRef, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function PhotoModal({ params: { id: photoId } }: { params: { id: string } }) {
  const router = useRouter()
  const dialogRef = useRef<ElementRef<'dialog'>>(null)

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  }, [])

  function onDismiss() {
    router.back()
  }

  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        <span className="text-background">{photoId}</span>
        <button onClick={onDismiss} className="close-button" />
      </dialog>
    </div>,
    document.body
  )
}
