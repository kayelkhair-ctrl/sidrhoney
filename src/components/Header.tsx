export function Header() {
  return (
    <header className="nav">
      <a className="nav__brand" href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="nav__mark" src="/media/logo-mark.png" alt="" />
        <span>SIDR HONEY</span>
      </a>
      <nav className="nav__links" aria-label="Main">
        <a href="/#promise">The Standard</a>
        <a href="/#collection">Collection</a>
        <a href="/products/">All Products</a>
        <a href="/#story">Story</a>
        <a href="/#faq">FAQ</a>
      </nav>
      <a className="nav__cta" href="/#contact">
        Enquire
      </a>
    </header>
  );
}
