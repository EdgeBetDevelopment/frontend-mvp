'use client';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="tl-container relative">{children}</div>;
}
