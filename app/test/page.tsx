'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ElementRef, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const list = ['a', 'b', 'c', 'd', 'e']

export default function Test() {
  const dialogRef = useRef<ElementRef<'dialog'>>(null)

  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <>
      <div className="cards-container">
        {list.map((item) => (
          <motion.div className="card cursor-pointer" key={item} layoutId={item} onClick={() => setSelectedId(item)}>
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
                <motion.button onClick={() => setSelectedId(null)} className="close-button" />
              </motion.dialog>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
