import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Reveal, SectionLabel } from "./ui";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function JoinList() {
  const inputId = useId();
  const errorId = useId();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const inputRef = useRef<HTMLInputElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const wasSubmitted = useRef(false);

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  /* The submit button unmounts on success — move focus to the one control the
     success panel offers instead of dropping it on <body>. */
  useEffect(() => {
    if (submitted) {
      wasSubmitted.current = true;
      resetRef.current?.focus();
      return;
    }
    if (wasSubmitted.current) {
      wasSubmitted.current = false;
      inputRef.current?.focus();
    }
  }, [submitted]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError("Enter an email address so we know where to send the note.");
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("That address does not look complete — check it and try again.");
      return;
    }

    setError(null);
    setSubmitted(true); // demo only: nothing is sent or stored
  };

  return (
    <section
      id="join"
      aria-labelledby="join-title"
      className="bg-mineral py-20 text-ink md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel className="text-ink/80">Early access</SectionLabel>
              <p className="mt-4 label text-ink/80">05 — Join the list</p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.06}>
              <h2
                id="join-title"
                className="text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
              >
                Find your way into the collection.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-ink/80 md:text-lg">
                Get a note when RELIC opens, along with a first look at
                featured artists and editions.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              {submitted ? (
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-9 flex items-start gap-4 border border-ink/25 bg-ink px-6 py-6 text-chalk"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-mineral"
                  />
                  <div>
                    <p className="text-base font-medium">
                      You're on the list — well, sort of.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-chalk-dim">
                      This demo form does not send or store anything, so no note
                      will actually arrive at {email.trim()}. In a real launch,
                      that is where the invitation would go.
                    </p>
                    <button
                      ref={resetRef}
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setEmail("");
                      }}
                      className="mt-4 inline-flex min-h-11 items-center border-b border-white/30 pb-1 label text-chalk transition-colors hover:border-mineral hover:text-mineral"
                    >
                      Use a different address
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-9">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
                    <div className="flex-1">
                      <label htmlFor={inputId} className="label text-ink/85">
                        Email address
                      </label>
                      <input
                        ref={inputRef}
                        id={inputId}
                        type="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="you@studio.com"
                        value={email}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? errorId : undefined}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (error) setError(null);
                        }}
                        className={`mt-3 min-h-12 w-full border-b bg-transparent pb-2 text-lg text-ink placeholder:text-ink/80 ${
                          error
                            ? "border-ink"
                            : "border-ink/60 focus:border-ink"
                        }`}
                      />
                      {error && (
                        <p
                          id={errorId}
                          role="alert"
                          className="mt-3 text-sm font-medium text-ink"
                        >
                          {error}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-ink px-7 py-4 label text-chalk transition-colors duration-200 hover:bg-ink/85 sm:mb-0.5"
                    >
                      Request early access
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>

                  <p className="mt-6 max-w-[52ch] text-xs leading-relaxed text-ink/85">
                    Submitting this demo form does not send or store your
                    information. No account is created and no data leaves your
                    browser.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
