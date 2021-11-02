import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  String(process.env.NEXT_PUBLIC_SUPABASE_URL),
  String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
)

export const createRating = async (rating: number, comment: string) => {
  const { data, error } = await supabase
  .from('Review')
  .insert([
    {
      count: rating,
      text: comment,
    }
  ])

  if (error) {
    alert(error)
  }

  return { data, error }
}

export const fetchRatings = async () => {
  const { data, error } = await supabase
    .from('Review')
    .select()

  if (error) {
    alert(error)
  }

  return { data, error }
}

export const subscribeToRatings = (onInsert: (data: any) => void) => {
  return supabase
    .from('Review')
    .on('INSERT', async (data: any) => {
      console.log('inserted', data)
      await onInsert?.(data.new)
    })
    .subscribe();
}