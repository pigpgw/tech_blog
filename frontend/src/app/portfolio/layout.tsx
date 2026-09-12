import "./portfolio.css";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="portfolio">{children}</div>;
}
