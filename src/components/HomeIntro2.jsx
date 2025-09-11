import React, { useState } from 'react';
import HomeIntro from './HomeIntro';

// To make this a single file, we're using a CDN for lucide-react.
// In a real project, you would install it via npm.
const createLucideIcon = (iconName, svgData) => {
  return ({ color = 'currentColor', size = 24, strokeWidth = 2, className = '', ...props }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      dangerouslySetInnerHTML={{ __html: svgData }}
    />
  );
};

// SVG data for lucide-react icons
const icons = {
  GraduationCap: `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3.33 1.67 6.67 1.67 10 0v-5"/>`,
  Shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  Users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  Briefcase: `<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
  Cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  Server: `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>`,
  Code: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
  HeartHandshake: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.1 2.1 0 0 0 0 2.97L12 13.88l2.96-2.95a2.1 2.1 0 0 0 0-2.97L12 5Z"/>`,
  Music: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,
  BookOpen: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
  Sparkles: `<path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 21l1.9-5.8 5.8-1.9-5.8-1.9L12 3z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>`,
  Cpu: `<rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />`
};

const GraduationCap = createLucideIcon('GraduationCap', icons.GraduationCap);
const Shield = createLucideIcon('Shield', icons.Shield);
const Users = createLucideIcon('Users', icons.Users);
const Briefcase = createLucideIcon('Briefcase', icons.Briefcase);
const Cloud = createLucideIcon('Cloud', icons.Cloud);
const Server = createLucideIcon('Server', icons.Server);
const Code = createLucideIcon('Code', icons.Code);
const HeartHandshake = createLucideIcon('HeartHandshake', icons.HeartHandshake);
const Music = createLucideIcon('Music', icons.Music);
const BookOpen = createLucideIcon('BookOpen', icons.BookOpen);
const Sparkles = createLucideIcon('Sparkles', icons.Sparkles);
const Cpu = createLucideIcon('Cpu', icons.Cpu);

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-slate-600/80 hover:bg-slate-800/70 ${className}`}>
    {children}
  </div>
);

const SkillPill = ({ children }) => (
  <span className="inline-block bg-green-500/10 text-green-300 text-xs font-medium px-3 py-1 rounded-full border border-green-500/30">
    {children}
  </span>
);

// New component for the interactive, flip-able experience card
const ExperienceCard = ({ icon: Icon, title, subtitle, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 w-full h-56 cursor-pointer rounded-2xl"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 preserve-3d rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Card Front */}
        <div className="absolute inset-0 backface-hidden bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl flex flex-col items-center justify-center text-center p-4 shadow-xl">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-700/50 border border-slate-600/50 rounded-full flex items-center justify-center text-pink-400 mb-4 transition-all duration-300 group-hover:bg-slate-700 group-hover:border-slate-500 group-hover:text-cyan-300 shadow-md">
            <Icon size={40} />
          </div>
          <h3 className="font-bold text-lg text-green-300">{title}</h3>
          <p className="text-sm text-blue-300">{subtitle}</p>
        </div>
        
        {/* Card Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl flex flex-col items-center justify-center p-6 shadow-xl">
          <p className="text-slate-300 text-sm text-center">{description}</p>
        </div>
      </div>
    </div>
  );
};


function HomeIntro2() {
  return (
    <div className=" rounded-2xl min-h-screen w-full bg-slate-900 text-slate-100 font-sans overflow-hidden relative">
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeIn 1s ease-out forwards;
        }
        /* CSS for 3D card flip effect */
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        `}
      </style>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800"></div>
        <div className="absolute h-[500px] w-[500px] bg-gradient-to-tr from-pink-500/30 to-blue-500/30 rounded-full -top-40 -left-60 animate-pulse-slow blur-3xl"></div>
        <div className="absolute h-[400px] w-[400px] bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full -bottom-20 -right-20 animate-pulse-slower blur-3xl opacity-80"></div>
      </div>
      
      <main className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          
          <HomeIntro />

          <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center gap-2">
              <Sparkles size={24} /> My Journey
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <ExperienceCard
                icon={GraduationCap}
                title="B.Tech. in Computer Science"
                subtitle="Manipal University"
                description="Built a strong foundation in CS and data analytics."
              />
              <ExperienceCard
                icon={Shield}
                title="Board Member"
                subtitle="Manipal Information Security Team"
                description="Became a leader and deepened my understanding of cybersecurity."
              />
              <ExperienceCard
                icon={Users}
                title="Teacher Assistant"
                subtitle="Coding Ninjas"
                description="Taught DSA and data analysis, which sharpened my own skills."
              />
              <ExperienceCard
                icon={Briefcase}
                title="Backend Developer"
                subtitle="Bank of America"
                description="Gained hands-on enterprise software development experience."
              />
              <ExperienceCard
                icon={Cloud}
                title="Google Cloud Cohort"
                subtitle="Cloud Trainee"
                description="Strengthened my expertise in building scalable cloud infrastructure."
              />
              <ExperienceCard
                icon={Server}
                title="Full-Stack Developer"
                subtitle="EazyByts"
                description="Currently broadening my horizons with end-to-end development."
              />
            </div>
          </Card>
          
          <Card className="animate-fade-in-up" style={{ animationDelay: '1600ms' }}>
            <h2 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center gap-2">
              <Code size={24} /> About This Portfolio
            </h2>
            <p className="text-slate-300 mb-4">
              You're looking at a working demo of my full-stack skills. It ties together everything I enjoy: designing secure backends, building smooth frontends, and sprinkling in automation that makes life easier.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <SkillPill>MongoDB</SkillPill>
              <SkillPill>Express</SkillPill>
              <SkillPill>React</SkillPill>
              <SkillPill>Node.js</SkillPill>
              <SkillPill>Secure Backends</SkillPill>
              <SkillPill>Smooth Frontends</SkillPill>
            </div>
            <p className="text-slate-300">
              I’ve also built gaming projects and automation pipelines — because sometimes the best way to learn is to play, and the best way to work is to automate.
            </p>
          </Card>

          <Card className="animate-fade-in-up" style={{ animationDelay: '1800ms' }}>
            <h2 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center gap-2">
              <HeartHandshake size={24} /> Beyond the Code
            </h2>
            <p className="text-slate-300 mb-4">
              Beyond the code, I stay grounded through music, meditation, reading, and living a life of service. For me, development isn’t just about apps — it’s about harmony: between tech and people, between creation and peace.
            </p>
            <div className="flex items-center justify-center gap-8 text-pink-300 mt-6">
              <Music size={28} />
              <Cpu size={28} />
              <BookOpen size={28} />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default HomeIntro2;
