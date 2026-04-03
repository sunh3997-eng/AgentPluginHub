'use client'

import UploadForm from '@/components/UploadForm'

export default function UploadPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Publish a Plugin</h1>
        <p className="mt-2 text-zinc-400">
          Submit your plugin for review. Once approved, it will appear in the marketplace.
        </p>
      </div>
      <UploadForm />
    </div>
  )
}
