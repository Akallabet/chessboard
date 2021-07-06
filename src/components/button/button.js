import clsx from 'clsx'
import { bool, func, node } from 'prop-types'

export const Button = ({
  onClick,
  children,
  fullWidth,
  fullHeight,
  backGround,
  padding,
  borders,
  disabled,
  ...buttonProps
}) => {
  const classes = clsx('text-secondary', {
    'rounded-md': borders,
    'border-secondary': borders,
    border: borders,
    'p-1.5': padding,
    'bg-primary': backGround,
    'hover:bg-primary-dark': backGround && !disabled,
    'w-full': fullWidth,
    'h-full': fullHeight,
    'cursor-not-allowed': disabled,
  })
  return (
    <button className={`${classes}`} onClick={onClick} disabled={disabled} {...buttonProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: func,
  children: node.isRequired,
  fullWidth: bool,
  fullHeight: bool,
  backGround: bool,
  padding: bool,
  borders: bool,
  disabled: bool,
}

Button.defaultProps = {
  onClick: () => {},
  fullWidth: false,
  fullHeight: false,
  backGround: true,
  padding: true,
  borders: true,
  disabled: false,
}
