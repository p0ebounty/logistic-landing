import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export { MOTION, WIDE } from "@/lib/motion-queries"
export { gsap, ScrollTrigger, SplitText, useGSAP }
