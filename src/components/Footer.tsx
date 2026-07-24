import { SITE } from "@/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="footer__mark" src="/media/logo-mark.png" alt="" />
          <div className="footer__brand">
            {SITE.name.toUpperCase()} · {SITE.nameSuffix.toUpperCase()}
          </div>
          <p>
            Importers of fine foods of the Islamic tradition. Bought at source,
            container by container, and sold with our name on it.
          </p>
        </div>
        <div>
          <h4>Visit</h4>
          <a href="/#collection">The Collection</a>
          <a href="/products/">All Products</a>
          <a href="/#promise">Our Promise</a>
          <a href="/#story">Our Story</a>
          <a href="/#faq">Questions</a>
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          {SITE.phone ? (
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
          ) : null}
          <a href="/#contact">Wholesale enquiries</a>
        </div>
      </div>
      <div className="footer__legal">
        © {new Date().getFullYear()} {SITE.legalName}. Our products
        are traditional, natural foods. Nothing on this site is medical advice,
        and our products are not intended to diagnose, treat, cure or prevent
        any disease.
      </div>
    </footer>
  );
}
