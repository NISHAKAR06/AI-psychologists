import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

const VideoConference = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const configuration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    };
    peerConnection.current = new RTCPeerConnection(configuration);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach(track => {
          peerConnection.current?.addTrack(track, stream);
        });
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          setPermissionDenied(true);
        }
      });

    peerConnection.current.ontrack = event => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return () => {
      peerConnection.current?.close();
    };
  }, []);

  const handleToggleMute = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleToggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOff;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleEndCall = () => {
    // Add logic to end the call
    console.log('Call ended');
  };

  if (permissionDenied) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-background text-foreground">
        <h2 className="text-2xl font-bold mb-4">Permission Denied</h2>
        <p className="text-center">
          To use the video conference feature, you need to grant permission to access your camera and microphone.
          <br />
          Please check your browser settings and allow access.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Local Video */}
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="absolute bottom-4 right-4 w-48 h-36 object-cover rounded-lg border-2 border-primary"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 flex items-center space-x-4">
        <Button onClick={handleToggleMute} variant={isMuted ? 'destructive' : 'default'}>
          {isMuted ? <MicOff /> : <Mic />}
        </Button>
        <Button onClick={handleToggleVideo} variant={isVideoOff ? 'destructive' : 'default'}>
          {isVideoOff ? <VideoOff /> : <Video />}
        </Button>
        <Button onClick={handleEndCall} variant="destructive">
          <PhoneOff />
        </Button>
      </div>
    </motion.div>
  );
};

export default VideoConference;
