"use client";

import { useState, useEffect } from "react";
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
      {/* Blur placeholder */}
      <Image
        fill
        src={photo.blurDataURL || photo.src}
        alt={photo.alt || ""}
        style={{
          objectFit: "cover",
          transition: "opacity 0.5s ease-out",
          opacity: loaded ? 0 : 1,
          position: "absolute",
        }}
      />

      {/* Full resolution image */}
      <Image
        fill
        src={photo.src}
        alt={photo.alt || ""}
        sizes="(max-width: 680px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: "cover",
          transition: "opacity 0.5s ease-in",
          opacity: loaded ? 1 : 0,
        }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  // Handle mobile back button
  useEffect(() => {
    const handlePopState = () => {
      if (index !== null) {
        setIndex(null); // close lightbox
        window.history.pushState(null, "", window.location.href);
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

  const renderLightboxImage = ({ slide }: { slide: Slide }) => (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        fill
        src={slide.src}
        alt={slide.alt || ""}
        style={{ objectFit: "contain", userSelect: "none" }}
      />
    </div>
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
        slides={images}
        plugins={[Fullscreen, Zoom]}
        render={{ slide: renderLightboxImage }}
      />
    </>
  );
}
