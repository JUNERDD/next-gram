'use client'

import { AnimatePresence, motion } from 'framer-motion'
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
    <AnimatePresence>
      <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.dialog
          ref={dialogRef}
          className="modal"
          onClose={onDismiss}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="text-background">{photoId}</span>
          <button onClick={onDismiss} className="close-button" />
        </motion.dialog>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
