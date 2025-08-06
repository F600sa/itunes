import { FaHome, FaCompass, FaListUl, FaPodcast, FaClock } from 'react-icons/fa';

const sidebarItems = [
  { label: 'Home', icon: <FaHome size={18} />, href: '#' },
  { label: 'Discover', icon: <FaCompass />, href: '#' },
];

const yourStuff = [
  { label: 'My Queue', icon: <FaListUl />, href: '#' },
  { label: 'My Podcasts', icon: <FaPodcast />, href: '#' },
  { label: 'Recents', icon: <FaClock />, href: '#' },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-w-[225px] flex-col border-r border-gray-800 bg-black/10 px-6 text-white lg:flex">
      <div className="mt-6 mb-6">
        <FaPodcast className="text-purple-400" size={45} />
      </div>

      <NavGroup items={sidebarItems} />
      <div className="mt-6 mb-2 text-xs text-gray-500 uppercase">Your Stuff</div>
      <NavGroup items={yourStuff} />
    </aside>
  );
}

function NavGroup({ items }: { items: { label: string; icon: React.ReactNode; href: string }[] }) {
  return (
    <nav className="flex flex-col">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 py-2.5 text-sm text-gray-300 hover:text-white"
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </nav>
  );
}
