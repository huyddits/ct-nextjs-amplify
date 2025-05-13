export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pt-4 pb-[80px] max-w-3xl mx-auto p-4">
        {/* Terms and Conditions Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <h1 className="text-2xl font-bold text-primary mb-6">Terms and Conditions</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Agreement to Terms</h2>
              <p className="text-gray-600 text-sm">Last updated: March 16, 2025</p>
              <p className="text-gray-600 mt-2">
                These Terms and Conditions constitute a legally binding agreement made between you
                and our company concerning your access to and use of our athlete training
                application. By creating an account or using the application, you agree to be bound
                by these Terms and all terms incorporated by reference.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Account Registration</h2>
              <p className="text-gray-600 mb-2">By creating an account, you agree that:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>All registration information you submit is accurate and truthful</li>
                <li>You will maintain the accuracy of such information</li>
                <li>You are responsible for maintaining the confidentiality of your password</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You will immediately notify us of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Subscription and Billing</h2>
              <p className="text-gray-600">
                Some features of the application require a paid subscription. By subscribing to our
                premium services:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1 mt-2">
                <li>You authorize us to charge your chosen payment method on a recurring basis</li>
                <li>
                  Subscriptions automatically renew unless canceled at least 24 hours before the
                  renewal date
                </li>
                <li>You can cancel your subscription through your account settings</li>
                <li>No refunds will be issued for partial subscription periods</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">User Content</h2>
              <p className="text-gray-600">
                You retain all rights to any content you submit, post, or display on or through the
                application. By submitting content, you grant us a worldwide, non-exclusive,
                royalty-free license to use, reproduce, modify, adapt, publish, and display such
                content for the purpose of providing and improving our services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Prohibited Activities</h2>
              <p className="text-gray-600 mb-2">You agree not to:</p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Use the application for any illegal purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe upon the rights of others</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the application</li>
                <li>Share your account credentials with others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Intellectual Property</h2>
              <p className="text-gray-600">
                The application and its original content, features, and functionality are owned by
                our company and are protected by international copyright, trademark, patent, trade
                secret, and other intellectual property laws. You may not reproduce, distribute,
                modify, create derivative works of, publicly display, or exploit any portion of our
                application without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Limitation of Liability</h2>
              <p className="text-gray-600">
                To the maximum extent permitted by law, we shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages resulting from your use or
                inability to use the application. This includes damages for loss of profits,
                goodwill, data, or other intangible losses, even if we have been advised of the
                possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Disclaimer of Warranties</h2>
              <p className="text-gray-600">
                The application is provided "as is" and "as available" without warranties of any
                kind, either express or implied. We do not guarantee that the application will be
                uninterrupted, secure, or error-free. You use the application at your own risk and
                discretion.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Termination</h2>
              <p className="text-gray-600">
                We reserve the right to suspend or terminate your account and access to the
                application at our sole discretion, without notice, for conduct that we believe
                violates these Terms or is harmful to other users, us, or third parties, or for any
                other reason.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Changes to Terms</h2>
              <p className="text-gray-600">
                We may revise these Terms at any time by updating this page. By continuing to use
                the application after such changes, you agree to be bound by the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of the
                state of California, without regard to its conflict of law provisions. Any disputes
                arising under these Terms will be subject to the exclusive jurisdiction of the
                courts located in California.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="text-gray-600 mt-2">
                Email: legal@athleteapp.com
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
