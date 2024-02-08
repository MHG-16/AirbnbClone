"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import qs from "query-string";
import { formatISO } from 'date-fns';
import { Range } from 'react-date-range';

import Location from './Location';
import DateRange from './Date';
import Modal from '@/app/components/modals/Modal'
import useSearchModal from '@/hooks/useSearchModal'

import { CountrySelectValue } from '@/app/components/CountrySelect';
import Info from './Info';


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}
const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setbathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });
  
  const onBack = useCallback(() => {
    setStep((value) => value - 1 );
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
        return onNext();
    }

    let currentQuery = {};

    if(params) {
        currentQuery = qs.parse(params.toString());

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }
  }, [bathroomCount, dateRange.endDate, dateRange.startDate, guestCount, location?.value, onNext, params, roomCount, router, searchModal, step]);
  
  const actionLabel = useMemo(() => {
    if(step === STEPS.INFO) {
        return "Search"
    };

    return "Next"
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
        return undefined;
    }

    return "Back"
  }, [step ]);

  let bodyContent ;

  if (step === STEPS.LOCATION) {
    bodyContent = <Location location={location} setLocation={setLocation} />;
  }

  if (step === STEPS.DATE) {
    bodyContent = <DateRange dateRange={dateRange} setDateRange={setDateRange} />;
  }

  if (step === STEPS.INFO) {
    bodyContent = <Info guestCount={guestCount} bathroomCount={bathroomCount} roomCount={roomCount} setBathroomCount={setbathroomCount} setRoomCount={setRoomCount} setGuestCount={setGuestCount}/>
  }
  return (
    <Modal 
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
    />
  )
}

export default SearchModal