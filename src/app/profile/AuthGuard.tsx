'use client';

import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Footer,
  Navigation,
} from '@/shared/components';

interface AuthGuardProps {
  children: React.ReactNode;
  message?: string;
}

export default function AuthGuard({
  children,
  message = 'Please login to access this page.',
}: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 py-8">
          <div className="flex min-h-[60vh] items-center justify-center">
            <Card className="max-w-md">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">
                  Login Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">{message}</p>
                <Button
                  className="w-full"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return <>{children}</>;
}
