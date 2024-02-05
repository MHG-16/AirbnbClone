"use client";
import { useMemo, useState, useTransition } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "@/app/components/modals/Modal";
import useRentModal from "@/hooks/useRentModal";
import { Gatecory } from "./gatecory";
import Location from "./location";
import Info from "./info";
import ImagesCountainer from "./images";
import Description from "./description";
import Price from "./price";


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}


const RentModal = () => {
  const router = useRouter();
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
  const imageSrc = watch("imageSrc");

  const [isPending, startTransition] = useTransition();

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if ( step !== STEPS.PRICE) {
      return onNext();
    }
  
    startTransition(() => {
      axios.post("/api/listings", data)
      .then(() => {
        toast.success("Listing is created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => toast.error("Something went wrong"));
    })
  }

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
      return <ImagesCountainer setCustomValue={setCustomValue} imageSrc={imageSrc}/>
    }

    if (step === STEPS.DESCRIPTION) {
      return <Description isLoading={isPending} register={register} errors={errors}/>
    }

    if (step === STEPS.PRICE) {
      return <Price isLoading={isPending} register={register} errors={errors} />
    }
    return undefined;
  }, [step, setValue, category, location, guestCount, roomCount, bathroomCount, imageSrc, isPending, register, errors]);

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryLabel}
      disabled={isPending}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
