import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import Eyes from "./Eye";

const projectSlides = [
  { title: ["Quality comes", "before quantity"], image: "/images/about-project-1.webp", alt: "Presentation design preview" },
  { title: ["Creating real-world", "business results"], image: "/images/about-project-2.webp", alt: "Brand presentation preview" },
  { title: ["Engineering", "clarity"], image: "/images/about-project-3.webp", alt: "Presentation preview" },
  { title: ["When we commit,", "we go all-in"], image: "/images/about-project-4.webp", alt: "Brand presentation preview" },
];

const clientStories = [
  {
    name: "Medallia",
    mark: "M",
    quote: "The most impressive about Ochi is their attention to detail. They helped us craft a clear, compelling narrative.",
  },
  {
    logo: "/images/planetly.svg",
    name: "Planetly",
    quote: "Ihor and his team tackled the projects with great professionalism and creativity. They understood our brand value and turned this into excellent slide designs.",
  },
  {
    logo: "/images/officevibe.svg",
    name: "Officevibe",
    quote: "Ochi has an impressive understanding of what’s needed to do an effective presentation. The stakeholders said it was the best, most complete PPT template they had seen.",
  },
  {
    logo: "/images/nestle.svg",
    name: "Nestlé",
    quote: "Ihor and the team delivered exactly that: a fantastic result, quick delivery time, and a highly responsive partnership.",
  },
  {
    logo: "/images/toyota.svg",
    name: "Toyota",
    quote: "Great work, great communication, and work ethic. Their skills and understanding of our project scope are simply unmatched.",
  },
  {
    logo: "/images/lexus.svg",
    name: "Lexus",
    quote: "Communication was excellent. The team understood in detail what we wanted for our company presentation and sales deck.",
  },
  {
    logo: "/images/aflomatric.svg",
    name: "Aflorithmic",
    quote: "Super responsive and quick. A charm to work with. I’d work again with Ihor and his team anytime!",
  },
  {
    logo: "/images/orderlion.svg",
    name: "Orderlion",
    quote: "The team understood the real business problem and iterated through many drafts to achieve the result we needed.",
  },
  {
    name: "Black Book",
    mark: "B",
    quote: "They nailed what our product was all about. Everything was handled well and professionally from start to finish.",
  },
];

export default function AboutPage() {
  const [activeProject, setActiveProject] = useState(0);
  const [isStoryDragging, setIsStoryDragging] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const storyDrag = useRef({ pointerId: -1, startX: 0, startScrollLeft: 0, lastX: 0, lastTime: 0, velocity: 0 });

  const updateStoryProgress = (event: React.UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    setStoryProgress(maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0);
  };

  const startStoryDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const viewport = event.currentTarget;
    const now = performance.now();
    storyDrag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      lastX: event.clientX,
      lastTime: now,
      velocity: 0,
    };
    viewport.setPointerCapture(event.pointerId);
    setIsStoryDragging(true);
  };

  const moveStoryDrag = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    const shell = viewport.parentElement;
    const bounds = shell?.getBoundingClientRect() ?? viewport.getBoundingClientRect();
    shell?.style.setProperty("--drag-x", `${event.clientX - bounds.left}px`);
    shell?.style.setProperty("--drag-y", `${event.clientY - bounds.top}px`);

    if (storyDrag.current.pointerId !== event.pointerId) return;
    const now = performance.now();
    const elapsed = Math.max(1, now - storyDrag.current.lastTime);
    storyDrag.current.velocity = (storyDrag.current.lastX - event.clientX) / elapsed;
    storyDrag.current.lastX = event.clientX;
    storyDrag.current.lastTime = now;
    viewport.scrollLeft = storyDrag.current.startScrollLeft - (event.clientX - storyDrag.current.startX);
  };

  const endStoryDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (storyDrag.current.pointerId !== event.pointerId) return;
    const viewport = event.currentTarget;
    const momentum = storyDrag.current.velocity;
    storyDrag.current.pointerId = -1;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    setIsStoryDragging(false);
    if (Math.abs(momentum) > 0.08) viewport.scrollBy({ left: momentum * 190, behavior: "smooth" });
  };

  return (
    <main className="overflow-hidden">
      <header className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 md:px-12 lg:px-[3.25vw] xl:px-[3.25vw]">
        <a href="#top" aria-label="metaruleX home" className="w-fit font-FoundersGrotesk text-[30px] font-semibold leading-none tracking-[-.065em] md:text-[36px]">
          metarule<span className="text-[#8da65b]">X</span>
        </a>
        <nav aria-label="About page" className="hidden items-center gap-[clamp(16px,2.1vw,38px)] text-[15px] tracking-[-.03em] lg:flex xl:flex">
          <a className="transition-opacity hover:opacity-50" href="#about-story">Services</a>
          <a className="transition-opacity hover:opacity-50" href="#partners">Our work</a>
          <a className="border-b border-black pb-1 transition-opacity hover:opacity-50" href="#top" aria-current="page">About us</a>
          <a className="transition-opacity hover:opacity-50" href="#partners">Insights</a>
        </nav>
        <a className="justify-self-end text-[14px] tracking-[-.02em] transition-opacity hover:opacity-50" href="mailto:hello@metaruleX">Contact us</a>
      </header>

      <section id="top" className="border-b border-black/25">
        <div className="mx-auto flex h-[calc(70vh-76px)] min-h-[440px] items-center px-5 pb-10 pt-16 sm:px-8 md:px-12 lg:px-[3.25vw] xl:px-[3.25vw]">
          <h1 className="hero-title font-FoundersGrotesk text-[clamp(2.5rem,8.3vw,10rem)] font-semibold uppercase leading-[.72] tracking-[-.015em]">
            <span className="block">We create</span>
            <span className="mt-[.04em] flex w-max max-w-full items-center gap-[.1em] whitespace-nowrap">
              <span className="hero-card-reveal"><Image src="/images/ochi-side.jpg" alt="" width={280} height={180} priority className="hero-card-image" /></span>
              <span>eye-opening</span>
            </span>
            {/* <span className="mt-[.04em] block">Presentations</span> */}
          </h1>
        </div>
      </section>

      <section id="about">
        <div className="grid min-h-[320px] grid-cols-1 gap-8 px-5 py-8 sm:px-8 md:px-12 md:py-7 lg:grid-cols-[1.2fr_.9fr_220px] lg:gap-0 lg:px-[3.25vw] xl:grid-cols-[1.2fr_.9fr_220px] xl:gap-0 xl:px-[3.25vw]">
          <p className="text-[16px] leading-[1.4] md:text-[18px]">About us:</p>
          <div className="max-w-[390px] text-[16px] leading-[1.5] tracking-[-.02em] md:text-[19px] md:leading-[1.48]">
            <p>metaruleX is more than a name. We help ambitious teams make their ideas clear, memorable, and impossible to overlook.</p>
            <p className="mt-10">We believe the strongest ideas deserve to be seen. That’s why we turn complex messages into eye-opening presentations people can understand, remember, and act on.</p>
          </div>
          <a href="#partners" className="inline-flex h-fit w-fit items-center gap-2 justify-self-start rounded-full border border-black px-4 py-2 text-[14px] uppercase tracking-[-.02em] transition-colors hover:bg-black hover:text-white lg:justify-self-end xl:justify-self-end">
            Our works <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full border border-black text-lg leading-none">↗</span>
          </a>
        </div>
      </section>

      <section aria-label="A closer look" className="relative h-[clamp(240px,calc(70px+21vw),470px)] overflow-hidden">
        <div className="absolute left-1/2 top-[clamp(38px,3.7vw,70px)] flex -translate-x-1/2 items-center">
          <Eyes className="gap-[clamp(12px,4vw,72px)]" />
        </div>
      </section>

      <section id="about-story" className="border-b border-black/15">
        <div className="px-5 pb-14 pt-16 sm:px-8 md:px-12 md:pb-16 md:pt-20 lg:px-[3.25vw] lg:pb-[62px] lg:pt-[78px]">
          <h2 className="max-w-[1100px] font-NeueMontreal text-[clamp(2.5rem,3.55vw,4.2rem)] leading-[1.04] tracking-[-.045em]">
            We save businesses from ugly and<br />ineffective presentations.
          </h2>
        </div>
        <div className="border-t border-black/15">
          <div className="grid min-h-[320px] grid-cols-1 gap-8 px-5 py-6 sm:px-8 md:px-12 md:py-7 lg:grid-cols-[1.2fr_.9fr_220px] lg:gap-0 lg:px-[3.25vw] xl:grid-cols-[1.2fr_.9fr_220px]">
            <p className="text-[16px] leading-[1.4] md:text-[18px]">We are ochi design:</p>
            <div className="max-w-[390px] text-[16px] leading-[1.5] tracking-[-.02em] md:text-[19px] md:leading-[1.48]">
              <p>The world-class, tight-knit group of creative experts from across the globe, who work together to create industry-shifting presentations that win people&apos;s hearts and minds.</p>
              <p className="mt-10">We’ve earned our reputation through years of collaboration with global clients who know that being different takes courage and craft.</p>
            </div>
            <div aria-hidden="true" />
          </div>
        </div>
        <section
          aria-label="Selected work"
          className="about-project-slider"
        >
          <div className="about-project-ticker" aria-label="Our commitments">
            <div className="about-project-ticker-track" aria-hidden="true">
              {[0, 1].map((copy) => (
                <span className="about-project-ticker-copy" key={copy}>
                  <span>Our commitments</span><span className="about-project-ticker-star">✳</span>
                  <span>Our commitments</span><span className="about-project-ticker-star">✳</span>
                </span>
              ))}
            </div>
          </div>

          <div className="about-project-stage">
            {projectSlides.map((project, index) => {
              const offset = (index - activeProject + projectSlides.length) % projectSlides.length;
              const isVisible = offset < 3;
              return (
                <button
                  type="button"
                  key={project.title[0]}
                  className="about-project-card"
                  data-offset={isVisible ? offset : "hidden"}
                  data-no-rise={index === (activeProject + 2) % projectSlides.length}
                  aria-label={offset === 0 ? "Move to the next commitment" : `Show commitment ${index + 1}`}
                  aria-current={offset === 0 ? "true" : undefined}
                  aria-hidden={!isVisible}
                  tabIndex={isVisible ? 0 : -1}
                  onClick={() => setActiveProject(offset === 0 ? (activeProject + 1) % projectSlides.length : index)}
                  onPointerMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
                    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
                  }}
                >
                  <span className="about-project-brand">metarule<span>X</span></span>
                  <span className="about-project-preview">
                    <Image src={project.image} alt={project.alt} fill sizes="(max-width: 768px) 58vw, 540px" className="object-cover" />
                  </span>
                  <span className="about-project-card-title">
                    {project.title.map((line) => <span key={line}>{line}</span>)}
                  </span>
                  <span className="about-project-card-count">{index + 1}<span>/</span>{projectSlides.length}</span>
                  <span className="about-project-cursor" aria-hidden="true">Next</span>
                </button>
              );
            })}
          </div>

          <div className="about-project-controls">
            <span className="about-project-count" aria-hidden="true">0{activeProject + 1} <span>/</span> 0{projectSlides.length}</span>
            <button
              type="button"
              className="about-project-next"
              onClick={() => setActiveProject((current) => (current + 1) % projectSlides.length)}
              aria-label="Next project"
            >
              Next <span aria-hidden="true">↗</span>
            </button>
          </div>
        </section>
      </section>

      <section id="partners" aria-label="Client stories" className="client-story-section">
        <div className="client-story-heading">
          <h2>We’ve built long-lasting partnerships with the most ambitious brands across the globe:</h2>
        </div>
        <div className={`client-story-shell ${isStoryDragging ? "is-dragging" : ""}`}>
          <div
            className={`client-story-viewport ${isStoryDragging ? "is-dragging" : ""}`}
            role="region"
            aria-label="Client logos and reviews. Drag horizontally to explore."
            tabIndex={0}
            onPointerDown={startStoryDrag}
            onPointerMove={moveStoryDrag}
            onPointerUp={endStoryDrag}
            onPointerCancel={endStoryDrag}
            onScroll={updateStoryProgress}
            onDragStart={(event) => event.preventDefault()}
          >
            <div className="client-story-track">
              {clientStories.map((story) => (
                <article key={story.name} className="client-story-card">
                  <div className="client-story-logo" aria-hidden="true">
                    {story.logo ? (
                      <Image src={story.logo} alt="" width={180} height={90} className="client-story-logo-image" />
                    ) : (
                      <span className="client-story-mark">{story.mark}</span>
                    )}
                  </div>
                  <p className="client-story-name">{story.name}</p>
                  <p className="client-story-quote">{story.quote}</p>
                </article>
              ))}
            </div>
          </div>
          <span className="client-story-drag-cursor" aria-hidden="true">Drag</span>
        </div>
        <div className="client-story-progress" aria-hidden="true">
          <span className="client-story-progress-thumb" style={{ left: `${storyProgress * 56}%` }} />
        </div>
      </section>

    </main>
  );
}
