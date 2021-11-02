import StarRating from 'react-svg-star-rating'
import Rating from './Rating';

interface RatingListProps {
  ratingList: Array<{
    count: number;
    text: string;
  }>
}

const RatingList = ({
  ratingList = []
}: RatingListProps) => {

  return (
    <div className="flex flex-col space-y-5">
      {ratingList.length > 0
        ? ratingList.map(({ count, text }, i) => (
          <Rating
            key={i}
            count={count}
            text={text}
          />
        ))
        : <div className="text-sm text-gray-500">No ratings yet</div>
      }
    </div>
  )
}

export default RatingList;