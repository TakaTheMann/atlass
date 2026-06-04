export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Schedule() {
  const { data: blocks } = await supabase
    .from('study_blocks')
    .select('*, courses(name, code)')
    .order('start_time', { ascending: true });

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const matchesDay = (block: any, dayName: string) => {
    if (block.day_of_week === dayName) return true;
    if (block.day_of_week === days.indexOf(dayName) + 1) return true;
    return false;
  };

  const totalBlocks = blocks?.length ?? 0;

  return (
    <main
      className="min-h-screen p-14"
      style={{
        background: '#0a0a0a',
        color: '#f4f0e8',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <header className="flex justify-between items-center mb-24">
        <div>
          <p
            style={{
              fontSize: 11,
              color: 'rgba(244,240,232,0.45)',
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Atlas Operations
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 40,
              fontStyle: 'italic',
              color: '#f4f0e8',
              fontWeight: 400,
            }}
          >
            Weekly Schedule
          </h1>

          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              color: 'rgba(244,240,232,0.55)',
              letterSpacing: '0.04em',
            }}
          >
            Study deployment protocol for Emmanuel Mutaka
          </p>
        </div>

        <Link
          href="/"
          style={{
            fontSize: 11,
            color: 'rgba(244,240,232,0.55)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: '1px solid rgba(244,240,232,0.12)',
            padding: '12px 18px',
          }}
          className="hover:text-white transition-colors"
        >
          ← Dashboard
        </Link>
      </header>

      <div
        style={{
          marginBottom: 32,
          paddingBottom: 20,
          borderBottom: '1px solid rgba(244,240,232,0.08)',
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: 'rgba(244,240,232,0.35)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Weekly Capacity
        </p>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 34,
            color: '#f4f0e8',
          }}
        >
          {totalBlocks}
        </p>

        <p
          style={{
            fontSize: 12,
            color: 'rgba(244,240,232,0.45)',
            letterSpacing: '0.06em',
          }}
        >
          Scheduled study blocks
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
        style={{
          gap: 20,
        }}
      >
        {days.map((day) => {
          const dayBlocks =
            blocks?.filter((b: any) => matchesDay(b, day)) ?? [];

          const active = dayBlocks.length > 0;

          return (
            <div
              key={day}
              style={{
                border: '1px solid rgba(244,240,232,0.08)',
                background: 'rgba(244,240,232,0.015)',
                padding: 20,
                minHeight: 320,
              }}
            >
              <div
                style={{
                  marginBottom: 24,
                  paddingBottom: 14,
                  borderBottom: '1px solid rgba(244,240,232,0.08)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 18,
                    color: active
                      ? '#f4f0e8'
                      : 'rgba(244,240,232,0.30)',
                  }}
                >
                  {day}
                </p>

                <p
                  style={{
                    fontSize: 11,
                    color: 'rgba(244,240,232,0.35)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginTop: 6,
                  }}
                >
                  {dayBlocks.length} block
                  {dayBlocks.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div
                className="flex flex-col"
                style={{
                  gap: 14,
                }}
              >
                {dayBlocks.length > 0 ? (
                  dayBlocks.map((b: any) => (
                    <div
                      key={b.id}
                      style={{
                        paddingBottom: 14,
                        borderBottom:
                          '1px solid rgba(244,240,232,0.05)',
                      }}
                    >
                      <p
                        style={{
                          fontSize: 11,
                          color: '#f4f0e8',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          marginBottom: 6,
                        }}
                      >
                        {b.courses?.code || 'Study'}
                      </p>

                      <p
                        style={{
                          fontSize: 14,
                          color: 'rgba(244,240,232,0.85)',
                          lineHeight: 1.5,
                          marginBottom: 8,
                        }}
                      >
                        {b.title ||
                          b.name ||
                          b.courses?.name ||
                          'Study Session'}
                      </p>

                      <p
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontStyle: 'italic',
                          fontSize: 12,
                          color: 'rgba(244,240,232,0.50)',
                        }}
                      >
                        {b.start_time?.substring(0, 5)} —{' '}
                        {b.end_time?.substring(0, 5)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      paddingTop: 20,
                      color: 'rgba(244,240,232,0.20)',
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                    }}
                  >
                    No scheduled work
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <footer
        style={{
          marginTop: 80,
          paddingTop: 32,
          borderTop: '1px solid rgba(244,240,232,0.08)',
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 18,
                color: 'rgba(244,240,232,0.75)',
                marginBottom: 8,
              }}
            >
              "Discipline compounds faster than motivation."
            </p>

            <p
              style={{
                fontSize: 11,
                color: 'rgba(244,240,232,0.30)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Atlas Scheduling Engine
            </p>
          </div>

          <div
            style={{
              textAlign: 'right',
              fontSize: 11,
              color: 'rgba(244,240,232,0.25)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <div>{totalBlocks} Missions</div>
            <div>7-Day Cycle</div>
          </div>
        </div>
      </footer>
    </main>
  );
}