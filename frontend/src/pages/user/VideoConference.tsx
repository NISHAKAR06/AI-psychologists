import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

const VideoConference = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    ws.current = new WebSocket(`ws://localhost:8000/ws/chat/?token=${token}`);

    ws.current.onopen = () => {
      console.log("WebSocket connected for video conference");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "offer":
          handleOffer(data.offer);
          break;
        case "answer":
          handleAnswer(data.answer);
          break;
        case "ice-candidate":
          handleNewICECandidate(data.candidate);
          break;
        default:
          break;
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected for video conference");
    };

    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    peerConnection.current = new RTCPeerConnection(configuration);

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({ type: "ice-candidate", candidate: event.candidate });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, stream);
        });
        createOffer();
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
        if (
          error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
        ) {
          setPermissionDenied(true);
        }
      });

    return () => {
      ws.current?.close();
      peerConnection.current?.close();
    };
  }, []);

  const sendMessage = (message: object) => {
    ws.current?.send(JSON.stringify(message));
  };

  const createOffer = async () => {
    const offer = await peerConnection.current?.createOffer();
    await peerConnection.current?.setLocalDescription(offer);
    sendMessage({ type: "offer", offer });
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    await peerConnection.current?.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await peerConnection.current?.createAnswer();
    await peerConnection.current?.setLocalDescription(answer);
    sendMessage({ type: "answer", answer });
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    await peerConnection.current?.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  const handleNewICECandidate = async (candidate: RTCIceCandidateInit) => {
    await peerConnection.current?.addIceCandidate(
      new RTCIceCandidate(candidate)
    );
  };

  const handleToggleMute = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleToggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoOff;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleEndCall = () => {
    // Add logic to end the call
    console.log("Call ended");
  };

  if (permissionDenied) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-background text-foreground">
        <h2 className="text-2xl font-bold mb-4">Permission Denied</h2>
        <p className="text-center">
          To use the video conference feature, you need to grant permission to
          access your camera and microphone.
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
        <Button
          onClick={handleToggleMute}
          variant={isMuted ? "destructive" : "default"}
        >
          {isMuted ? <MicOff /> : <Mic />}
        </Button>
        <Button
          onClick={handleToggleVideo}
          variant={isVideoOff ? "destructive" : "default"}
        >
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
