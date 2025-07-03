import AboutDeveloper from '@/components/AboutDeveloper';
import HomePage from '@/components/HomePage';
import LiveStats from '@/components/LiveStats';
import VibeWith from '@/components/Vibe';
export default function Home() {
  return (
   <div>
    <HomePage />
    <VibeWith />
    <LiveStats />
    <AboutDeveloper />
   </div>
  )
}