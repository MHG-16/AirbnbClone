"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState, useTransition } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "./heading";
import Input from "@/app/components/input";
import toast from "react-hot-toast";
import Button from "@/app/components/button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: {
    errors,
  } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const BodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account"/>
      <Input id="email" label="Email" type="email"  disabled={isPending} register={register} errors={errors} required/>
      <Input id="name" label="Name" type="text"  disabled={isPending} register={register} errors={errors} required/>
      <Input id="password" label="Password" type="password"  disabled={isPending} register={register} errors={errors} required/>    
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}}/>
      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}}/>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>
            Already have an account?
          </div>
          <div className="text-neutral-800 cursor-pointer hover:underline" onClick={registerModal.onClose}>
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    startTransition(() => {
      axios.post('/api/register', data)
      .then(() => { registerModal.onClose();})
      .catch(() => toast.error("Something went wrong"));
    })
  }
  return (
    <Modal 
      disabled={isPending}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={BodyContent}
      footer={footerContent}
    />
  )
}


export default RegisterModal