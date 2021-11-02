import StarRating from 'react-svg-star-rating'

interface RatingProps {
  count: number;
  text: string;
}

const Rating = ({
  count = 0,
  text,
}: RatingProps) => {

  return (
    <div className="flex space-x-6 items-center">
      <StarRating
        containerClassName="flex space-x-1"
        starClassName="filter drop-shadow"
        initialRating={count}
        isReadOnly={true}
        emptyColor="#E0E0E0"
        activeColor="#FFCD69"
        unit="half"
      />
      <div className='flex space-x-1'>
        <span className="text-gray-700 text-md font-semibold">{ count }, </span>
        <span className='text-gray-400 text-md'>{ text }</span>
      </div>
    </div>
  )
}

export default Rating;