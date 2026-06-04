export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data: settings } = await supabase
    .from('app_settings')
    .select('exam_countdown_date')
    .single();

  // Normalize dates to midnight to ensure accurate day-count calculation
  const examDate = settings?.exam_countdown_date 
    ? new Date(settings.exam_countdown_date) 
    : new Date();
  const now = new Date();

  examDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = examDate.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <main
      className="min-h-screen flex flex-col justify-between p-14"
      style={{
        background: '#0a0a0a',
        color: '#e8e4dc',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <header className="flex justify-end items-start">
        <div
          className="text-right"
          style={{
            fontSize: 11,
            color: 'rgba(232,228,220,0.55)',
            letterSpacing: '0.08em',
            lineHeight: 1.9,
          }}
        >
          <div>Mr Emmanuel Mutaka</div>
          <div>Mission Status · Active</div>
        </div>
      </header>

      <section className="flex flex-col justify-center py-16">
        <p
          style={{
            fontSize: 12,
            color: 'rgba(232,228,220,0.75)',
            letterSpacing: '0.08em',
            marginBottom: 20,
          }}
        >
          Welcome, Mr Emmanuel Mutaka
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(80px, 14vw, 148px)',
            fontWeight: 400,
            color: '#e8e4dc',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: 24,
          }}
        >
          Atlas
        </h1>

        <p
          style={{
            fontSize: 14,
            color: 'rgba(232,228,220,0.55)',
            maxWidth: 520,
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          Your personal academic command center. Every topic mastered,
          every session tracked, every examination accounted for.
        </p>

        <p
          style={{
            fontSize: 11,
            color: 'rgba(232,228,220,0.55)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Days Remaining
        </p>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(48px, 8vw, 80px)',
            color: '#e8e4dc',
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            marginBottom: 4,
            fontWeight: 500,
          }}
        >
          {daysRemaining}
        </p>

        <p
          style={{
            fontSize: 11,
            color: 'rgba(232,228,220,0.45)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Until Final Examinations
        </p>

        <div
          style={{
            width: '100%',
            height: 1,
            background: 'rgba(232,228,220,0.12)',
            margin: '40px 0',
          }}
        />

        <nav className="flex flex-wrap">
          {[
            { name: 'Roadmap', path: '/roadmap' },
            { name: 'Analytics', path: '/analytics' },
            { name: 'Schedule', path: '/schedule' },
            { name: 'Missions', path: '/missions' },
          ].map((link, i, arr) => (
            <Link
              key={link.name}
              href={link.path}
              style={{
                padding: '14px 24px',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(232,228,220,0.65)',
                border: '1px solid rgba(232,228,220,0.12)',
                borderRight:
                  i < arr.length - 1
                    ? 'none'
                    : '1px solid rgba(232,228,220,0.12)',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                fontWeight: 400,
              }}
              className="hover:text-white hover:bg-[rgba(232,228,220,0.08)]"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </section>

      <footer className="flex justify-between items-end">
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 14,
            color: 'rgba(232,228,220,0.45)',
            maxWidth: 360,
            lineHeight: 1.7,
          }}
        >
          "The man who moves a mountain begins by carrying away small stones."
        </p>

        <span
          style={{
            fontSize: 11,
            color: 'rgba(232,228,220,0.3)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Atlas Operating System
        </span>
      </footer>
    </main>
  );
}