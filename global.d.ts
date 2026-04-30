declare global {
  interface Window {
    YT: {
      Player: new (
        element: string | HTMLElement | null,
        options: YTPlayerOptions,
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayerOptions {
  videoId: string;
  playerVars?: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    modestbranding?: 1;
    rel?: 0 | 1;
    iv_load_policy?: 3;
    disablekb?: 0 | 1;
    playsinline?: 0 | 1;
    mute?: 0 | 1;
    origin?: string;
  };
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: { data: number }) => void;
  };
}

export {};
