"use client"

import { createTheme } from "@mui/material"

export const theme = createTheme({
  cssVariables: {
    /** note: if you don't mention this line,
     * toggling back the theme doesn't work.
     *
     * this line is the SPOT.
     * this line is the GOAT.
     *
     * and if you just set 'cssVariables' to true,
     * or keep this object empty, then users will
     * not be able to toggle the theme in runtime.
     */
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    dark: true,
    light: true,
    // note: light is enabled by default. docs say.
  },
})
