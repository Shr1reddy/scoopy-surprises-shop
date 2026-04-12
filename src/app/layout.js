import './globals.css';

export const metadata = {
  title: 'Scoopy Surprises — Order Your Gift Scoop',
  description:
    'Create a personalised surprise gift box with Scoopy Surprises. Choose from Mini, Regular, or Premium scoops filled with cute stationery, kids jewellery, DIY painting kits & fancy hair essentials.',
  keywords: ['gift box', 'surprise box', 'kids gifts', 'women gifts', 'scoopy surprises', 'India'],
  openGraph: {
    title: 'Scoopy Surprises — Order Your Gift Scoop',
    description: 'Curated surprise boxes for women & kids. Order online & get it delivered!',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
