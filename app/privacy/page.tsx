import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import site from "@/config/site.json";

export const metadata = pageMetadata({
  title: "Privacy Notice",
  description: "Privacy and personal-data information for SaunaWhisks.com.",
  canonical: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <article className="legal-page">
        <p className="section-kicker">PRIVACY NOTICE</p>
        <h1>How SaunaWhisks.com handles personal data</h1>
        <p className="legal-note">Last updated: 25 September 2026</p>

        <section>
          <h2>Who is responsible for your data</h2>
          <p>
            SaunaWhisks.com is a Latvia-based pre-launch project. The formal legal controller name, registration details and postal address
            are still being finalized and will be published before commercial launch. Until those details are published, privacy requests
            and data-protection questions can be sent to <a href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a>.
          </p>
        </section>

        <section>
          <h2>Data you provide</h2>
          <p>
            When you send an enquiry, we may process your name, email address, message and any optional information you choose to provide,
            such as enquiry topic, business name, country, approximate quantity requirement or the page from which you contacted us.
          </p>
          <p>
            Sending an enquiry does not subscribe you to marketing email and does not create a customer account or purchase.
          </p>
        </section>

        <section>
          <h2>Technical and security data</h2>
          <p>
            Our hosting and security infrastructure may process technical request information such as IP address, browser or device information,
            timestamps and request metadata needed to deliver and secure the website. The enquiry endpoint also creates a request identifier and uses
            anti-abuse signals such as origin checks, a hidden spam field and submission timing.
          </p>
        </section>

        <section>
          <h2>Why we use personal data</h2>
          <p>Depending on the context, we process personal data to:</p>
          <ul>
            <li>respond to product, supplier, trade, press, shipping and general enquiries;</li>
            <li>take steps you request before a possible future contract;</li>
            <li>operate, secure and troubleshoot the website and enquiry service;</li>
            <li>maintain necessary business correspondence and protect legal rights; and</li>
            <li>comply with applicable legal obligations where required.</li>
          </ul>
          <p>
            The legal basis may be steps requested before entering a contract, our legitimate interests in responding to enquiries and protecting
            the website, compliance with legal obligations, or consent where a future feature specifically relies on consent.
          </p>
        </section>

        <section>
          <h2>Service providers and recipients</h2>
          <p>
            SaunaWhisks.com is hosted on Vercel infrastructure. When direct enquiry email delivery is configured, the website may use Resend
            as a transactional email service so an enquiry can be delivered to our public contact inbox. Relevant service providers process data
            only to provide their contracted infrastructure or communications services, subject to their own legal and security obligations.
          </p>
          <p>
            We do not sell personal data and we do not disclose enquiry information to advertisers.
          </p>
        </section>

        <section>
          <h2>International processing</h2>
          <p>
            Some infrastructure or communications providers may process data in countries outside Latvia or the European Economic Area.
            Where European data-protection law requires safeguards for such transfers, we expect the relevant provider arrangements and lawful
            transfer mechanisms to apply. More specific processor and transfer information will be published as the production service stack is finalized.
          </p>
        </section>

        <section>
          <h2>How long data is kept</h2>
          <p>
            Enquiry correspondence is kept only for as long as reasonably necessary to answer the enquiry, manage the related business conversation,
            preserve necessary records, resolve disputes or meet legal obligations. Technical logs are retained according to the security and operational
            settings of the relevant infrastructure provider. We will publish more specific commercial retention periods before checkout opens.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            Subject to the conditions in applicable law, you may have rights to request access to your personal data, correct inaccurate data,
            request erasure, restrict processing, object to certain processing and receive portable data where the portability right applies.
            Where processing is based on consent, you may withdraw that consent without affecting earlier lawful processing.
          </p>
          <p>
            To exercise a right, email <a href={`mailto:${site.publicEmail}?subject=Privacy%20request`}>{site.publicEmail}</a>.
            We may need enough information to verify that the request relates to you.
          </p>
        </section>

        <section>
          <h2>Complaints</h2>
          <p>
            If you believe your personal data has been handled unlawfully, you can contact us first so we can investigate.
            You also have the right to complain to Latvia&apos;s Data State Inspectorate or another competent supervisory authority.
          </p>
          <a className="text-link" href="https://www.dvi.gov.lv/en/rights-data-subject" target="_blank" rel="noreferrer">
            Latvia Data State Inspectorate — data-subject rights ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>

        <section>
          <h2>Automated decisions and marketing</h2>
          <p>
            The current website does not use personal data to make solely automated decisions with legal or similarly significant effects.
            Enquiry submission does not opt you into a newsletter or advertising profile.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            The current site does not intentionally use non-essential analytics or advertising cookies.
            See the <a href="/cookies">Cookie Notice</a> for the current position and how future consent controls will work.
          </p>
        </section>

        <section>
          <h2>Changes and contact</h2>
          <p>
            We will update this notice when the controller details, service providers, retention rules or processing activities materially change.
            Privacy questions can be sent to <a href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a>.
          </p>
        </section>
      </article>
    </>
  );
}
