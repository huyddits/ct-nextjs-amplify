export default function AppLoadingFullScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
    </div>
  );
}
