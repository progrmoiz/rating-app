interface Props {
  children: React.ReactNode
}

type ButtonProps = Props & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  ...otherProps
}: ButtonProps) => {

  return (
    <button className="bg-white text-sm font-medium text-gray-500 px-4 py-2 shadow border rounded-md hover:bg-gray-50" {...otherProps}>
      { children }
    </button>
  )
}

export default Button;