'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { userService } from '@/services/user';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';

import { ModalProfile } from './Modal';

import DeleteIcon from '@/assets/icons/delete-icon.svg';

const Schema = z.object({
  username: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof Schema>;

export const GeneralInformation = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(Schema), mode: 'onBlur' });

  const email = watch('email') ?? '';

  useEffect(() => {
    (async () => {
      try {
        const me = await userService.getMe();
        console.log('ME:', me);
        setValue('username', me?.username ?? '');
        setValue('email', me?.email ?? '');
      } catch (e) {
        console.error('getMe error:', e);
      }
    })();
  }, [setValue]);

  const handleUpdate = async (data: FormData) => {
    try {
      setIsEmail(true);
      const res = await userService.updateMe(data);
      console.log('updateMe:', res);
    } catch (e) {
      console.error('updateMe error:', e);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await userService.deleteMe();
      console.log('deleteMe:', res);
    } catch (e) {
      console.error('deleteMe error:', e);
    }
  };

  const onSubmit = (data: FormData) => {
    handleUpdate(data);
  };

  return (
    <section className="mb-[90px] flex w-[calc(100%_-_40px)] max-w-[720px] flex-col gap-5 rounded-xl bg-[linear-gradient(112.71deg,_rgba(23,23,23,0.6)_19.64%,_rgba(105,105,105,0.316464)_55.1%,_rgba(125,125,125,0.06)_92%)] p-6 backdrop-blur-[20px] md:mx-0 md:w-full">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <h5 className="text-xl font-medium">General Information</h5>
          <button
            onClick={() => setIsDelete(true)}
            className="hidden cursor-pointer flex-row gap-[6px] text-[#DC2626] sm:flex"
          >
            <DeleteIcon /> Delete Account
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 sm:flex-row"
        >
          <Input
            label="Username"
            id="username"
            labelClassName="text-[#EBEBEB] text-base"
            {...register('username')}
            error={errors.username?.message}
          />
          <Input
            label="Email"
            id="email"
            labelClassName="text-[#EBEBEB] text-base"
            {...register('email')}
            error={errors.email?.message}
          />
          <button className="flex cursor-pointer flex-row gap-[6px] text-[#DC2626] sm:hidden">
            <DeleteIcon /> Delete Account
          </button>
        </form>
        <div className="flex flex-col sm:flex-row">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="rounded-[10px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.03)_0%,_rgba(255,255,255,0.1)_100%)] !px-[31px] py-3 text-[16px] font-semibold text-[#EBEBEB] shadow-[0_-1px_0_0_#00000033_inset,0_0_0_1px_#FFFFFF40,0_1px_0_0_#FFFFFF0D_inset]"
            disabled={isSubmitting}
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
      <ModalProfile
        title="Delete Account"
        open={isDelete}
        onClose={() => setIsDelete(false)}
        firstText="Delete Account"
        firstColor="red"
        secondText="Cancel"
        desciption="This action will permanently delete your account and all associated data. This action cannot be undone."
        firstOnClick={handleDelete}
      />
      <ModalProfile
        title="Confirm Your New Email Address"
        firstColor="white"
        desciption={`We’ve sent a confirmation link to ${email}. Please click the link in the email to complete the update. Until confirmed, your current email will remain active.`}
        onClose={() => setIsEmail(false)}
        open={isEmail}
      />
    </section>
  );
};
