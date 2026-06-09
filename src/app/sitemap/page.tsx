export const metadata = {
  title: 'Sitemap | Reisvignet.nl',
};

export default function SitemapPage() {
  const pages = [
    '',
    '/frankrijk',
    '/zwitserland',
    '/oostenrijk',
    '/milieusticker-duitsland',
    '/vignet-slovenie',
    '/vignet-tsjechie',
    '/privacy',
    '/voorwaarden',
    '/hulp'
  ];

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black mb-10 italic">Sitemap</h1>
      <ul className="space-y-4">
        {pages.map(p => (
          <li key={p} className="border-b border-gray-100 pb-4">
            <a href={p || '/'} className="text-xl font-bold hover:text-[#ff385c]">
              https://reisvignet.nl{p || '/'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
