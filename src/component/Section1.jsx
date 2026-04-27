import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Section1() {
  const sectionRef = useRef(null)
  const topLeftHeadingRef = useRef(null)
  const bottomRightLoremRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1️⃣ Pin the section and animate heading based on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Map scroll progress to heading animation
          const progress = self.progress
          gsap.set(topLeftHeadingRef.current, {
            opacity: progress,
            x: -200 * (1 - progress),
            scale: 0.9 + progress * 0.1,
          })
        }
      })

      // 2️⃣ Alternative: a clean fromTo animation with its own ScrollTrigger
      // (this one triggers once when heading enters viewport)
      gsap.fromTo(topLeftHeadingRef.current,
        { opacity: 0, x: -200, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.5,
          ease: "back.out(1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // 3️⃣ Bottom right text animation
      gsap.fromTo(bottomRightLoremRef.current,
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen max-w-8xl mx-auto overflow-hidden px-6 lg:px-12"
    >
      {/* TOP LEFT HEADING */}
      <div
        ref={topLeftHeadingRef}
        className="absolute top-8 left-8 md:top-12 md:left-12 max-w-4xl opacity-0 z-10"
      >
        <h1 style={{ fontFamily: 'Galiscka, sans-serif' }} className="text-4xl lg:text-6xl xl:text-7xl font-black leading-tight bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl mb-6">
Frontend Developer & 3D Web Experience Creator        </h1>
        <p style={{ fontFamily: 'Galiscka, sans-serif' }}  className="text-lg lg:text-xl leading-relaxed text-white/90 font-light tracking-wide">
          We craft digital experiences that captivate and convert.
        </p>
      </div>

      {/* BOTTOM RIGHT LOREM TEXT */}
      <div
        ref={bottomRightLoremRef}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 max-w-sm md:max-w-md lg:max-w-lg opacity-0 z-10 text-right"
      >
        <p style={{ fontFamily: 'Galiscka, sans-serif' }}   className="text-sm lg:text-base leading-relaxed italic font-light tracking-wide text-white/70">
I craft immersive web experiences where design meets motion. With expertise in modern frontend frameworks and 3D technologies, I build interfaces that feel alive—smooth, interactive, and engaging across all devices.        </p>
      </div>
    </section>
  )
}

export default Section1