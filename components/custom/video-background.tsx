const VideoBackground = () => {
   return (
      <div className="relative w-full h-screen overflow-hidden">
         <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
         >
            <source
               src="/graphics/video/dutch-island-4k-take-01.mp4"
               type="video/mp4"
            />
            Your browser does not support the video tag.
         </video>
      </div>
   );
};

export default VideoBackground;
