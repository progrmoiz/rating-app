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
      {ratingList.map(({ count, text }) => (
        <Rating
          key={text}
          count={count}
          text={text}
        />
      ))}
    </div>
  )
}

export default RatingList;