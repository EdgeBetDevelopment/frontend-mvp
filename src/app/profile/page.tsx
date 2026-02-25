import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { ProfileSection } from '@/modules/profile';

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-3xl font-bold md:text-4xl">
            My Account
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription and account settings
          </p>
        </div>

        <ProfileSection />
      </main>
      <Footer />
    </div>
  );
}
