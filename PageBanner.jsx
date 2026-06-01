import { motion } from 'framer-motion'

const M = motion

/**
 * Same overlay zones at every breakpoint as desktop: text sits in the
 * left/right (or center) panel over the banner artwork; only type scales down.
 */
const LAYOUT = {
  left: {
    imageObject: 'object-left',
    panel:
      'page-banner__panel absolute inset-y-0 left-0 z-10 flex h-full w-[58%] max-w-[720px] items-center justify-start',
    inner:
      'page-banner__content flex w-full min-w-0 max-w-xl flex-col items-start text-left gap-[clamp(0.5rem,1.8vw,1.75rem)] pl-[6%] sm:pl-[7%] md:pl-[8%] lg:pl-[9%]',
    slideX: -20,
  },
  right: {
    imageObject: 'object-left',
    panel:
      'page-banner__panel absolute inset-y-0 right-0 left-auto z-10 flex h-full w-[52%] max-w-[680px] items-center justify-end',
    inner:
      'page-banner__content flex w-full min-w-0 max-w-xl flex-col items-end text-right gap-[clamp(0.5rem,1.8vw,1.75rem)] pr-[6%] sm:pr-[7%] md:pr-[8%] lg:pr-[9%]',
    slideX: 20,
  },
  center: {
    imageObject: 'object-left',
    panel:
      'page-banner__panel absolute inset-y-0 left-1/2 z-10 flex h-full w-[min(92%,520px)] -translate-x-1/2 items-center justify-center px-4 sm:px-6',
    inner:
      'page-banner__content flex w-full min-w-0 max-w-xl flex-col items-center text-center gap-[clamp(0.5rem,1.8vw,1.75rem)]',
    slideX: 0,
  },
}

export default function PageBanner({
  imageSrc,
  imageAlt = '',
  align = 'left',
  textAlign,
  imageFocus,
  imageFit = 'contain',
  fullWidth = false,
  animateFrom,
  bannerClassName = '',
  contentClassName = '',
  contentPosition,
  children,
}) {
  const layoutKey =
    align === 'center' || contentPosition === 'middle' ? 'center' : align

  const layout = LAYOUT[layoutKey] ?? LAYOUT.left

  const imageObject =
    imageFocus === 'right'
      ? 'object-right'
      : imageFocus === 'center'
        ? 'object-center'
        : layout.imageObject

  const resolvedTextAlign =
    textAlign ??
    (layoutKey === 'center' ? 'center' : layoutKey === 'right' ? 'right' : 'left')

  const textAlignClasses =
    resolvedTextAlign === 'left'
      ? 'items-start text-left'
      : resolvedTextAlign === 'right'
        ? 'items-end text-right'
        : 'items-center text-center'

  const slideX =
    animateFrom === 'right' ? 20 : animateFrom === 'center' ? 0 : animateFrom === 'left' ? -20 : layout.slideX

  const imageFitClass = imageFit === 'cover' ? 'object-cover' : 'object-contain'

  return (
    <section
      id="page-banner"
      className="page-banner relative w-full overflow-hidden bg-white scroll-mt-[4.5rem]"
    >
      <div
        className={`page-banner__frame relative w-full ${fullWidth ? 'max-w-none' : 'mx-auto max-w-[1600px]'} ${bannerClassName}`}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`page-banner__img absolute inset-0 h-full w-full ${imageFitClass} ${imageObject}`}
          aria-hidden={!imageAlt}
        />
        <M.div
          initial={{ opacity: 0, x: slideX }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={`${layout.panel} font-sans antialiased`}
        >
          <div
            className={`${layout.inner} ${textAlignClasses} ${contentClassName}`}
          >
            {children}
          </div>
        </M.div>
      </div>
    </section>
  )
}
