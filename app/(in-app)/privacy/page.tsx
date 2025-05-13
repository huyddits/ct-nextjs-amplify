export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pt-4 pb-[80px] max-w-3xl mx-auto p-4">
        {/* Privacy Policy Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <h1 className="text-2xl font-bold text-primary mb-6">Privacy Policy</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Introduction</h2>
              <p className="text-gray-600 text-sm">Last updated: March 16, 2025</p>
              <p className="text-gray-600 mt-2">
                This Privacy Policy describes how we collect, use, and disclose your information
                when you use our athlete training application. We are committed to protecting your
                privacy and ensuring you understand how your data is handled.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Information We Collect</h2>
              <p className="text-gray-600 mb-2">We collect the following types of information:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Personal information (name, email address, profile information)</li>
                <li>Training data (workouts, check-offs, measurements)</li>
                <li>Performance metrics (strength, cardio, hit/miss rates)</li>
                <li>Device information (device type, operating system, app version)</li>
                <li>Usage data (features used, time spent in app)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-2">We use your information to:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Provide and improve our services</li>
                <li>Track your training progress and achievements</li>
                <li>Generate insights and recommendations</li>
                <li>Communicate with you about your account</li>
                <li>Ensure the security of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Data Sharing and Disclosure
              </h2>
              <p className="text-gray-600">We may share your information with:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Your team coaches and administrators (with your permission)</li>
                <li>Service providers who help us operate our platform</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="text-gray-600 mt-2">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your information from
                unauthorized access, alteration, disclosure, or destruction. However, no method of
                transmission over the Internet or electronic storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Rights</h2>
              <p className="text-gray-600 mb-2">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal information</li>
                <li>Restrict or object to certain processing activities</li>
                <li>Export your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the "Last
                updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-600 mt-2">
                Email: privacy@athleteapp.com
                <br />
                Phone: (555) 123-4567
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
