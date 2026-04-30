"use client";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import LoaderTrailer from "./LoaderTrailer";
import { Icon } from "@/models";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl?: string;
  title?: string;
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  destroy(): void;
  getPlayerState(): number;
}

export const TrailerModal = ({
  isOpen,
  onClose,
  trailerUrl,
  title,
}: TrailerModalProps) => {
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const getVideoId = (url?: string) => {
    if (!url) return "";
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") return parsedUrl.pathname.slice(1);
      return parsedUrl.searchParams.get("v") || url;
    } catch {
      return url;
    }
  };

  useEffect(() => {
    if (!isOpen || !trailerUrl) return;

    const initPlayer = () => {
      if (!containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: getVideoId(trailerUrl),
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          mute: 1,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (event: { data: number }) => {
            setIsPlaying(event.data === 1);
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else if (window.YT.Player) {
      initPlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      setIsReady(false);
    };
  }, [isOpen, trailerUrl, title]);

  const togglePlay = () => {
    if (playerRef.current) {
      const state = playerRef.current.getPlayerState();
      if (state === 1) playerRef.current.pauseVideo();
      else playerRef.current.playVideo();
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      width={960}
      rootClassName="trailer__modal-custom"
    >
      <div className="trailer__wrapper">
        <div className="trailer__video-container">
          <div ref={containerRef} className="trailer__iframe-target" />
        </div>

        {/* Прозрачный блок поверх для блокировки кликов */}
        <div className="trailer__overlay" onClick={togglePlay} />

        <button className="trailer__play-btn" onClick={togglePlay}>
          <div className="trailer__play-icon">
            {isPlaying ? (
              <Icon
                name="pause-icon"
                className="trailer__pause-img"
                width={20}
                height={30}
              />
            ) : (
              <Icon
                name="play-icon"
                className="trailer__play-img"
                width={25}
                height={31}
              />
            )}
          </div>
        </button>

        <div className="trailer__info">
          <span className="trailer__info-text">{title}</span>
        </div>

        {!isReady && (
          <div className="trailer__loader-wrapper">
            <LoaderTrailer />
          </div>
        )}
      </div>
    </Modal>
  );
};
