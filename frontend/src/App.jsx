import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { Mic, MicOff, PhoneOff, Volume2, VolumeX, Camera, CameraOff, Maximize2 } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Realistic Avatar Component with Video-like Appearance
const RealisticAvatar = ({ isListening, isSpeaking, psychologistName, psychologistType }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Avatar configurations for different psychologists
  const avatarConfigs = {
    'Dr. Sarah': {
      skinColor: '#f4c2a1',
      hairColor: '#8B4513',
      eyeColor: '#4A90E2',
      clothingColor: '#2E8B57',
      gender: 'female'
    },
    'Dr. Michael': {
      skinColor: '#d4a574',
      hairColor: '#2F1B14',
      eyeColor: '#228B22',
      clothingColor: '#4682B4',
      gender: 'male'
    },
    'Dr. Priya': {
      skinColor: '#c4915c',
      hairColor: '#1C1C1C',
      eyeColor: '#8B4513',
      clothingColor: '#9932CC',
      gender: 'female'
    },
    'Dr. Emma': {
      skinColor: '#f5deb3',
      hairColor: '#FFD700',
      eyeColor: '#20B2AA',
      clothingColor: '#FF6347',
      gender: 'female'
    },
    'Dr. Alex': {
      skinColor: '#ddbea9',
      hairColor: '#A0522D',
      eyeColor: '#4682B4',
      clothingColor: '#708090',
      gender: 'male'
    }
  };

  const config = avatarConfigs[psychologistName] || avatarConfigs['Dr. Alex'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 500;

    let mouthOpenness = 0;
    let eyeBlinkTimer = 0;
    let headTiltAngle = 0;
    let breathingOffset = 0;

    const drawAvatar = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background with professional gradient
      const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 300);
      gradient.addColorStop(0, 'rgba(70, 130, 180, 0.1)');
      gradient.addColorStop(1, 'rgba(25, 25, 112, 0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Breathing animation
      breathingOffset = Math.sin(Date.now() * 0.002) * 2;
      
      // Head tilt for natural movement
      headTiltAngle = Math.sin(Date.now() * 0.001) * 0.05;

      ctx.save();
      ctx.translate(200, 220 + breathingOffset);
      ctx.rotate(headTiltAngle);
      
      // Neck
      ctx.fillStyle = config.skinColor;
      ctx.fillRect(-20, 60, 40, 40);

      // Face (oval shape)
      ctx.beginPath();
      ctx.ellipse(0, 0, 80, 100, 0, 0, 2 * Math.PI);
      ctx.fillStyle = config.skinColor;
      ctx.fill();
      
      // Face shading for depth
      const faceGradient = ctx.createRadialGradient(-20, -20, 10, 0, 0, 90);
      faceGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      faceGradient.addColorStop(1, 'rgba(0, 0, 0, 0.02)');
      ctx.fillStyle = faceGradient;
      ctx.fill();

      // Hair
      ctx.beginPath();
      if (config.gender === 'female') {
        // Female hair (longer)
        ctx.ellipse(0, -60, 85, 60, 0, 0, 2 * Math.PI);
        ctx.ellipse(-40, -30, 30, 80, -0.3, 0, 2 * Math.PI);
        ctx.ellipse(40, -30, 30, 80, 0.3, 0, 2 * Math.PI);
      } else {
        // Male hair (shorter)
        ctx.ellipse(0, -60, 75, 50, 0, 0, 2 * Math.PI);
      }
      ctx.fillStyle = config.hairColor;
      ctx.fill();

      // Eyes
      const eyeHeight = eyeBlinkTimer > 0 ? 5 : 15;
      
      // Left eye
      ctx.beginPath();
      ctx.ellipse(-25, -20, 20, eyeHeight, 0, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-25, -20, 8, eyeHeight * 0.6, 0, 0, 2 * Math.PI);
      ctx.fillStyle = config.eyeColor;
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(-25, -20, 4, eyeHeight * 0.4, 0, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();

      // Right eye
      ctx.beginPath();
      ctx.ellipse(25, -20, 20, eyeHeight, 0, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(25, -20, 8, eyeHeight * 0.6, 0, 0, 2 * Math.PI);
      ctx.fillStyle = config.eyeColor;
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(25, -20, 4, eyeHeight * 0.4, 0, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();

      // Eyebrows
      ctx.strokeStyle = config.hairColor;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      
      ctx.beginPath();
      ctx.moveTo(-40, -35);
      ctx.lineTo(-10, -40);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(10, -40);
      ctx.lineTo(40, -35);
      ctx.stroke();

      // Nose
      ctx.beginPath();
      ctx.ellipse(0, 0, 8, 12, 0, 0, 2 * Math.PI);
      ctx.fillStyle = config.skinColor;
      ctx.fill();
      
      // Nose shadow
      ctx.beginPath();
      ctx.ellipse(-3, 5, 3, 4, 0, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fill();

      // Mouth with realistic lip sync
      const mouthWidth = 30 + (isSpeaking ? mouthOpenness * 10 : 0);
      const mouthHeight = 8 + (isSpeaking ? mouthOpenness * 8 : 0);
      
      ctx.beginPath();
      ctx.ellipse(0, 30, mouthWidth, mouthHeight, 0, 0, 2 * Math.PI);
      ctx.fillStyle = isSpeaking && mouthOpenness > 0.3 ? '#8B0000' : '#CD5C5C';
      ctx.fill();
      
      // Teeth when mouth is open
      if (isSpeaking && mouthOpenness > 0.4) {
        ctx.beginPath();
        ctx.ellipse(0, 25, mouthWidth * 0.8, 4, 0, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
      }

      // Lips outline
      ctx.beginPath();
      ctx.ellipse(0, 30, mouthWidth, mouthHeight, 0, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(139, 0, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Chin and jaw definition
      ctx.beginPath();
      ctx.ellipse(0, 70, 60, 25, 0, 0, 2 * Math.PI);
      ctx.fillStyle = config.skinColor;
      ctx.fill();

      ctx.restore();

      // Body/Clothing
      ctx.beginPath();
      ctx.ellipse(200, 400, 120, 100, 0, 0, 2 * Math.PI);
      ctx.fillStyle = config.clothingColor;
      ctx.fill();

      // Collar
      ctx.beginPath();
      ctx.ellipse(200, 320, 60, 30, 0, 0, 2 * Math.PI);
      ctx.fillStyle = config.clothingColor;
      ctx.fill();

      // Shoulders
      ctx.beginPath();
      ctx.ellipse(120, 380, 40, 60, -0.3, 0, 2 * Math.PI);
      ctx.fillStyle = config.clothingColor;
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(280, 380, 40, 60, 0.3, 0, 2 * Math.PI);
      ctx.fillStyle = config.clothingColor;
      ctx.fill();

      // Listening indicator (subtle glow)
      if (isListening) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.shadowColor = '#4A90E2';
        ctx.shadowBlur = 20;
        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(200, 220, 85, 105, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
      }
    };

    const animate = () => {
      // Natural blinking
      if (Math.random() < 0.008) {
        eyeBlinkTimer = 10;
      }
      if (eyeBlinkTimer > 0) eyeBlinkTimer--;

      // Lip sync animation
      if (isSpeaking) {
        mouthOpenness = 0.3 + Math.sin(Date.now() * 0.02) * 0.4;
      } else {
        mouthOpenness = Math.max(0, mouthOpenness - 0.05);
      }

      drawAvatar();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening, isSpeaking, psychologistName]);

  return (
    <div className="realistic-avatar-container">
      <canvas 
        ref={canvasRef} 
        className="avatar-canvas"
      />
    </div>
  );
};

// Psychologist Selection Component
const PsychologistSelection = ({ onSelect }) => {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPsychologists();
  }, []);

  const fetchPsychologists = async () => {
    try {
      const response = await axios.get(`${API}/psychologists`);
      setPsychologists(response.data);
    } catch (error) {
      console.error('Error fetching psychologists:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading psychologists...</div>;
  }

  return (
    <div className="psychologist-selection">
      <div className="selection-header">
        <h1 className="main-title">AI Psychology Sessions</h1>
        <p className="subtitle">Professional video consultations with specialized AI psychologists</p>
      </div>
      
      <div className="psychologists-grid">
        {Array.isArray(psychologists) && psychologists.map((psych) => (
          <Card 
            key={psych.type} 
            className="psychologist-card"
            onClick={() => onSelect(psych)}
          >
            <CardHeader>
              <div className="psychologist-avatar">
                <Avatar className="large-avatar">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${psych.name}`} />
                  <AvatarFallback>{psych.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="psychologist-name">{psych.name}</CardTitle>
              <Badge variant="secondary" className="specialization-badge">
                {psych.specialization}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="psychologist-description">{psych.description}</p>
              <Button className="start-session-btn">Start Video Session</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Enhanced Video Call Interface
const VideoCallInterface = ({ selectedPsychologist, onBack }) => {
  const [sessionId, setSessionId] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const callStartTimeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    createSession();
    initializeSpeech();
    startCall();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [selectedPsychologist]);

  const createSession = async () => {
    try {
      const response = await axios.post(`${API}/sessions/`, {
        psychologist_type: selectedPsychologist.type,
        language: 'english'
      });
      setSessionId(response.data.id);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const initializeSpeech = () => {
    // Initialize Speech Recognition with enhanced error handling
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;
        
        recognition.onstart = () => {
          setIsListening(true);
          setConnectionStatus('listening');
        };
        
        recognition.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          if (finalTranscript) {
            setCurrentTranscript(finalTranscript);
            sendMessageToAI(finalTranscript);
          } else {
            setCurrentTranscript(interimTranscript);
          }
        };
        
        recognition.onerror = (event) => {
          setIsListening(false);
          if (event.error !== 'no-speech' && event.error !== 'aborted') {
            console.error('Speech recognition error:', event.error);
          }
        };
        
        recognition.onend = () => {
          setIsListening(false);
          if (isCallActive && !isMuted && !isSpeaking) {
            setTimeout(() => startListening(), 500);
          }
        };
        
        recognitionRef.current = recognition;
      } catch (error) {
        console.error('Error initializing speech recognition:', error);
      }
    }

    // Initialize Speech Synthesis
    synthRef.current = window.speechSynthesis;
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && !isSpeaking) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        if (error.name !== 'InvalidStateError') {
          console.error('Error starting recognition:', error);
        }
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  };

  const startCall = () => {
    setIsCallActive(true);
    setConnectionStatus('connected');
    callStartTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      if (callStartTimeRef.current) {
        setCallDuration(Math.floor((Date.now() - callStartTimeRef.current) / 1000));
      }
    }, 1000);

    setTimeout(() => {
      const greeting = `Hello! I'm ${selectedPsychologist.name}, your ${selectedPsychologist.specialization} specialist. I'm here to provide you with a safe, confidential space to discuss whatever is on your mind. How are you feeling today?`;
      speakText(greeting);
      setAiResponse(greeting);
    }, 2000);

    setTimeout(() => {
      if (!isMuted) {
        startListening();
      }
    }, 8000);
  };

  const sendMessageToAI = async (message) => {
    if (!sessionId || !message.trim()) return;

    try {
      setConnectionStatus('processing');
      const response = await axios.post(`${API}/chat`, {
        message: message,
        session_id: sessionId,
        psychologist_type: selectedPsychologist.type
      });

      const aiText = response.data.response;
      setAiResponse(aiText);
      speakText(aiText);
      setCurrentTranscript('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = "I apologize, I'm having trouble connecting right now. Could you please repeat that?";
      speakText(errorMessage);
      setAiResponse(errorMessage);
    }
  };

  const speakText = (text) => {
    if (synthRef.current && text) {
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 0.9;
      
      const voices = synthRef.current.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('samantha') ||
        voice.lang.includes('en-US')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setConnectionStatus('speaking');
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setConnectionStatus('connected');
        
        if (isCallActive && !isMuted) {
          setTimeout(() => {
            if (isCallActive && !isMuted) {
              startListening();
            }
          }, 500);
        }
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (newMutedState) {
      stopListening();
    } else {
      if (isCallActive && !isSpeaking) {
        setTimeout(() => startListening(), 500);
      }
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    setConnectionStatus('disconnected');
    
    stopListening();
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setTimeout(() => {
      const goodbye = "Thank you for our session today. Take care, and remember that seeking help shows courage. Goodbye!";
      speakText(goodbye);
    }, 1000);
    
    setTimeout(() => {
      onBack();
    }, 5000);
  };

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#10b981';
      case 'listening': return '#3b82f6';
      case 'speaking': return '#f59e0b';
      case 'processing': return '#8b5cf6';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connecting': return 'Connecting...';
      case 'connected': return 'Connected';
      case 'listening': return 'Listening...';
      case 'speaking': return `${selectedPsychologist.name} is speaking...`;
      case 'processing': return 'Processing...';
      case 'error': return 'Connection Error';
      case 'disconnected': return 'Call Ended';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`professional-video-call ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Professional Header */}
      <div className="video-call-header">
        <div className="call-info-section">
          <Avatar className="doctor-avatar">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedPsychologist.name}`} />
            <AvatarFallback>{selectedPsychologist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="doctor-info">
            <h2 className="doctor-name">{selectedPsychologist.name}</h2>
            <div className="connection-status">
              <div 
                className="status-dot" 
                style={{ backgroundColor: getStatusColor() }}
              ></div>
              <span className="status-text">{getStatusText()}</span>
              {isCallActive && (
                <span className="session-duration">• Session: {formatCallDuration(callDuration)}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="header-controls">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="expand-btn"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Video Container */}
      <div className="main-video-container">
        <div className="doctor-video-frame">
          {isVideoOn ? (
            <RealisticAvatar 
              isListening={isListening}
              isSpeaking={isSpeaking}
              psychologistName={selectedPsychologist.name}
              psychologistType={selectedPsychologist.type}
            />
          ) : (
            <div className="video-disabled">
              <div className="video-off-placeholder">
                <CameraOff className="video-off-icon" />
                <p>Video is turned off</p>
              </div>
            </div>
          )}
          
          {/* Live Conversation Display */}
          {(currentTranscript || aiResponse) && (
            <div className="conversation-overlay">
              {currentTranscript && (
                <div className="user-speaking">
                  <span className="speaker-label">You:</span>
                  <span className="speech-text">{currentTranscript}</span>
                </div>
              )}
              {isSpeaking && aiResponse && (
                <div className="ai-speaking">
                  <span className="speaker-label">{selectedPsychologist.name}:</span>
                  <span className="speech-text">{aiResponse}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Professional Controls */}
      <div className="professional-controls">
        <div className="control-group">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={toggleMute}
            className="professional-control-btn"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            onClick={endCall}
            className="end-call-btn"
            title="End Session"
          >
            <PhoneOff className="w-5 h-5" />
            End Session
          </Button>
          
          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="lg"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="professional-control-btn"
            title={isVideoOn ? "Turn off video" : "Turn on video"}
          >
            {isVideoOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Browser Compatibility Notice */}
      {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
        <div className="compatibility-notice">
          <p>⚠️ For the best experience with voice interaction, please use Google Chrome or Microsoft Edge.</p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = useState('selection');
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

  const handlePsychologistSelect = (psychologist) => {
    setSelectedPsychologist(psychologist);
    setCurrentView('call');
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
    setSelectedPsychologist(null);
  };

  return (
    <div className="App">
      {currentView === 'selection' ? (
        <PsychologistSelection onSelect={handlePsychologistSelect} />
      ) : (
        <VideoCallInterface
          selectedPsychologist={selectedPsychologist}
          onBack={handleBackToSelection}
        />
      )}
    </div>
  );
}

export default App;
