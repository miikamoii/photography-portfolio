"use client";

import { useState } from "react";
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

export default function Gallery({ images }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  const renderPhoto = (
    { onClick }: RenderPhotoProps,
    {
      photo,
      width,
      height,
    }: { photo: ImageItem; width: number; height: number }
  ) => (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Image
        fill
        src={photo.src}
        alt={photo.alt || ""}
        sizes="(max-width: 680px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
      />
    </div>
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
