export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const COURSE_ORDER = [
  'CS220',
  'CS225',
  'CS230',
  'CS235',
  'CS250',
  'CS270',
  'MA110',
  'PH212'
];

export default async function Roadmap() {
  const { data: topics } = await supabase
    .from('topics')
    .select('*, courses(name, code)');

  const grouped: Record<
    string,
    {
      courseName: string;
      courseCode: string;
      topics: any[];
    }
  > = {};

  topics?.forEach((item: any) => {
    const code = item.courses?.code;

    if (!grouped[code]) {
      grouped[code] = {
        courseName: item.courses?.name,
        courseCode: code,
        topics: [],
      };
    }

    grouped[code].topics.push(item);
  });

  const ordered = COURSE_ORDER.map((c) => grouped[c]).filter(Boolean);

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
            Atlas Intelligence
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 40,
              color: '#f4f0e8',
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            Mastery Roadmap
          </h1>

          <p
            style={{
              marginTop: 12,
              color: 'rgba(244,240,232,0.55)',
              fontSize: 14,
              letterSpacing: '0.05em',
            }}
          >
            Complete academic blueprint for Emmanuel Mutaka
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
        className="flex flex-col"
        style={{
          gap: 80,
        }}
      >
        {ordered.map((group, gi) => (
          <section key={group.courseCode}>
            <div className="flex items-baseline gap-5 mb-10">
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 14,
                  color: 'rgba(244,240,232,0.45)',
                }}
              >
                {String(gi + 1).padStart(2, '0')}
              </span>

              <span
                style={{
                  fontSize: 12,
                  color: 'rgba(244,240,232,0.55)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {group.courseCode}
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 24,
                  color: '#f4f0e8',
                }}
              >
                {group.courseName}
              </span>

              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: 'rgba(244,240,232,0.10)',
                }}
              />

              <span
                style={{
                  fontSize: 12,
                  color: 'rgba(244,240,232,0.40)',
                  letterSpacing: '0.08em',
                }}
              >
                {group.topics.length} TOPICS
              </span>
            </div>

            <div
              className="grid md:grid-cols-2"
              style={{
                gap: '0',
              }}
            >
              {group.topics.map((topic: any, ti: number) => (
                <div
                  key={topic.id}
                  className="flex items-baseline gap-4 py-5"
                  style={{
                    borderBottom:
                      '1px solid rgba(244,240,232,0.06)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: 'rgba(244,240,232,0.30)',
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      minWidth: 28,
                    }}
                  >
                    {ti + 1}
                  </span>

                  <span
                    style={{
                      fontSize: 16,
                      color: 'rgba(244,240,232,0.88)',
                      fontWeight: 300,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {topic.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer
        style={{
          marginTop: 100,
          paddingTop: 40,
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
              "Mastery is earned one topic at a time."
            </p>

            <p
              style={{
                fontSize: 11,
                color: 'rgba(244,240,232,0.30)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Atlas Academic Operating System
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
            <div>{topics?.length ?? 0} Topics</div>
            <div>{ordered.length} Courses</div>
          </div>
        </div>
      </footer>
    </main>
  );
}