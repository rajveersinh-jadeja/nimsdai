import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

export const HIMALAYAN_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 1.48, // Centered on Nepal / Himalayan arc
  theta: 0.28,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 4.5,
  baseColor: [0.12, 0.16, 0.24],
  markerColor: [0.22, 0.74, 0.98], // Sky-400 marker pins
  glowColor: [0.08, 0.15, 0.28],
  markers: [
    // Nepal Peaks (Phase 1)
    { location: [28.5961, 83.8203], size: 0.08 }, // Annapurna I (8,091m)
    { location: [28.6985, 83.4873], size: 0.07 }, // Dhaulagiri (8,167m)
    { location: [27.7025, 88.1475], size: 0.08 }, // Kanchenjunga (8,586m)
    { location: [27.9881, 86.9250], size: 0.12 }, // Mt. Everest (8,848m)
    { location: [27.9617, 86.9333], size: 0.07 }, // Lhotse (8,516m)
    { location: [27.8897, 87.0886], size: 0.07 }, // Makalu (8,485m)
    { location: [28.5497, 84.5608], size: 0.07 }, // Manaslu (8,163m)
    { location: [28.0942, 86.6608], size: 0.07 }, // Cho Oyu (8,188m)
    // Karakoram Peaks (Phase 2 - Pakistan)
    { location: [35.2372, 74.5891], size: 0.08 }, // Nanga Parbat (8,126m)
    { location: [35.7244, 76.6964], size: 0.07 }, // Gasherbrum I (8,080m)
    { location: [35.7583, 76.6533], size: 0.07 }, // Gasherbrum II (8,034m)
    { location: [35.8808, 76.5133], size: 0.11 }, // K2 (8,611m)
    { location: [35.8117, 76.5650], size: 0.07 }, // Broad Peak (8,051m)
    // Tibet (Phase 3)
    { location: [28.3528, 85.7797], size: 0.07 }, // Shishapangma (8,027m)
    // Military & Heritage Proving Grounds
    { location: [50.7192, -1.8808], size: 0.05 }, // UK SBS Proving Grounds (Poole)
  ],
}

const GLOBE_CONFIG: COBEOptions = HIMALAYAN_GLOBE_CONFIG

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: (widthRef.current || 400) * 2,
      height: (widthRef.current || 400) * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005
        state.phi = phiRef.current + rs.get()
        state.width = (widthRef.current || 400) * 2
        state.height = (widthRef.current || 400) * 2
      },
    })

    const timer = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 0)
    return () => {
      clearTimeout(timer)
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
