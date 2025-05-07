export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      <div className="max-w-md w-full mx-auto">{children}</div>
    </div>
  );
}
