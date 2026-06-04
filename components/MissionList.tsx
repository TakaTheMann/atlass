'use client';
import { useRouter } from 'next/navigation';
import MissionRow from '@/components/MissionRow';

export default function MissionList({ initialMissions }: { initialMissions: any[] }) {
  const router = useRouter();

  const handleToggle = () => {
    router.refresh(); // Forces a re-fetch of the server component data
  };

  return (
    <div className="flex flex-col">
      {initialMissions.map((m: any, index: number) => (
        <MissionRow 
          key={m.id || index} 
          mission={m} 
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}