export default function InAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Layout In App</div>
      <div>{children}</div>
    </div>
  );
}
