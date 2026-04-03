export type AgentType = 'cursor' | 'claude-code' | 'codex' | 'copilot' | 'all'
export type PluginStatus = 'pending' | 'approved' | 'rejected'
export type HookType = 'pre-commit' | 'post-deploy' | 'pre-push' | 'post-merge'

export interface Template {
  id: string
  title: string
  description: string
  content: string
  agent_type: AgentType
  category: string
  tags: string[]
  downloads: number
  stars: number
  author: string
  created_at: string
}

export interface Plugin {
  id: string
  name: string
  description: string
  agent_compatibility: AgentType[]
  version: string
  status: PluginStatus
  author: string
  downloads: number
  stars: number
  price: number
  category: string
  tags: string[]
  created_at: string
}

export interface HookConfig {
  id: string
  name: string
  type: HookType
  description: string
  webhook_url: string
  enabled: boolean
  template_id?: string
  created_at: string
}

export interface HookTemplate {
  id: string
  name: string
  type: HookType
  description: string
  script: string
}
