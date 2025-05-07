import Link from "next/link";

export default function SignupLinkSection() {
  return (
    <div className="text-center mt-6">
      <p className="text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-primary font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
