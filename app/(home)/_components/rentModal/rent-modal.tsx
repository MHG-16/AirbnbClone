"use client";
import { useMemo, useState } from "react";

import Modal from "@/app/components/modals/Modal";
import useRentModal from "@/hooks/useRentModal";
import { FieldValues, useForm } from "react-hook-form";
import { Gatecory } from "./gatecory";
import Location from "./location";
import Info from "./info";
import Images from "./images";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}


const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });
  const category = watch("category");
  const location = watch("location");
  const guestCount =  watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  const bodyContent = useMemo(() => {
    const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      })
    }
    if (step === STEPS.CATEGORY) {
      return <Gatecory setCustomValue={setCustomValue} category={category}/>
    }

    if ( step === STEPS.LOCATION) {
      return <Location setCustomValue={setCustomValue} location={location}/>
    }

    if (step === STEPS.INFO) {
      return <Info setCustomValue={setCustomValue} guestCount={guestCount} roomCount={roomCount} bathroomCount={bathroomCount} />
    }

    if (step === STEPS.IMAGES) {
      <Images />
    }
    console.log(category, location)
    return undefined;
  }, [bathroomCount, category, guestCount, location, roomCount, setValue, step]);

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
