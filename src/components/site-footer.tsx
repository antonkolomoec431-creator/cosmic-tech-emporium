import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.3em]">XENOVAULT</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Authenticated extraterrestrial technology, recovered and restored for discerning
            terrestrials.
          </p>
        </div>
        <div>
          <p className="label-mono text-muted-foreground">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/shop" className="hover:text-primary-glow">
                All artifacts
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-primary-glow">
                Your cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label-mono text-muted-foreground">Transmission</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Free interstellar shipping on every order. Each device ships with a certificate of
            off-world origin.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center">
        <p className="label-mono text-muted-foreground">© 2026 Xenovault · Earth Outpost 01</p>
      </div>
    </footer>
  );
}
