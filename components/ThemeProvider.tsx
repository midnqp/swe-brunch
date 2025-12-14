"use client"
import { StorageManager, ThemeProvider } from "@mui/material"
import { theme } from "@/utils/theme"

export function MuiThemeProvider({ children, defaultTheme }: any) {
  const sessionStorageManager: StorageManager = (opts) => ({
    get() {
      return opts.storageWindow?.sessionStorage.getItem(opts.key)
    },
    set(value: any) {
      return opts.storageWindow?.sessionStorage.setItem(opts.key, value)
    },
    subscribe() {
      return () => {}
    },
  })

  console.log("muithemeprovider:: ", defaultTheme)

  return (
    <>
      <ThemeProvider
        defaultMode={defaultTheme}
        theme={theme}
        storageManager={null}
      >
        {children}
      </ThemeProvider>
    </>
  )
}
