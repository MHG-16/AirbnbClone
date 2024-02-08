import getCurrentUser from '@/actions/getCurrentUser'
import React, { Suspense } from 'react'
import EmptyState from '../_components/empty-state';
import getReservations from '@/actions/getReservation';
import TripsClient, { TripsSkeleton } from './tripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser) {
    return <EmptyState title='Unauthorizated' subtitle='You must be logged in' />
  }

  const reservations = await getReservations({
    userId: currentUser.id
  })

  if (reservations.length === 0) {
    return (
        <EmptyState title="Reservations are not available" subtitle="Looks like you have not reserved any trips" />
    )
  }
  return (
    <div>
        <Suspense fallback={<TripsSkeleton />}>
          <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
          />
        </Suspense>
    </div>
  )
}

export default TripsPage