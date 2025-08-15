import Link from 'next/link';
import { FaUsers, FaHeart, FaGraduationCap } from 'react-icons/fa';

const codeBgSVG = (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
    <defs>
      <linearGradient id="gradCode" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0ff" />
        <stop offset="100%" stopColor="#ff66cc" />
      </linearGradient>
    </defs>
    <text x="10" y="60" fill="url(#gradCode)" fontSize="32" fontFamily="monospace" opacity="0.22">
      {'{ user: "VibeMatch", mood: "coded" }'}
    </text>
    <text x="140" y="200" fill="#00ffff" fontSize="22" fontFamily="monospace" opacity="0.12">
      {'function findConnection(user) {'}
    </text>
    <text x="200" y="240" fill="#ff66cc" fontSize="18" fontFamily="monospace" opacity="0.10">
      {'return interests.filter(...);'}
    </text>
    <text x="280" y="400" fill="#22c55e" fontSize="14" fontFamily="monospace" opacity="0.20">
      {'// College vibes loading...'}
    </text>
  </svg>
);

const LandingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden">
      {/* Coded background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-gray-950 opacity-95"></div>
      <div className="absolute inset-0">{codeBgSVG}</div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-transparent via-[#1f2937]/30 to-transparent pointer-events-none"></div>

      {/* Main Content (Centered) */}
      <div className="flex flex-col items-center justify-center z-20 mt-10">
        <h1
          className="text-5xl font-bold font-mono drop-shadow-[0_0_18px_#00ffff] drop-shadow-[0_0_32px_#00ffff] mb-4"
          style={{
            color: '#00ffff',
            textShadow: '0 0 16px #00ffff, 0 0 8px #00ffff',
          }}
        >
          Welcome to Vibe Match
        </h1>
        <p
          className="text-2xl font-mono mb-6"
          style={{
            color: '#ff66cc',
            textShadow: '0 0 16px #ff66cc, 0 0 8px #ff66cc',
          }}
        >
          Find your perfect college connection based on shared interests and personality!
        </p>
        {/* Visible, Glowing Sign In Button */}
        <Link href="/signin" passHref>
          <button
            className="mt-2 px-12 py-5 rounded-full text-2xl font-bold font-mono transition-all duration-300 ease-in-out hover:scale-105"
            style={{
              backgroundColor: '#00ffff',
              color: '#222',
              boxShadow: '0 0 16px #00ffff, 0 0 16px #00ffff',
              textShadow: '0 0 6px #00ffff',
            }}
          >
            Sign In
          </button>
        </Link>
      </div>

      {/* Iconography (Optional, left bottom) */}
      <div className="absolute bottom-8 left-8 flex space-x-4 z-20">
        <FaUsers className="text-blue-500 text-3xl drop-shadow-[0_0_8px_#3b82f6] drop-shadow-[0_0_16px_#3b82f6] hover:animate-pulse" />
        <FaHeart className="text-purple-500 text-3xl drop-shadow-[0_0_8px_#a855f7] drop-shadow-[0_0_16px_#a855f7] hover:animate-pulse" />
        <FaGraduationCap className="text-green-500 text-3xl drop-shadow-[0_0_8px_#22c55e] drop-shadow-[0_0_16px_#22c55e] hover:animate-pulse" />
      </div>
    </div>
  );
};

export default LandingPage;
