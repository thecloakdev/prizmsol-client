"use client"

export default function RetroGridBackground() {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        {/* Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-cyan-500" />

        {/* Ceiling Grid (Top Half) */}
        <div className="absolute top-0 left-0 right-0 h-1/2 perspective-1000">
          <div className="grid-container-ceiling">
            {/* Vertical Lines */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`vc-${i}`}
                className="grid-line-vertical-ceiling"
                style={{
                  left: `${(i - 10) * 10 + 50}%`,
                }}
              />
            ))}

            {/* Horizontal Lines */}
            {[...Array(40)].map((_, i) => (
              <div
                key={`hc-${i}`}
                className="grid-line-horizontal-ceiling"
                style={{
                  top: `${i * 2.5}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floor Grid (Bottom Half) */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 perspective-1000">
          <div className="grid-container-floor">
            {/* Vertical Lines */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`vf-${i}`}
                className="grid-line-vertical-floor"
                style={{
                  left: `${(i - 10) * 10 + 50}%`,
                }}
              />
            ))}

            {/* Horizontal Lines */}
            {[...Array(40)].map((_, i) => (
              <div
                key={`hf-${i}`}
                className="grid-line-horizontal-floor"
                style={{
                  bottom: `${i * 2.5}%`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        /* Floor Grid (Bottom) */
        .grid-container-floor {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          transform: rotateX(75deg);
          transform-origin: bottom;
        }
        
        .grid-line-vertical-floor {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, #00bcd4, transparent);
          animation: moveVerticalFloor 2s linear infinite;
        }
        
        .grid-line-horizontal-floor {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #00bcd4, transparent);
          animation: moveHorizontalFloor 2s linear infinite;
        }
        
        @keyframes moveVerticalFloor {
          0% {
            transform: translateZ(0px) scaleY(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateZ(2000px) scaleY(20);
            opacity: 0;
          }
        }
        
        @keyframes moveHorizontalFloor {
          0% {
            transform: translateZ(0px) scaleX(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateZ(2000px) scaleX(20);
            opacity: 0;
          }
        }
        
        /* Ceiling Grid (Top) */
        .grid-container-ceiling {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          transform: rotateX(-75deg);
          transform-origin: top;
        }
        
        .grid-line-vertical-ceiling {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to top, transparent, #00bcd4, transparent);
          animation: moveVerticalCeiling 2s linear infinite;
        }
        
        .grid-line-horizontal-ceiling {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #00bcd4, transparent);
          animation: moveHorizontalCeiling 2s linear infinite;
        }
        
        @keyframes moveVerticalCeiling {
          0% {
            transform: translateZ(0px) scaleY(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateZ(2000px) scaleY(20);
            opacity: 0;
          }
        }
        
        @keyframes moveHorizontalCeiling {
          0% {
            transform: translateZ(0px) scaleX(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateZ(2000px) scaleX(20);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
