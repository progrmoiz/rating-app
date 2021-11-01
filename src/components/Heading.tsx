import cx from 'classnames'

interface HeadingProps {
  children: React.ReactNode;
  as?: React.ElementType<any>;
  className?: string,
}

const Heading = ({
  children,
  as = 'h1',
  className = '',
  ...otherProps
}: HeadingProps) => {

  const Tag = as;

  return (
    <Tag className={
      cx('text-gray-600 font-medium', {
        'text-4xl': as === 'h2',
        'text-2xl': as === 'h3',
        'text-1xl': as === 'h4'
      }, className)
    } {...otherProps}>
      {children}
    </Tag>
  );
};

export default Heading;