import React, { useState, useRef } from 'react';

export default function Interactive3DCard({ card, user }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isFlipped) return; // Only apply mouse tilt on the front side
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (max 12 degrees tilt)
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * -12; // Invert to rotate toward mouse

    setTilt({ x: rotateX, y: rotateY });

    // Calculate reflective glare coordinates
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Generate a deterministic CVV code from card data so it is consistent and realistic
  const getCardCvv = (cardItem) => {
    if (!cardItem) return '348';
    if (cardItem.cvv) return cardItem.cvv;
    const sum = cardItem._id
      ? cardItem._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : 482;
    return (sum % 899 + 100).toString();
  };

  const cvvCode = getCardCvv(card);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 3D Card Perspective Wrapper */}
      <div
        className="w-full aspect-[1.586/1] card-perspective cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Card Body - Handles 3D rotations */}
        <div
          ref={cardRef}
          className="relative w-full h-full preserve-3d"
          style={{
            transform: isHovered && !isFlipped
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
              : isFlipped
                ? `rotateY(180deg)`
                : `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
            transition: isHovered && !isFlipped ? 'none' : 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {/* ================= CARD FRONT FACE ================= */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-[24px] overflow-hidden shadow-2xl bg-gradient-to-br from-primary via-[#1e3a8a] to-[#00164e] flex flex-col justify-between p-8 text-white">
            {/* High fidelity chip texture backdrop */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_nrGgNiHC2lpu5iCdQW8IYMSzvjEo-0FWW3F0c-13thS96wViqVO0o93IS0ZBXP9BboLrUs_u5Cnqwiv3tHyyoqlaSPVX_TYuLOCuo8rFvylQJnJtZtO_4a4UCJdLVoaCN1kA2oJxOrLysZABxvS8smzNkX_lN-PHc753F1Zs8pDw3N8tCyKG33YmNV84vNrAr1aq4WgPeHjV288e90ejY8wXMrJESRmZOkn4fgCUDz1Yp7OmCO3Xfin-kQdjVUeiitK05F3BSg')",
                backgroundSize: 'cover',
              }}
            />

            {/* Glossy glare highlight on mouseover */}
            {isHovered && !isFlipped && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-25 mix-blend-screen"
                style={{
                  background: `radial-gradient(circle 220px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
                }}
              />
            )}

            {/* Front Header */}
            <div className="flex justify-between items-start z-10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-75 font-semibold">Premium Virtual</span>
                <span className="font-headline text-xl font-black italic tracking-tighter">VAULT</span>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-90">contactless</span>
            </div>

            {/* Front Details: Number & Expiry */}
            <div className="space-y-1 z-10">
              <div className="flex gap-4 items-center">
                {card?.cardNumber ? card.cardNumber.split(' ').map((g, i) => (
                  <span key={i} className="text-2xl md:text-3xl font-headline tracking-[0.12em] font-medium drop-shadow-md">{g}</span>
                )) : ['••••', '••••', '••••', '••••'].map((g, i) => (
                  <span key={i} className="text-2xl md:text-3xl font-headline tracking-[0.12em] font-medium drop-shadow-md">{g}</span>
                ))}
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-[8px] uppercase tracking-widest opacity-60 font-semibold">Expiry Date</p>
                  <p className="text-sm font-medium tracking-widest text-slate-200">{card?.expiryMonth || '12'} / {card?.expiryYear || '28'}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest opacity-60 font-semibold">CVV</p>
                  <p className="text-sm font-medium tracking-widest text-slate-200">•••</p>
                </div>
              </div>
            </div>

            {/* Front Footer: Owner & Network */}
            <div className="flex justify-between items-end z-10">
              <p className="text-md md:text-lg font-headline font-bold tracking-wider text-slate-100">{user?.name?.toUpperCase() || 'VAULT MEMBER'}</p>
              <div className="w-12 h-8 rounded-md bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                <div className="w-6 h-6 rounded-full bg-[#eb001b] -mr-2 opacity-90 shadow-sm" />
                <div className="w-6 h-6 rounded-full bg-[#f79e1b] opacity-90 shadow-sm" />
              </div>
            </div>
          </div>

          {/* ================= CARD BACK FACE ================= */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden rounded-[24px] overflow-hidden shadow-2xl flex flex-col justify-between py-6 text-white"
            style={{
              background: 'linear-gradient(135deg, #09122c 0%, #03081a 100%)',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Magnetic Stripe */}
            <div className="w-full h-12 bg-slate-950/95 mt-2 border-y border-slate-900" />

            {/* Signature & Security Panel */}
            <div className="px-8 mt-2">
              <div className="flex justify-between items-center text-[8px] uppercase font-bold text-white/50 tracking-wider mb-1">
                <span>Authorized Signature</span>
                <span className="pr-4">CVV Code</span>
              </div>
              <div className="flex w-full items-center">
                {/* Signature Panel */}
                <div className="flex-1 bg-gradient-to-r from-slate-100 to-slate-200/90 h-10 rounded-l flex items-center justify-start pl-4 text-slate-700 italic font-medium font-serif select-none shadow-inner border border-r-0 border-white/20">
                  <span className="text-xs md:text-sm tracking-wide opacity-80 select-none pointer-events-none font-semibold font-sans">
                    {user?.name || 'Vault Member'}
                  </span>
                </div>
                {/* CVV Panel */}
                <div className="bg-white text-slate-900 font-extrabold font-mono h-10 w-16 flex items-center justify-center rounded-r shadow-2xl tracking-widest text-sm border-2 border-[#f79e1b]">
                  {cvvCode}
                </div>
              </div>
            </div>

            {/* Back Footer Legal & Support Details */}
            <div className="px-8 space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[7px] leading-tight text-white/40 max-w-[280px]">
                    This premium virtual card remains the property of VAULT Bank. Subject to cardholder terms and conditions. Not transferable.
                  </p>
                  <p className="text-[7px] text-white/40 font-semibold">
                    Customer Support: +1 (800) 555-VAULT | www.vaultbank.com
                  </p>
                </div>
                {/* Gold holographic emblem */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-600 via-yellow-200 to-yellow-500 opacity-60 shadow-lg border border-yellow-300 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-lg text-yellow-800/80">workspace_premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flip Control Button */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="self-center flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-[var(--color-outline-variant)] text-primary hover:text-primary-container text-xs font-bold font-headline transition-all hover:scale-105 active:scale-95 shadow-sm group"
      >
        <span className="material-symbols-outlined text-base group-hover:rotate-180 transition-transform duration-500">
          3d_rotation
        </span>
        {isFlipped ? 'Show Card Front' : 'Flip to View Back & CVV'}
      </button>
    </div>
  );
}
