const ratingList = [
  {
    text: 'book was full of fluff',
    value: 4
  },
  {
    text: 'book was fluff',
    value: 3
  },
  {
    text: 'book was amazing',
    value: 4
  }
]

const createStarRating = (num) => {
  const ratingStars = document.createElement('div')
  ratingStars.classList.add('flex', 'space-x-1')

  for (let i = 0; i < 5; i++) {
    const star = document.createElement('div')
    star.classList.add((num - 1) < i ? 'text-gray-300' : 'text-yellow-300')
    star.innerHTML = `
      <svg
        class="w-6 h-6"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.8947 11.3211C29.6603 10.6474 29.0892 10.1495 28.3862 10.047L20.3164 8.80207L16.7135 1.06914C16.3767 0.439371 15.7323 0 15 0C14.2677 0 13.6233 0.439371 13.2865 1.06914L9.68361 8.80207L1.56989 10.047C0.910833 10.1495 0.339651 10.6474 0.105319 11.3211C-0.129012 11.9802 0.0320908 12.7271 0.54469 13.2251L6.43226 19.2445L5.02628 27.8122C4.92376 28.5152 5.23132 29.2182 5.78785 29.6576C6.1247 29.8919 6.49085 29.9944 6.90093 29.9944C7.19384 29.9944 7.5014 29.9212 7.80896 29.7601L15 25.7764L22.191 29.7601C22.4986 29.9212 22.8062 29.9944 23.0991 29.9944C23.5092 29.9944 23.8753 29.8919 24.2121 29.6576C24.7687 29.2182 25.0762 28.5152 24.9737 27.8122L23.5677 19.2445L29.4553 13.2251C29.9679 12.7271 30.129 11.9802 29.8947 11.3211Z"
        fill="currentColor"
      />
    </svg>
    `
    ratingStars.appendChild(star)
  }

  return ratingStars
}

const createTextRating = (num, text) => {
  const ratingCountElement = document.createElement('span')
  ratingCountElement.classList.add('font-semibold')
  ratingCountElement.innerText = num;

  const ratingTextElement = document.createElement('span')
  ratingTextElement.classList.add('text-gray-400')
  ratingTextElement.innerText = text;

  const ratingTextWrapperElement = document.createElement('div')
  ratingTextWrapperElement.classList.add('flex', 'space-x-1')
  ratingTextWrapperElement.appendChild(ratingCountElement)
  ratingTextWrapperElement.appendChild(ratingTextElement)

  return ratingTextWrapperElement
}

const createRating = (num, text) => {
  const ratingElement = document.createElement('div')
  ratingElement.classList.add('flex', 'space-x-6', 'items-center')

  ratingElement.appendChild(createStarRating(num))
  ratingElement.appendChild(createTextRating(num, text))

  return ratingElement
}

document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const ratingListElement = document.getElementById('rating-list')
  ratingListElement.classList.add('flex', 'flex-col', 'space-y-5')

  ratingList.forEach((rating) => {
    ratingListElement.appendChild(createRating(rating.value, rating.text))
  });

  const averageRatingTextElement = document.getElementById('average-rating-count')
  const averageRatingStarElement = document.getElementById('average-rating-stars')

  averageRatingTextElement.innerText = (ratingList.reduce((acc, rating) => acc + rating.value, 0) / ratingList.length).toFixed(1)
  averageRatingStarElement.appendChild(createStarRating(Math.ceil(averageRatingTextElement.innerText)))
})