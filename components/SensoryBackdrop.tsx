export function SensoryBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
      {/* Calm ambient radial mesh - carefully tuned to prevent visual glare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-[#10B981]/10 via-[#6366F1]/5 to-transparent rounded-full blur-3xl opacity-70" />
      
      {/* Subtle top spotlight */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#10B981]/8 rounded-full blur-[100px] opacity-60" />

      {/* Very faint structural grid for spatial grounding */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#F8FAFC 1px, transparent 1px), linear-gradient(to right, #F8FAFC 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Vignette border to keep attention focused on the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0F17_85%)]" />
    </div>
  );
}
