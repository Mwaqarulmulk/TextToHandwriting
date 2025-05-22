import React from 'react';
import { FacebookIcon, InstagramIcon, LinkedInIcon, GitHubIcon, YouTubeIcon, EmailIcon, ExternalLinkIcon } from '../constants';

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/mwaqarulmulk', icon: FacebookIcon },
  { name: 'Instagram', href: 'https://instagram.com/mwaqarulmulk', icon: InstagramIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/mwaqarulmulk', icon: LinkedInIcon },
  { name: 'GitHub', href: 'https://github.com/mwaqarulmulk', icon: GitHubIcon },
  { name: 'YouTube', href: 'https://youtube.com/@mwaqarulmulk', icon: YouTubeIcon },
  { name: 'Email', href: 'mailto:mewaqarulmulk@gmail.com', icon: EmailIcon },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e1e1e] text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          
          {/* About Me Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              {/* ‼️ USER ACTION: Replace "YOUR_IMAGE_URL_HERE.jpg" with the actual path to your image. 
                  If you place it in a 'public' folder, it would be e.g., "/your-image.jpg" ‼️ */}
              <img
                src="profile.png" // Placeholder - REPLACE THIS
                alt="Muhammad Waqar Ul Mulk"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=MW'; }} // Fallback placeholder
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mr-0 sm:mr-6 mb-4 sm:mb-0 flex-shrink-0 border-2 border-indigo-500 shadow-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">About Me</h3>
                <p className="text-sm leading-relaxed">
                  Hi, I'm Muhammad Waqar Ul Mulk — a passionate software engineer and developer from Lahore, Pakistan. 
                  I specialize in building unique digital solutions, including text-to-handwriting apps, Flutter applications, 
                  AI tools, and full-stack websites. I love turning innovative ideas into practical, user-friendly platforms.
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Me</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-300 bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-all duration-300"
                  aria-label={`Connect with Muhammad Waqar Ul Mulk on ${item.name}`}
                  title={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Powered By & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Powered By</h3>
            <p className="text-sm mb-2"> 
              This platform is supported by:
            </p>
            <a 
              href="https://bestdigitalagency.tech" // Example URL, replace if needed
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm inline-flex items-center group"
            >
              🌐 Digital Pulse Studio 
              <ExternalLinkIcon className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-xs mt-1 text-gray-500">Experts in web, AI, and app development.</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-10 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Muhammad Waqar Ul Mulk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;