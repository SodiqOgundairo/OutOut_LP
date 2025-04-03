import logo from "./../assets/img/OutOut.png"

const Privacy = () => {
  return (
    <div className="flex flex-col p-10 gap-5 justify-center md:w-[800px] mx-auto">
        <div className="flex justify-center  flex.col">
<div className="flex-col flex items-center text-center mb-6">

      <img src={logo} alt="outout Logo" className="w-1/4" />
      <div className="flex flex-col">
        <p className="text-2xl text-primary font-bold">Privacy Policy</p>
        <p className="text-xl text-primary">Effective Date: 01/01/2025</p>
      </div>
</div>
        </div>

      <div className="text-primary font-normal flex flex-col gap-4">
        <p>
          {" "}
          OutOut ("we," "us," or "our") is committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, store, and protect
          your personal information in accordance with the UK General Data
          Protection Regulation (UK GDPR) and other applicable data protection
          laws.
        </p>
        <ol className="list-item space-y-8 ">
          <li className="list-item list-decimal">
            <span className="block font-bold">Information We Collect</span>
            1.1 We collect the following types of data when you use the OutOut
            app:
            <ul className="ms-4 ">
              <li className="list-item list-disc">
                <span className="font-bold">Personal Data:</span> Name, email
                address, phone number, and profile information.
              </li>
              <li className="list-item list-disc">
                <span className="font-bold">Location Data:</span> To assist with
                event planning and location-based features (with your consent).
              </li>

              <li className="list-item list-disc">
                <span className="font-bold">Expense Data:</span> Details related
                to expense tracking and cost-sharing activities (note: we do not
                process payment transactions).
              </li>

              <li className="list-item list-disc">
                <span className="font-bold">User Content:</span> Photos, videos,
                comments, and other content shared within the app.
              </li>

              <li className="list-item list-disc">
                <span className="font-bold">Usage Data:</span> Information about
                how you interact with the app, including device information, log
                data, and app usage statistics.
              </li>
            </ul>
          </li>
          <li className="list-item list-decimal">
            <span className="block font-bold">
              How We Use Your Information{" "}
            </span>
            2.1 We use your data to:
            <ul className="ms-4 ">
              <li className="list-item list-disc">
                Provide and improve our services.
              </li>
              <li className="list-item list-disc">
                Facilitate trip planning, event coordination, and group expense
                management.
              </li>
              <li className="list-item list-disc">
                Personalise user experience and recommend relevant content.
              </li>
              <li className="list-item list-disc">
                Enable tracking and management of shared expenses (without
                processing payments).
              </li>
              <li className="list-item list-disc">
                Communicate with you regarding updates, promotions, and customer
                support.
              </li>
              <li className="list-item list-disc">
                Ensure security and prevent fraudulent activities.
              </li>
            </ul>
          </li>
          <li className="list-item list-decimal">
            <span className="block font-bold">
              Legal Basis for Processing Data
            </span>
            3.1 We process your personal data under the following legal bases:
            <ul className="ms-4 ">
              <li className="list-item list-disc">
                Consent: For processing data like location and marketing
                preferences
              </li>

              <li className="list-item list-disc">
                Contractual Necessity: To deliver our services as agreed.
              </li>
              <li className="list-item list-disc">
                Legitimate Interest: For improving services, ensuring security,
                and preventing fraud.
              </li>
              <li className="list-item list-disc">
                Legal Obligation: To comply with legal requirements.
              </li>
            </ul>
          </li>
          <li className="list-item list-decimal">
            <span className="block font-bold">Data Sharing and Disclosure</span>
             
            <span className="block my-2">
              4.1 We may share data with service providers that help operate the
              app (e.g., cloud storage providers).
            </span>
            <span className="block my-2">
              4.2 Payment facilitation is managed entirely by third-party
              payment processors; OutOut does not process or store payment
              transaction data.
            </span>
            <span className="block my-2">
              4.3 We may disclose data if required by law or to protect our
              legal rights.
            </span>
            <span className="block my-2">
              4.4 We do not sell or rent your personal data to third parties.
            </span>
          </li>

          <li className="list-item list-decimal">
            <span className="block font-bold">Data Retention</span> 
            <span className="block my-2">
              5.1 We retain personal data only as long as necessary to fulfil
              the purposes outlined in this policy.
            </span>
            <span className="block my-2">
              5.2 You may request data deletion by contacting us at
              hello@outout.app
            </span>
          </li>

          <li className="list-item list-decimal">
            <span className="block font-bold">Data Security </span> 
            <span className="block my-2">
              6.1 We implement appropriate technical and organisational measures
              to protect your data.
            </span>
            <span className="block my-2">
              6.2 We use encryption, secure servers, and access controls to
              safeguard personal data.
            </span>
          </li>

          <li className="list-item list-decimal">
            <span className="block font-bold">
              International Data Transfers
            </span>
             
            <span className="block my-2">
              7.1 If we transfer your data outside the UK, we ensure appropriate
              safeguards are in place to protect your information, in compliance
              with UK GDPR.
            </span>
          </li>

          <li className="list-item list-decimal">
            <span className="block font-bold">Your Rights</span> 
            <span className="block my-2">
              8.1 Under the UK GDPR, you have the right to:
            </span>
            <ul className="ms-4 ">
              <li className="list-item list-disc">
                Access your personal data.
              </li>

              <li className="list-item list-disc">
                Correct inaccurate or incomplete data.
              </li>
              <li className="list-item list-disc">
                Request deletion of your data.
              </li>
              <li className="list-item list-disc">
                Restrict or object to data processing.
              </li>
              <li className="list-item list-disc">Data portability.</li>
              <li className="list-item list-disc">
                Withdraw consent at any time (where consent was the basis for
                processing).
              </li>
            </ul>
          </li>

          <li className="list-item list-decimal">
            <span className="block font-bold">
              Cookies and Tracking Technologies{" "}
            </span>
             
            <span className="block my-2">
              9.1 We use cookies and similar technologies to improve app
              performance and user experience.
            </span>
            <span className="block my-2">
              9.2 You can manage your cookie preferences through your device
              settings.
            </span>
          </li>

          <li className="list-item list-decimal">
            <span className="block font-bold">
              Changes to This Privacy Policy{" "}
            </span>
             
            <span className="block my-2">
              10.1 We may update this Privacy Policy from time to time.
              Significant changes will be communicated via the app or email.
            </span>
          </li>

          <li className="list-item list-decimal">
            <span className="block font-bold"> Contact Us </span> 
            <span className="block my-2">
              If you have any questions or concerns about this Privacy Policy or
              how we handle your data, please contact us at:
            </span>
            <span className="block my-2">OutOutAddress:</span>
            <span className="block my-2">
              17 Holywell Hill, St. Albans, Hertfordshire, AL1 1DT, United
              Kingdom.
            </span>
            <span className="flex flex-col my-2 space-y-1">
                <span> 

              Email: <a href="mailto: hello@outout.app"> get@outout.app</a>
                </span>
                <span>

              Phone: <a href="tel:+4407731782190">07731782190</a>
                </span>
            </span>
          </li>
        </ol>
      </div>
    </div>
  )
}

export default Privacy
