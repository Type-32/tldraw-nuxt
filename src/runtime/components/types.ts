export { type TLEditorOptions } from 'tldraw'

export interface TldrawNuxtProps {
  /**
   * Options to pass to the tldraw editor
   */
  options?: Partial<import('tldraw').TLEditorOptions>
  
  /**
   * Whether the editor should auto-focus on mount
   * @default true
   */
  autoFocus?: boolean
  
  /**
   * A key to use for persisting the editor state to local storage
   */
  persistenceKey?: string
}

