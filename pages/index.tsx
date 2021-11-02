import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Heading from '@/components/Heading'
import RatingList from '@/components/RatingList';
import AverageRating from '@/components/AverageRating'
import Button from '@/components/Button'
import { useCallback, useEffect, useMemo, useState } from 'react';
import RatingDialog from '@/components/RatingDialog'
import { createRating, subscribeToRatings, supabase } from '@/lib/api';
import { fetchRatings } from '../src/lib/api';

const Home: NextPage = () => {
  const [ratings, setRatings] = useState<any[]>([])
  const [isRatingsLoading, setIsRatingsLoading] = useState(true)
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false)

  const averageRating = useMemo(() => {
    return ratings.reduce((acc, curr) => acc + curr.count, 0) / ratings.length
  }, [ratings]);

  const onSubmitRating = async (rating: number, comment: string) => {
    console.log('Create rating', rating, comment);

    const { data, error }: any = await createRating(rating, comment)

    /*     if (error) return;
    
        if (data) {
          setRatings([{
            count: data[0].count,
            text: data[0].text,
            created_at: data[0].created_at,
          }, ...ratings])
        } */
  }

  const fetchAndUpdate = useCallback(
    async () => {
      const { data } = await fetchRatings();

      setRatings(
        data?.
          map((rating: any) => ({
            count: rating.count,
            text: rating.text,
            created_at: rating.created_at,
          })) ?? []
            .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(a.created_at).getTime())
      )

      setIsRatingsLoading(false)
    }, [])

  useEffect(() => {
    fetchAndUpdate()

    subscribeToRatings(fetchAndUpdate)

  }, [fetchAndUpdate])

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
          {
            !isRatingsLoading
              ? <RatingList
                ratingList={ratings}
              />
              : <div className='text-sm text-gray-500'>Loading...</div>
          }
        </div>
      </div>
      <RatingDialog
        open={isRatingDialogOpen}
        onClose={() => setIsRatingDialogOpen(false)}
        onSubmit={onSubmitRating}
      />
    </div>
  )
}

export default Home
