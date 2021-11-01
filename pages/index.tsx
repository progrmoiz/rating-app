import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Heading from '@/components/Heading'
import RatingList from '@/components/RatingList';
import AverageRating from '@/components/AverageRating'
import Button from '@/components/Button'
import { useMemo, useState } from 'react';
import RatingDialog from '@/components/RatingDialog'

const ratings = [
  { text: 'This is awesome', count: 5 },
  { text: 'This is not awesome', count: 1 },
  { text: 'This is not awesome', count: 1 },
]

const Home: NextPage = () => {
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)

  const averageRating = useMemo(() => {
    return ratings.reduce((acc, curr) => acc + curr.count, 0) / ratings.length
  }, []);

  return (
    <div className="divide-y-2 divide-gray-100 max-w-lg space-y-10 mx-auto mt-32">
      <div className="space-y-6">
        <Heading as="h2">
          The Minimalist Entrepreneur
        </Heading>
        <div className="flex items-center justify-between">
          <AverageRating count={averageRating} />
          <Button
            onClick={() => setIsRatingDialogOpen(true)}
          >
            Add reviews
          </Button>
        </div>
      </div>
      <div className="space-y-6 pt-5">
        <Heading as="h3">
          Reviews
        </Heading>
        <div>
          <RatingList
            ratingList={ratings}
          />
        </div>
      </div>
      <RatingDialog
        open={isRatingDialogOpen}
        onClose={() => setIsRatingDialogOpen(false)}
        onSubmit={(rating, comment) => {
          console.log(rating, comment)
        }}
      />
    </div>
  )
}

export default Home
