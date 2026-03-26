/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    DB_FILE_NAME: string
  }
}

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_IMAGE_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
