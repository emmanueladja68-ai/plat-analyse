'use client'

import { useRef, useState } from 'react'
import { FileUp } from 'lucide-react'

export default function DropZone({ onFile }: { onFile: (content: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  function readFile(file: File) {
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') return
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') onFile(e.target.result)
    }
    reader.readAsText(file, 'UTF-8')
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) readFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) readFile(file)
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group ${
        isDragOver
          ? 'border-primary bg-[#eff6ff]'
          : 'border-outline-variant bg-surface-container-low hover:border-primary'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
      />

      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
          isDragOver ? 'bg-primary' : 'bg-surface-container-highest group-hover:bg-primary-container'
        }`}
      >
        <FileUp
          size={28}
          strokeWidth={1.5}
          className={isDragOver ? 'text-white' : 'text-primary group-hover:text-white'}
        />
      </div>

      <p className="text-headline-sm text-on-surface mb-2">Déposez votre fichier CSV ici</p>
      <p className="text-body-sm text-secondary mb-6">
        ou{' '}
        <span className="text-primary hover:underline">
          cliquez pour parcourir vos dossiers locaux
        </span>
      </p>

      <button
        type="button"
        className="bg-surface-container-lowest border border-outline px-4 py-2 rounded-lg text-label-md hover:bg-surface-container transition-colors shadow-sm"
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
      >
        Sélectionner un fichier
      </button>
    </div>
  )
}
