'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import AboutPageRobot from './AboutPageRobot';

const HomeRobotScene = dynamic(() => import('./HomeRobotScene'), { ssr: false });

export default function RobotLayoutWrapper() {
  const pathname = usePathname();
  const isAbout = pathname === '/about';

  return null; // Global robot removal as requested
}
