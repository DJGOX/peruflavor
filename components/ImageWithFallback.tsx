'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
}

export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // SVG placeholder mejorado con diseño más atractivo
  const fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHBhdGggZD0iTTQwMCAyMDBIMjAwVjMwMEg0MDBWMjAwek0yMDAgNDAwSDQwMFY1MDBIMjAwVjQwMHoiIGZpbGw9IiNkMWQ1ZGIiIG9wYWNpdHk9IjAuMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LXdlaWdodD0iNTAwIj5JbWFnZW4gTm8gRGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4='

  useEffect(() => {
    // Resetear el estado cuando cambia la src
    setHasError(false)
    setImgSrc(src)
  }, [src])

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  // Si no hay src o es un placeholder, usar fallback directamente
  if (!src || src === '/placeholder.jpg' || src.includes('placeholder')) {
    if (fill) {
      return (
        <div className={`${className || ''} bg-gray-200 flex items-center justify-center`}>
          <Image
            src={fallbackSrc}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
          />
        </div>
      )
    }
    return (
      <div className={`${className || ''} bg-gray-200 flex items-center justify-center`} style={{ width, height }}>
        <Image
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
        />
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        unoptimized={hasError}
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleError}
      unoptimized={hasError}
    />
  )
}
