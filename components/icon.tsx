/**
 * This is an icon component made out of the Material UI Symbols and Icons library.
 * The CSS is imported at @/globals.css.
 */
export default function IconMuis(props: {
  className?: string
  iconName: string
  style?: any
}) {
  return (
    <span className={`material-symbols-outlined ${props.className}`}>
      {props.iconName}
    </span>
  )
}
