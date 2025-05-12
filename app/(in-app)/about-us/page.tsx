import { Mail, Phone, Instagram, Twitter, Facebook } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pt-4 pb-[80px] max-w-3xl mx-auto p-4">
        {/* About Us Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
          <h1 className="text-2xl font-bold text-primary mb-6">About Cheer Trainer</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Where Expertise Meets Passion
              </h2>
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src="/placeholder.svg?height=192&width=576"
                  alt="Cheerleading team in action"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-gray-600">
                Cheer Trainer is a pioneering progressive web application created by Dr. Chaz
                Johnson, whose journey embodies the perfect fusion of elite cheerleading experience
                and advanced medical expertise.
              </p>
              <p className="text-gray-600 mt-3">
                As a former Division II cheerleader and multiple UCA National Title winner at
                Northwest Missouri State University, Dr. Johnson brings authentic competitive
                experience to every aspect of our platform. His academic credentials—a
                Bachelor&apos;s in Psychology and Biopsychology, a Master&apos;s in Biology, and a
                Doctorate in Physical Therapy from the University of Kansas Medical Center—provide
                the scientific foundation that sets Cheer Trainer apart.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Innovation Born from Necessity
              </h2>
              <p className="text-gray-600">
                After establishing his career in outpatient rehabilitation, where he specialized in
                helping patients return to physically demanding occupations, Dr. Johnson identified
                a critical gap in the cheerleading community: the absence of scientifically-backed,
                accessible training resources designed specifically for cheerleaders.
              </p>
              <p className="text-gray-600 mt-3">
                Cheer Trainer emerged from this vision—a progressive web application that combines
                cutting-edge physical therapy principles with sport-specific training methodologies,
                making expert guidance accessible to cheerleaders everywhere.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Continuous Evolution Through Practice
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=96&width=96"
                    alt="Dr. Chaz Johnson"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Dr. Chaz Johnson</h3>
                  <p className="text-sm text-gray-600">Founder & CEO</p>
                  <p className="text-sm text-gray-600 mt-1">
                    DPT, Former Division II Cheerleader, UCA National Title Winner
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                What truly distinguishes Cheer Trainer is our commitment to hands-on development.
                Dr. Johnson actively participates in training and stunting sessions, gathering
                real-time insights into the physical demands of cheerleading. This practical
                approach ensures that our platform continuously evolves to address the actual
                challenges faced by today&apos;s athletes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                A Collaborative Network of Excellence
              </h2>
              <p className="text-gray-600">
                Behind Cheer Trainer stands a diverse network of elite coaches from All-Star
                programs, high schools, and colleges, alongside accomplished cheerleaders from
                various backgrounds. This collaborative approach ensures that our progressive web
                application meets the needs of cheerleaders at every level—from beginners mastering
                fundamentals to elite athletes perfecting advanced techniques.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Our Mission</h2>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-primary">
                <p className="text-gray-700 italic">
                  &quot;To revolutionize cheerleading training by making expert knowledge accessible
                  to all, reducing injury rates, and helping every cheerleader reach their full
                  potential through evidence-based methods and innovative technology.&quot;
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span className="text-gray-600">info@cheertrainer.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span className="text-gray-600">(555) 123-4567</span>
                </div>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-primary hover:text-green-800 transition-colors">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-primary hover:text-green-800 transition-colors">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-primary hover:text-green-800 transition-colors">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
