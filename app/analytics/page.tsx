export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

async function getAnalytics() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('v_sessional_analytics')
    .select('*');

  if (error) return [];

  return data || [];
}

export default async function Analytics() {
  const data = await getAnalytics();

  const sorted = [...data].sort(
    (a, b) => b.executed_count - a.executed_count
  );

  const top = sorted[0] ?? null;
  const maxEx = top?.executed_count ?? 1;

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
            Performance
          </h1>
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

      {/* Top Course */}

      {top && (
        <section
          style={{
            padding: 40,
            border: '1px solid rgba(245,241,232,0.08)',
            background: 'rgba(245,241,232,0.02)',
            marginBottom: 80,
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
            Highest Commitment
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(42px,6vw,72px)',
              lineHeight: 1,
              color: '#f5f1e8',
              marginBottom: 32,
            }}
          >
            {top.course_name}
          </h2>

          <div className="flex gap-20 flex-wrap">
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: 'rgba(245,241,232,0.45)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Completion
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 48,
                  color: '#f5f1e8',
                }}
              >
                {top.completion_rate ?? 0}%
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: 11,
                  color: 'rgba(245,241,232,0.45)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Sessions
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 48,
                  color: '#f5f1e8',
                }}
              >
                {top.executed_count ?? 0}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Rankings */}

      <section>
        <div
          className="flex justify-between items-center mb-8"
        >
          <p
            style={{
              fontSize: 11,
              color: 'rgba(245,241,232,0.55)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            Course Rankings
          </p>

          <span
            style={{
              fontSize: 11,
              color: 'rgba(245,241,232,0.35)',
            }}
          >
            Last 30 Days
          </span>
        </div>

        {sorted.length > 0 ? (
          <div>
            {sorted.map((course, i) => {
              const barWidth = Math.round(
                (course.executed_count / maxEx) * 100
              );

              return (
                <div
                  key={course.course_name}
                  style={{
                    padding: '24px 0',
                    borderBottom:
                      '1px solid rgba(245,241,232,0.08)',
                  }}
                >
                  <div className="flex justify-between mb-4">
                    <div className="flex gap-5 items-center">
                      <span
                        style={{
                          width: 30,
                          color: 'rgba(245,241,232,0.4)',
                          fontSize: 14,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <span
                        style={{
                          fontSize: 18,
                          color:
                            i === 0
                              ? '#f5f1e8'
                              : 'rgba(245,241,232,0.8)',
                        }}
                      >
                        {course.course_name}
                      </span>
                    </div>

                    <div className="flex gap-12">
                      <span
                        style={{
                          color: 'rgba(245,241,232,0.7)',
                        }}
                      >
                        {course.completion_rate ?? 0}%
                      </span>

                      <span
                        style={{
                          width: 40,
                          textAlign: 'right',
                          color: '#f5f1e8',
                        }}
                      >
                        {course.executed_count ?? 0}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      height: 4,
                      background:
                        'rgba(245,241,232,0.06)',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${barWidth}%`,
                        background:
                          i === 0
                            ? 'rgba(245,241,232,0.9)'
                            : 'rgba(245,241,232,0.35)',
                        transition: '0.3s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              padding: 50,
              border: '1px solid rgba(245,241,232,0.08)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                color: 'rgba(245,241,232,0.5)',
              }}
            >
              No study data recorded yet.
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
          Atlas Performance Intelligence · Emmanuel Mutaka
        </p>
      </footer>
    </main>
  );
}