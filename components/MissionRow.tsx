'use client';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// Added an onToggle prop to inform the parent that data has changed
export default function MissionRow({ 
  mission, 
  onToggle 
}: { 
  mission: any, 
  onToggle: () => void // New prop to trigger a parent re-fetch
}) {
  const [completed, setCompleted] = useState(!!mission?.is_completed);

  useEffect(() => {
    setCompleted(!!mission?.is_completed);
  }, [mission?.is_completed]);

  const toggleMission = async () => {
    if (!mission?.id) return;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const nextStatus = !completed;
    setCompleted(nextStatus); // Optimistic UI update

    const { error } = await supabase
      .from('study_blocks') 
      .update({ is_completed: nextStatus })
      .eq('id', mission.id);

    if (error) {
      console.error('Update failed:', error);
      setCompleted(!nextStatus); // Rollback
    } else {
      // Successfully updated! 
      // Notify the parent to re-fetch the analytics/mission list.
      onToggle?.(); 
    }
  };

  return (
    <div className="border border-neutral-900 p-6 flex justify-between items-center transition-all">
      <div>
        <p className="text-[10px] text-indigo-500 uppercase tracking-widest font-bold">
          {mission.course_code}
        </p>
        <h3 className="text-xl font-light text-white">{mission.course_name}</h3>
      </div>
      <button 
        onClick={toggleMission}
        className={`text-[10px] uppercase tracking-widest transition-colors ${
          completed ? 'text-green-500' : 'text-neutral-600 hover:text-white'
        }`}
      >
        {completed ? '✓ Executed' : 'Mark Executed'}
      </button>
    </div>
  );
}