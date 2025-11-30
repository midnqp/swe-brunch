import clsx from "clsx"

/**
 * This is an icon component made out of the Material UI Symbols and Icons library.
 * The CSS is imported at @/globals.css.
 */
export default function IconMuis(props: {
  iconName: string
  className?: string
  onClick?: () => void
}) {
  return (
    <span
      onClick={props.onClick}
      className={`material-symbols-outlined ${clsx(props.className)}`}
    >
      {props.iconName}
    </span>
  )
}
