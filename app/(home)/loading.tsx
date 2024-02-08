import React from 'react'
import { Container } from './_components/container'
import { ListingCardSkeleton } from './_components/listings/listingCard'

const LoadingPage = () => {
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {[...Array(5)].map((index) => (<ListingCardSkeleton key={index} />))}
      </div>
    </Container>
  )
}

export default LoadingPage