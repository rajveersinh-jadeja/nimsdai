import { ParallaxComponent } from '@/components/ui/parallax-scrolling';

export default function ParallaxDemo() {
  return (
    <>
      <ParallaxComponent />
      <div className="osmo-credits">
        <a
          href="https://osmo.supply"
          target="_blank"
          rel="noopener noreferrer"
          className="osmo-credits__link"
        >
          cloneable by osmo
        </a>
      </div>
    </>
  );
}
