import StarRating from 'react-svg-star-rating'

interface AverageRatingProps {
  count: number;
}

const AverageRating = ({
  count = 0,
}: AverageRatingProps) => {

  return (
    <div className="flex items-center space-x-6">
      <span className="text-gray-700 text-4xl">
        {count ? count.toFixed(1) : 0}
      </span>
      <StarRating
        containerClassName="flex space-x-1"
        starClassName="filter drop-shadow"
        initialRating={count ? count : 0}
        isReadOnly={true}
        emptyColor="#E0E0E0"
        activeColor="#FFCD69"
        unit="half"
      />
    </div>
  )
}

export default AverageRating;