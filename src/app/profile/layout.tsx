import AuthGuard from './AuthGuard';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
