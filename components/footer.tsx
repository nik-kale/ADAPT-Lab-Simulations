import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-[1600px] px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link href="#" className="hover:text-foreground transition-colors">
              Trademarks
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© 2025 ADAPT LIMS by Nik Kale</p>
            <p className="text-xs mt-1">For laboratory demonstration purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
