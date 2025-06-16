/// <reference types="vite/client" />
/// <reference types="@cloudflare/workers-types" />

interface ImportMetaEnv {
  readonly VITE_TRIPLIT_SERVER_URL?: string
  readonly VITE_TRIPLIT_TOKEN?: string
  readonly DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
