"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
   Play,
   Pause,
   SkipBack,
   SkipForward,
   Minimize2,
   Maximize2,
   Repeat,
   Shuffle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ModeToggle } from "./mode-toggle";

export function MusicPlayer() {
   const [isPlaying, setIsPlaying] = useState(false);
   const [currentTrack, setCurrentTrack] = useState(0);
   const [progress, setProgress] = useState(0);
   const [isCollapsed, setIsCollapsed] = useState(true);
   const [isRepeat, setIsRepeat] = useState(false);
   const [isShuffle, setIsShuffle] = useState(false);
   const audioRef = useRef<HTMLAudioElement>(null);
   // const [volume, setVolume] = useState(1);
   // const [isMuted, setIsMuted] = useState(false);

   const tracks = [
      {
         title: "Jenny",
         artist: "Goodmorning Pancake",
         src: "music/Jenny.mp3",
      },
      {
         title: "Flowers For a Girl",
         artist: "Aomori",
         src: "music/Flowers For a Girl.mp3",
      },
      {
         title: "Past Lives",
         artist: "sapientdream ",
         src: "music/Past Lives.mp3",
      },
   ];
   useEffect(() => {
      const audio = audioRef.current;

      const handleTimeUpdate = () => {
         if (audio) {
            setProgress((audio.currentTime / audio.duration) * 100);
         }
      };

      if (audio) {
         if (isPlaying) {
            audio.play();
         } else {
            audio.pause();
         }

         audio.addEventListener("timeupdate", handleTimeUpdate);
         // audio.volume = volume;
         // audio.muted = isMuted;

         return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            setProgress(0);
         };
      }
   }, [
      isPlaying,
      currentTrack,
      // volume,
      //isMuted
   ]);

   const skipTrack = (forward: boolean) => {
      if (isShuffle) {
         const nextTrack = Math.floor(Math.random() * tracks.length);
         setCurrentTrack(nextTrack);
      } else {
         setCurrentTrack(
            (prevTrack) =>
               (prevTrack + (forward ? 1 : -1) + tracks.length) % tracks.length
         );
      }
      setProgress(0);
   };

   const handleProgressChange = (newProgress: number[]) => {
      const [value] = newProgress;
      setProgress(value);
      if (audioRef.current) {
         audioRef.current.currentTime =
            (audioRef.current.duration / 100) * value;
      }
   };

   const toggleCollapse = useCallback(() => {
      setIsCollapsed((prev) => !prev);
   }, []);

   // const handleVolumeChange = (newVolume: number[]) => {
   //    const [value] = newVolume;
   //    setVolume(value / 100);
   //    setIsMuted(false);
   //    if (audioRef.current) {
   //       audioRef.current.volume = value / 100;
   //       audioRef.current.muted = false;
   //    }
   // };

   // const toggleMute = () => {
   //    setIsMuted(!isMuted);
   //    if (audioRef.current) {
   //       audioRef.current.muted = !isMuted;
   //    }
   // };

   const toggleRepeat = () => {
      setIsRepeat(!isRepeat);
   };

   const toggleShuffle = () => {
      setIsShuffle(!isShuffle);
   };

   const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
   };

   const CollapsedView = useCallback(
      () => (
         <div className="flex items-center justify-between space-x-2">
            <div className="flex-1 truncate">
               <p className="text-sm font-medium truncate">
                  {tracks[currentTrack].title}
               </p>
               <p className="text-xs text-muted-foreground truncate">
                  {tracks[currentTrack].artist}
               </p>
            </div>
            <Button
               className="bg-primary text-primary-foreground"
               variant="outline"
               size="icon"
               onClick={() => setIsPlaying(!isPlaying)}
            >
               {isPlaying ? (
                  <Pause className="h-3 w-3" />
               ) : (
                  <Play className="h-3 w-3" />
               )}
            </Button>
            <Button variant="outline" size="icon" onClick={toggleCollapse}>
               <Maximize2 className="h-3 w-3" />
            </Button>
         </div>
      ),
      [currentTrack, isPlaying, toggleCollapse]
   );

   return (
      <Card
         className={`w-full ${
            isCollapsed ? "max-w-xs" : "max-w-md"
         } mx-auto fixed bottom-4 right-4 p-3 bg-background z-50`}
      >
         <CardContent className="p-4">
            {isCollapsed ? (
               <CollapsedView />
            ) : (
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <h2 className="text-lg font-bold truncate">
                        {tracks[currentTrack].title}
                     </h2>
                     <div className="flex items-center space-x-2">
                        <Button
                           variant="outline"
                           size="icon"
                           onClick={toggleCollapse}
                        >
                           <Minimize2 className="h-3 w-3" />
                        </Button>
                        <ModeToggle />
                     </div>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                     {tracks[currentTrack].artist}
                  </p>
                  <div className="flex items-center space-x-2">
                     <span className="text-xs text-muted-foreground">
                        {audioRef.current &&
                           formatTime(audioRef.current.currentTime)}
                     </span>
                     <Slider
                        value={[progress]}
                        max={100}
                        step={1}
                        className="flex-grow w-full"
                        onValueChange={handleProgressChange}
                     />
                     <span className="text-xs text-muted-foreground">
                        {audioRef.current &&
                           formatTime(audioRef.current.duration)}
                     </span>
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                     <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleShuffle}
                        className={
                           isShuffle ? "bg-primary text-primary-foreground" : ""
                        }
                     >
                        <Shuffle className="h-3 w-3" />
                     </Button>
                     <Button
                        variant="outline"
                        size="icon"
                        onClick={() => skipTrack(false)}
                     >
                        <SkipBack className="h-3 w-3" />
                     </Button>
                     <Button
                        className="bg-primary text-primary-foreground"
                        variant="outline"
                        size="icon"
                        onClick={() => setIsPlaying(!isPlaying)}
                     >
                        {isPlaying ? (
                           <Pause className="h-4 w-4" />
                        ) : (
                           <Play className="h-4 w-4" />
                        )}
                     </Button>
                     <Button
                        variant="outline"
                        size="icon"
                        onClick={() => skipTrack(true)}
                     >
                        <SkipForward className="h-3 w-3" />
                     </Button>
                     <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleRepeat}
                        className={
                           isRepeat ? "bg-primary text-primary-foreground" : ""
                        }
                     >
                        <Repeat className="h-3 w-3" />
                     </Button>
                  </div>
                  {/* <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={toggleMute}>
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-3 w-3" />
                ) : (
                  <Volume2 className="h-3 w-3" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                className="w-24"
                onValueChange={handleVolumeChange}
              />
            </div> */}
               </div>
            )}
         </CardContent>
         <audio
            ref={audioRef}
            src={tracks[currentTrack].src}
            onEnded={() => {
               if (isRepeat) {
                  audioRef.current?.play();
               } else {
                  skipTrack(true);
               }
            }}
         />
      </Card>
   );
}
