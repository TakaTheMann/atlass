export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import MissionRow from '@/components/MissionRow';
import MissionList from '@/components/MissionList'; // Import the client wrapper

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Missions() {
  const { data: missions, error } = await supabase
    .from('v_daily_missions')
    .select('*')
    .order('start_time', { ascending: true });

  if (error) {
    return (
      <main
        className="min-h-screen p-14"
        style={{
          background: '#0a0a0a',
          color: '#f5f1e8',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <p>Error: {error.message}</p>
      </main>
    );
  }

  const missionCount = missions?.length ?? 0;

  return (
    <main
      className="min-h-screen p-14"
      style={{
        background: '#0a0a0a',
        color: '#f5f1e8',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Header */}

      <header className="flex justify-between items-center mb-24">
        <div>
          <p
            style={{
              fontSize: 11,
              color: 'rgba(245,241,232,0.55)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Atlas Intelligence
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(40px,5vw,60px)',
              fontWeight: 400,
              color: '#f5f1e8',
              letterSpacing: '-0.02em',
            }}
          >
            Mission Control
          </h1>

          <p
            style={{
              marginTop: 12,
              color: 'rgba(245,241,232,0.55)',
              fontSize: 14,
            }}
          >
            Welcome back, Mr Emmanuel Mutaka
          </p>
        </div>

        <Link
          href="/"
          style={{
            fontSize: 11,
            color: 'rgba(245,241,232,0.65)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
          className="hover:text-white transition-colors"
        >
          ← Dashboard
        </Link>
      </header>

      {/* Mission Summary */}

      <section
        style={{
          padding: 40,
          border: '1px solid rgba(245,241,232,0.08)',
          background: 'rgba(245,241,232,0.02)',
          marginBottom: 48,
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: 'rgba(245,241,232,0.45)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Active Missions
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(48px,7vw,84px)',
            lineHeight: 1,
            color: '#f5f1e8',
          }}
        >
          {missionCount}
        </h2>

        <p
          style={{
            marginTop: 12,
            color: 'rgba(245,241,232,0.55)',
            fontSize: 14,
          }}
        >
          Objectives scheduled for execution today.
        </p>
      </section>

      {/* Mission List */}

      <section>
        <p
          style={{
            fontSize: 11,
            color: 'rgba(245,241,232,0.55)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Daily Operations
        </p>

        {missions && missions.length > 0 ? (
          <MissionList initialMissions={missions} />
        ) : (
          <div
            style={{
              padding: 60,
              textAlign: 'center',
              border: '1px solid rgba(245,241,232,0.08)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 28,
                color: 'rgba(245,241,232,0.6)',
                marginBottom: 12,
              }}
            >
              No Missions Scheduled
            </p>

            <p
              style={{
                color: 'rgba(245,241,232,0.35)',
              }}
            >
              Create study blocks to generate daily missions.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}

      <footer
        style={{
          marginTop: 80,
          paddingTop: 24,
          borderTop: '1px solid rgba(245,241,232,0.06)',
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: 'rgba(245,241,232,0.3)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Atlas Mission Control · Emmanuel Mutaka
        </p>
      </footer>
    </main>
  );
}
