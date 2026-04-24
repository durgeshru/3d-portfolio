import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Model from './component/Model'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const canvasRef = useRef()
  const [scrollProgress, setScrollProgress] = useState(0)
  const section1Ref = useRef(null)
  const lettersRef = useRef([])

  const portfolioText = "PORTFOLIO".split("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)

    const ctx = gsap.context(() => {
      // Reverse stagger: last letter moves up first
      gsap.fromTo(lettersRef.current,
        {
          opacity: 0,
          y: 60,
          rotateX: 20,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          stagger: {
            each: 0.08,
            from: "end"   // starts from the LAST letter
          },
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      )
    }, section1Ref)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ctx.revert()
    }
  }, [])

  return (
    <main>
      <Canvas 
        ref={canvasRef}
        style={{position:"fixed", height:"100vh", width:"100vw", top:"0px", left:"0px", zIndex:"1"}}
      >
        <Model scrollProgress={scrollProgress} />
      </Canvas>

      <div style={{position: "relative", zIndex: "2"}}>
        <section 
          id="section-1" 
          ref={section1Ref}
          style={{
            height: "100vh", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: "white", 
            fontSize: "8rem", 
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
          }}
        >
          <h1 style={{ display: "flex", gap: "0.1em", perspective: "500px" }}>
            {portfolioText.map((letter, idx) => (
              <span
                key={idx}
                ref={el => lettersRef.current[idx] = el}
                style={{
                  display: "inline-block",
                  transformStyle: "preserve-3d"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </section>
        {/* other sections unchanged */}
        <section style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2rem"}}>
          <h1>Section 2</h1>
        </section>
        <section style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2rem"}}>
          <h1>Section 3</h1>
        </section>
        <section style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2rem"}}>
          <h1>Section 4</h1>
        </section>
        <section style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2rem"}}>
          <h1>Section 5</h1>
        </section>
      </div>
    </main>
  )
}

export default App