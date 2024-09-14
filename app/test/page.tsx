'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const list = ['1', '2', '3', '4', '5', '6']

export default function Test() {
  const dialogRef = useRef<ElementRef<'dialog'>>(null)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleOpen = (key: string) => {
    window.history.pushState({ selectedId: key }, '', `/photos/${key}`)
    setSelectedId(key)
  }

  const handleClose = () => {
    setSelectedId(null)
    window.history.back()
  }

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.selectedId) {
        setSelectedId(event.state.selectedId)
      } else {
        setSelectedId(null)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return (
    <>
      <div className="cards-container">
        {list.map((item) => (
          <motion.div className="card cursor-pointer" key={item} layoutId={item} onClick={() => handleOpen(item)}>
            <motion.h5>{item}</motion.h5>
          </motion.div>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedId && (
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.dialog
                ref={dialogRef}
                className="modal"
                layoutId={selectedId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-background">{selectedId}</span>
                <motion.button onClick={handleClose} className="close-button" />
              </motion.dialog>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
