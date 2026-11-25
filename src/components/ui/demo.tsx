"use client"

import RidgelineDitherFooter, { FOURTEEN_PEAKS } from "@/components/ui/ridgeline-dither-footer"

export default function NimsdaiFooterDemo() {
  return (
    <div className="w-full">
      <RidgelineDitherFooter
        preset="nimsdai"
        seed={14}
        ridges={6}
        name="NIMSDAl"
        subtitle="NIRMAL PURJA MBE"
        tagline="Nepali mountaineer, former Gurkha & UK SBS Special Forces. Conquered all 14 of the world's 8,000m peaks in 6 months and 6 days, followed by the historic first winter ascent of K2."
        brandHref="#story"
        columns={[
          {
            title: "14 Peaks Record",
            links: [
              { label: "Annapurna I to Shishapangma", href: "#peaks", badge: "14/14" },
              { label: "6 Months & 6 Days", href: "#peaks" },
              { label: "Historic K2 Winter Summit", href: "#k2", badge: "First" },
              { label: "Project Possible Documentary", href: "https://www.netflix.com/title/81464765" },
            ],
          },
          {
            title: "Expeditions & Heritage",
            links: [
              { label: "Our Story & Military Service", href: "#story" },
              { label: "Gurkha & UK SBS Brotherhood", href: "#story" },
              { label: "Elite Exped Commercial Ascents", href: "https://www.eliteexped.com" },
              { label: "Beyond Possible Memoir", href: "#story" },
            ],
          },
          {
            title: "Foundation & Contact",
            links: [
              { label: "Nimsdai Foundation", href: "https://www.nimsdaifoundation.org", badge: "Impact" },
              { label: "Big Mountain Cleanup", href: "#foundation" },
              { label: "Official Archive Verification", href: "https://www.nimsdai.com" },
              { label: "Expedition Inquiries", href: "#inquiries" },
            ],
          },
        ]}
        socials={[
          { icon: "instagram", href: "https://instagram.com/nimsdai", label: "Instagram @nimsdai" },
          { icon: "x", href: "https://x.com/nimsdai", label: "X @nimsdai" },
          { icon: "youtube", href: "https://youtube.com/@nimsdai", label: "YouTube @nimsdai" },
          { icon: "linkedin", href: "https://linkedin.com/in/nimsdai", label: "LinkedIn Nirmal Purja MBE" },
        ]}
        credit={{ label: "14 Peaks Expedition Archive", href: "https://www.nimsdai.com" }}
        peaks={FOURTEEN_PEAKS}
      />
    </div>
  )
}

// Retain alias for backward compatibility
export { NimsdaiFooterDemo as DemoGlacier }
