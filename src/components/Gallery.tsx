"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import MasonryPhotoAlbum, { type RenderPhotoProps } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import type { Slide } from "yet-another-react-lightbox";
import "react-photo-album/styles.css";
import "yet-another-react-lightbox/styles.css";

import type { ImageItem } from "@/lib/getGalleryImages";

interface GalleryProps {
  images: ImageItem[];
}

interface ProgressiveImageProps {
  photo: ImageItem;
  width: number;
  height: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function ProgressiveImage({
  photo,
  width,
  height,
  onClick,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="progressive-image"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        cursor: "pointer",
        borderRadius: "0.25rem",
        overflow: "hidden",
      }}
      onClick={onClick}
    >
      <Image
        fill
        src={photo.blurDataURL || photo.src}
        alt=""
        style={{
          objectFit: "cover",
          filter: "blur(20px)",
          transition: "opacity 0.5s cubic-bezier(.4,0,.2,1)",
          opacity: loaded ? 0 : 1,
          zIndex: 1,
        }}
        draggable={false}
        aria-hidden="true"
      />

      <Image
        fill
        src={photo.src}
        alt={photo.alt || "Gallery image"}
        sizes="(max-width: 680px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: "cover",
          transition: "opacity 0.5s cubic-bezier(.4,0,.2,1)",
          opacity: loaded ? 1 : 0,
          zIndex: 2,
        }}
        onLoadingComplete={() => setLoaded(true)}
        draggable={false}
      />
    </div>
  );
}

type LightboxSlide = Slide & { blurDataURL?: string; alt?: string };

function RenderLightboxImage({ slide }: { slide: LightboxSlide }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {slide.blurDataURL && (
        <Image
          fill
          src={slide.blurDataURL}
          alt=""
          style={{
            objectFit: "contain",
            filter: "blur(20px)",
            transition: "opacity 0.5s cubic-bezier(.4,0,.2,1)",
            opacity: loaded ? 0 : 1,
            zIndex: 1,
            userSelect: "none",
          }}
          draggable={false}
          aria-hidden="true"
        />
      )}

      <Image
        fill
        src={slide.src}
        alt={slide.alt || "Gallery image"}
        style={{
          objectFit: "contain",
          userSelect: "none",
          transition: "opacity 0.5s cubic-bezier(.4,0,.2,1)",
          opacity: loaded ? 1 : 0,
          zIndex: 2,
        }}
        sizes="100vw"
        priority
        onLoadingComplete={() => setLoaded(true)}
        draggable={false}
      />
    </div>
  );
}

export default function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  const preloadedImages = useMemo(() => {
    if (index === null) return [];
    const prev = index > 0 ? images[index - 1] : null;
    const next = index < images.length - 1 ? images[index + 1] : null;
    return [prev, next].filter(Boolean) as ImageItem[];
  }, [index, images]);

  useEffect(() => {
    const handlePopState = () => {
      if (index !== null) {
        setIndex(null);
      }
    };

    if (index !== null) {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [index]);

  const renderPhoto = (
    { onClick }: RenderPhotoProps,
    {
      photo,
      width,
      height,
    }: { photo: ImageItem; width: number; height: number }
  ) => (
    <ProgressiveImage
      key={photo.src}
      photo={photo}
      width={width}
      height={height}
      onClick={onClick}
    />
  );

  return (
    <>
      <MasonryPhotoAlbum
        layout="masonry"
        photos={images}
        columns={(containerWidth) => (containerWidth < 680 ? 2 : 3)}
        spacing={16}
        onClick={({ index }) => setIndex(index)}
        render={{ photo: renderPhoto }}
      />

      <Lightbox
        open={index !== null}
        index={index ?? 0}
        close={() => setIndex(null)}
        slides={images as LightboxSlide[]}
        plugins={[Fullscreen, Zoom]}
        render={{ slide: RenderLightboxImage }}
      />

      {preloadedImages.map((img) => (
        <link key={img.src} rel="preload" as="image" href={img.src} />
      ))}
    </>
  );
}
