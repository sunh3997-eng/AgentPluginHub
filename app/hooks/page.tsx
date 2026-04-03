'use client'

import HookConfigurator from '@/components/HookConfigurator'
import { SAMPLE_HOOKS, HOOK_TEMPLATES } from '@/lib/data'

export default function HooksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Workflow Hooks</h1>
        <p className="mt-2 text-zinc-400">
          Configure pre-commit reviews, post-deploy notifications, and custom automation hooks.
        </p>
      </div>
      <HookConfigurator initialHooks={SAMPLE_HOOKS} hookTemplates={HOOK_TEMPLATES} />
    </div>
  )
}
