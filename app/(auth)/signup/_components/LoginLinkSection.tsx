import Link from 'next/link';
export default function LoginLinkSection() {
  return (
    <div className="text-center mt-6">
      <p className="text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
