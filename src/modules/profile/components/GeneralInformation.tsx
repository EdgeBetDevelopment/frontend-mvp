'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Mail, Trash2 } from 'lucide-react';

import { profileService } from '../services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ModalProfile } from './ModalProfile';

const Schema = z.object({
  username: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof Schema>;

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const GeneralInformation = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailUpdated, setIsEmailUpdated] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

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
        const me = await profileService.getMe();
        console.log('ME:', me);
        setValue('username', me?.username ?? '');
        setValue('email', me?.email ?? '');
      } catch (e) {
        console.error('getMe error:', e);
      }
    })();
  }, [setValue]);

  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    if (confirmed === 'true') {
      setIsEmailUpdated(true);
      router.replace('/profile', { scroll: false });
    }
  }, [searchParams, router]);

  const handleUpdate = async (data: FormData) => {
    try {
      setIsEmail(true);
      const res = await profileService.updateMe(data);
      console.log('updateMe:', res);
    } catch (e) {
      console.error('updateMe error:', e);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await profileService.deleteMe();
      console.log('deleteMe:', res);
    } catch (e) {
      console.error('deleteMe error:', e);
    }
  };

  const onSubmit = (data: FormData) => {
    handleUpdate(data);
  };

  const startWhopLogin = () => {
    window.location.href = `${API_URL}/auth/api/v1/auth/login_whop`;
  };

  return (
    <>
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Email Address</CardTitle>
                <CardDescription>
                  Update your email for account communications
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDelete(true)}
              className="hidden gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive sm:flex"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register('username')}
              className="border-border bg-secondary/50"
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="border-border bg-secondary/50"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDelete(true)}
            className="flex gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive sm:hidden"
            type="button"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>

          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>

          <div className="border-t border-border pt-6">
            <Button
              onClick={startWhopLogin}
              className="w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary p-4 text-xl font-bold text-foreground hover:bg-secondary/80"
            >
              Sign in with Whop
            </Button>
          </div>
        </CardContent>
      </Card>

      <ModalProfile
        title="Delete Account"
        open={isDelete}
        onClose={() => setIsDelete(false)}
        firstText="Delete Account"
        firstColor="red"
        secondText="Cancel"
        desciption="This action will permanently delete your account and all associated data. This action cannot be undone."
        firstOnClick={handleDelete}
        secondOnClick={() => setIsDelete(false)}
      />
      <ModalProfile
        title="Confirm Your New Email Address"
        firstColor="white"
        desciption={`We've sent a confirmation link to ${email}. Please click the link in the email to complete the update. Until confirmed, your current email will remain active.`}
        onClose={() => setIsEmail(false)}
        firstOnClick={() => setIsEmail(false)}
        open={isEmail}
      />
      <ModalProfile
        title="Email Updated"
        firstColor="white"
        desciption={`Your email address has been successfully updated to ${email}.`}
        onClose={() => setIsEmailUpdated(false)}
        firstOnClick={() => setIsEmailUpdated(false)}
        open={isEmailUpdated}
      />
    </>
  );
};
