import React from 'react';

export const ChefCharacterSVG: React.FC<{
  variant?: 'female' | 'male';
  mood?: 'happy' | 'excited' | 'thinking';
  className?: string;
}> = ({ variant = 'female', mood = 'happy', className = 'w-40 h-44' }) => {
  return (
    <svg viewBox="0 0 220 240" fill="none" className={className} aria-label="Karakter Koki Rendang Quest">
      {/* Soft warm glow */}
      <circle cx="105" cy="130" r="82" fill="#FDE6C4" opacity="0.65" />

      {/* Decorative spice leaves behind */}
      <path d="M26 112C12 98 15 78 34 84C46 88 48 106 26 112Z" fill="#68A357" stroke="#3E2211" strokeWidth="3" />
      <path d="M18 130C6 122 10 105 26 110C38 114 36 128 18 130Z" fill="#89B96E" stroke="#3E2211" strokeWidth="3" />

      {/* Wooden Spoon held in hand */}
      <g className=" origin-bottom-left" style={{ transformBox: 'fill-box' }}>
        <path
          d="M170 156L190 92"
          stroke="#4A2511"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M170 156L190 92"
          stroke="#C87D3B"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <ellipse
          cx="194"
          cy="74"
          rx="16"
          ry="23"
          transform="rotate(16 194 74)"
          fill="#D48946"
          stroke="#4A2511"
          strokeWidth="4"
        />
        <ellipse
          cx="192"
          cy="73"
          rx="10"
          ry="15"
          transform="rotate(16 192 73)"
          fill="#B36828"
        />
      </g>

      {/* Chef Hat (Toque) */}
      <g>
        <path
          d="M52 78C34 72 30 46 48 34C56 14 86 10 104 22C124 10 152 18 156 38C172 48 166 74 148 78Z"
          fill="#FFFDF9"
          stroke="#4A2511"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <path
          d="M56 68C58 54 68 48 76 46M104 64V38M136 68C134 55 126 48 118 46"
          stroke="#E5D3BC"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect
          x="52"
          y="68"
          width="98"
          height="22"
          rx="8"
          fill="#FFFDF9"
          stroke="#4A2511"
          strokeWidth="4.5"
        />
        <path d="M56 79H146" stroke="#E8C39E" strokeWidth="3" />
      </g>

      {/* Hair Back (Female Pony/Bun) */}
      {variant === 'female' && (
        <g>
          <circle cx="42" cy="128" r="22" fill="#6D3B1E" stroke="#4A2511" strokeWidth="4.5" />
          <path d="M32 118C36 112 46 112 50 118" stroke="#8C5130" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {/* Chef Coat & Apron Body */}
      <g>
        <path
          d="M54 166C54 146 72 138 102 138C132 138 150 146 150 166L158 216H46L54 166Z"
          fill="#FFFDF9"
          stroke="#4A2511"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        {/* Red Chef Neckerchief */}
        <path
          d="M84 140L102 158L120 140"
          fill="#E04F33"
          stroke="#4A2511"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Brown Apron */}
        <path
          d="M72 154H132L138 216H66L72 154Z"
          fill="#8C4A23"
          stroke="#4A2511"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        {/* Apron straps */}
        <path d="M78 142V156M126 142V156" stroke="#8C4A23" strokeWidth="7" strokeLinecap="round" />
        <path d="M78 142V156M126 142V156" stroke="#4A2511" strokeWidth="4" strokeLinecap="round" />
        {/* Cute Pocket with Minang Gold trim */}
        <rect x="84" y="176" width="36" height="24" rx="6" fill="#703816" stroke="#4A2511" strokeWidth="3.5" />
        <path d="M86 183H118" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Right Arm Waving / Holding Spoon */}
      <path
        d="M144 162C156 164 166 158 174 146"
        stroke="#FFFDF9"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M144 162C156 164 166 158 174 146"
        stroke="#4A2511"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="176" cy="143" r="10" fill="#FFE0C2" stroke="#4A2511" strokeWidth="4" />

      {/* Head & Face */}
      <g>
        {/* Ears */}
        <circle cx="52" cy="114" r="10" fill="#FFE0C2" stroke="#4A2511" strokeWidth="4" />
        <circle cx="152" cy="114" r="10" fill="#FFE0C2" stroke="#4A2511" strokeWidth="4" />

        {/* Face Base */}
        <rect
          x="56"
          y="76"
          width="92"
          height="72"
          rx="36"
          fill="#FFE0C2"
          stroke="#4A2511"
          strokeWidth="4.5"
        />

        {/* Hair Front */}
        {variant === 'female' ? (
          <path
            d="M54 108C54 84 74 74 102 74C130 74 150 84 150 108C144 92 130 86 114 94C104 82 86 84 74 96C66 88 58 96 54 108Z"
            fill="#6D3B1E"
            stroke="#4A2511"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M56 100C58 80 78 72 102 72C128 72 146 80 148 100C136 88 122 86 104 90C88 84 70 88 56 100Z"
            fill="#4A2511"
            stroke="#3B1D0B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        )}

        {/* Eyes */}
        {mood === 'excited' ? (
          <>
            <path d="M74 112C78 105 86 105 90 112" stroke="#4A2511" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M114 112C118 105 126 105 130 112" stroke="#4A2511" strokeWidth="4.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Cute left eye open with sparkle */}
            <ellipse cx="82" cy="112" rx="6.5" ry="8" fill="#4A2511" />
            <circle cx="80" cy="109" r="2.5" fill="#FFFFFF" />
            {/* Cute wink right eye like reference image */}
            <path d="M114 112C119 106 126 106 131 112" stroke="#4A2511" strokeWidth="4.5" strokeLinecap="round" />
          </>
        )}

        {/* Rosy Cheeks */}
        <ellipse cx="70" cy="122" rx="7" ry="4.5" fill="#F48B7B" opacity="0.75" />
        <ellipse cx="134" cy="122" rx="7" ry="4.5" fill="#F48B7B" opacity="0.75" />

        {/* Happy Smile */}
        {mood === 'thinking' ? (
          <circle cx="102" cy="128" r="5" fill="#D9534F" stroke="#4A2511" strokeWidth="3" />
        ) : (
          <path
            d="M91 122C91 122 95 135 102 135C109 135 113 122 113 122Z"
            fill="#E25B4B"
            stroke="#4A2511"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        )}
      </g>

      {/* Sparkles */}
      <path d="M174 36L178 46L188 50L178 54L174 64L170 54L160 50L170 46L174 36Z" fill="#FBBF24" stroke="#4A2511" strokeWidth="2.5" />
    </svg>
  );
};

export const RendangDishSVG: React.FC<{ className?: string }> = ({ className = 'w-44 h-32' }) => (
  <svg viewBox="0 0 240 165" fill="none" className={className} aria-label="Ilustrasi Hidangan Rendang">
    {/* Warm Steam Wisps */}
    <path d="M86 34C82 24 90 16 86 6" stroke="#D97724" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
    <path d="M122 28C118 18 126 10 122 2" stroke="#D97724" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
    <path d="M156 36C152 26 160 18 156 8" stroke="#D97724" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />

    {/* Ceramic Plate */}
    <ellipse cx="120" cy="122" rx="106" ry="34" fill="#E6D5B8" stroke="#4A2511" strokeWidth="4.5" />
    <ellipse cx="120" cy="118" rx="96" ry="29" fill="#FFFDF9" stroke="#C8A97E" strokeWidth="3" />

    {/* Banana Leaf Base */}
    <path
      d="M36 114C44 92 86 84 124 86C166 88 198 96 204 116C190 132 152 138 116 138C78 138 44 128 36 114Z"
      fill="#559646"
      stroke="#3B200E"
      strokeWidth="4"
    />
    {/* Turmeric / Lime Leaf garnish */}
    <path d="M150 84C166 64 192 66 198 84C182 94 164 94 150 84Z" fill="#74B559" stroke="#3B200E" strokeWidth="3.5" />
    <path d="M46 92C36 74 56 64 74 78" fill="#68A84E" stroke="#3B200E" strokeWidth="3.5" />

    {/* Rich Rendang Gravy (Dedak) */}
    <ellipse cx="120" cy="112" rx="68" ry="20" fill="#5C2A12" stroke="#3B1B0B" strokeWidth="3.5" />

    {/* Caramelized Beef Rendang Chunks */}
    <g stroke="#3B1B0B" strokeWidth="4" strokeLinejoin="round">
      <rect x="64" y="84" width="38" height="28" rx="10" transform="rotate(-8 64 84)" fill="#783717" />
      <rect x="132" y="82" width="40" height="28" rx="10" transform="rotate(10 132 82)" fill="#6B3014" />
      <rect x="96" y="70" width="44" height="32" rx="11" fill="#853E1B" />
      <rect x="80" y="94" width="40" height="26" rx="9" transform="rotate(4 80 94)" fill="#6E3215" />
      <rect x="116" y="94" width="42" height="26" rx="9" transform="rotate(-6 116 94)" fill="#7C3A19" />
    </g>

    {/* Spice Dedak Texture Dots & Highlights */}
    <circle cx="108" cy="82" r="3" fill="#B86530" />
    <circle cx="124" cy="86" r="2.5" fill="#D47A3E" />
    <circle cx="94" cy="104" r="3" fill="#B86530" />
    <circle cx="136" cy="104" r="3" fill="#C97036" />
    <circle cx="78" cy="96" r="2.5" fill="#B86530" />
    <circle cx="150" cy="94" r="2.5" fill="#B86530" />

    {/* Red Chili Garnish on Side */}
    <path
      d="M142 126C164 128 188 118 202 100C206 106 198 126 176 134C158 140 144 134 142 126Z"
      fill="#E03C26"
      stroke="#3B1B0B"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path d="M201 102C206 96 212 96 215 100" stroke="#4D8B3C" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const RumahGadangSVG: React.FC<{ className?: string }> = ({ className = 'w-36 h-28' }) => (
  <svg viewBox="0 0 200 145" fill="none" className={className} aria-label="Ilustrasi Rumah Gadang Sumatera Barat">
    {/* Foliage backdrop */}
    <ellipse cx="100" cy="132" rx="88" ry="10" fill="#7BB661" opacity="0.5" />
    {/* Pillars */}
    <rect x="44" y="96" width="112" height="32" fill="#9E5B30" stroke="#4A2511" strokeWidth="3.5" />
    <path d="M62 96V128M88 96V128M112 96V128M138 96V128" stroke="#4A2511" strokeWidth="3.5" />
    {/* Walls with Minang Gold Carving Stripe */}
    <path d="M34 68H166L158 100H42L34 68Z" fill="#C47B46" stroke="#4A2511" strokeWidth="3.5" />
    <rect x="42" y="78" width="116" height="8" fill="#F59E0B" stroke="#4A2511" strokeWidth="2.5" />
    {/* Iconic Curved Gonjong Roofs */}
    <path
      d="M14 20C28 54 54 68 100 68C146 68 172 54 186 20C176 58 168 72 162 74H38C32 72 24 58 14 20Z"
      fill="#6D3919"
      stroke="#3D1C08"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M48 30C60 54 76 64 100 64C124 64 140 54 152 30C144 56 138 68 134 70H66C62 68 56 56 48 30Z"
      fill="#854721"
      stroke="#3D1C08"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Center Entrance Roof Peak */}
    <path d="M84 54L100 32L116 54L112 98H88L84 54Z" fill="#A65A2A" stroke="#3D1C08" strokeWidth="3.5" />
    <rect x="93" y="76" width="14" height="22" rx="3" fill="#4A2511" />
  </svg>
);

export const IngredientIllustrationSVG: React.FC<{ id: string; className?: string }> = ({
  id,
  className = 'w-16 h-16'
}) => {
  switch (id) {
    case 'daging-sapi':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path d="M18 40L48 22L78 36L76 62L46 76L18 62Z" fill="#D9483B" stroke="#4A2511" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M18 40L46 54L78 36" stroke="#F7C6C0" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M46 54V76" stroke="#F7C6C0" strokeWidth="3.5" />
          <path d="M32 36C40 40 52 36 60 40" stroke="#F7C6C0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'santan':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path d="M18 48C18 68 32 78 48 78C64 78 78 68 78 48H18Z" fill="#7A421D" stroke="#4A2511" strokeWidth="3.5" />
          <ellipse cx="48" cy="48" rx="30" ry="12" fill="#FFFDF9" stroke="#4A2511" strokeWidth="3.5" />
          <ellipse cx="48" cy="48" rx="22" ry="7" fill="#F2EAD8" />
          <path d="M62 28C70 24 76 30 72 38" stroke="#559646" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'cabai-merah':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path d="M24 68C44 72 66 56 72 30C62 28 54 44 38 52C28 57 20 62 24 68Z" fill="#E53924" stroke="#4A2511" strokeWidth="3.5" />
          <path d="M22 52C38 56 54 44 60 24C52 24 44 36 32 42C24 46 18 48 22 52Z" fill="#F2523D" stroke="#4A2511" strokeWidth="3" />
          <path d="M72 30C74 22 80 18 84 20M60 24C62 16 68 14 72 16" stroke="#4D8B3C" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'bawang-merah':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path d="M36 30C24 42 20 64 36 72C52 64 48 42 36 30Z" fill="#AD3B6D" stroke="#4A2511" strokeWidth="3.5" />
          <path d="M58 34C46 46 44 66 58 74C72 66 70 46 58 34Z" fill="#C44D82" stroke="#4A2511" strokeWidth="3.5" />
          <path d="M36 42V66M58 46V68" stroke="#E598B8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'bawang-putih':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path d="M48 22C36 36 22 46 24 62C26 74 38 76 48 74C58 76 70 74 72 62C74 46 60 36 48 22Z" fill="#FFFDF7" stroke="#4A2511" strokeWidth="3.5" />
          <path d="M48 26C40 42 38 58 42 74M48 26C56 42 58 58 54 74" stroke="#D9CBB5" strokeWidth="2.5" />
        </svg>
      );
    case 'jahe':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path
            d="M24 56C18 48 24 36 34 38C38 26 52 26 56 36C68 32 76 42 72 52C78 62 68 72 56 68C46 74 30 68 24 56Z"
            fill="#DFA861"
            stroke="#4A2511"
            strokeWidth="3.5"
          />
          <circle cx="64" cy="48" r="6" fill="#F7D794" stroke="#4A2511" strokeWidth="2.5" />
          <path d="M34 48H46M38 58H50" stroke="#A67132" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'lengkuas':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path
            d="M22 54C18 42 28 32 40 36C46 26 62 28 64 40C76 42 78 56 68 64C56 72 30 68 22 54Z"
            fill="#C97A4B"
            stroke="#4A2511"
            strokeWidth="3.5"
          />
          <path d="M32 38C36 48 34 56 30 62M48 34C52 46 50 58 46 66M62 40C64 48 62 56 58 62" stroke="#8C4922" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'serai':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path d="M24 72L68 24" stroke="#78A852" strokeWidth="10" strokeLinecap="round" />
          <path d="M24 72L42 52" stroke="#DCE8B5" strokeWidth="11" strokeLinecap="round" />
          <path d="M24 72L68 24" stroke="#4A2511" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 76L76 28" stroke="#62943E" strokeWidth="8" strokeLinecap="round" />
          <path d="M32 76L48 58" stroke="#E8F0C8" strokeWidth="9" strokeLinecap="round" />
        </svg>
      );
    case 'daun-jeruk':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          {/* Iconic double figure-8 kaffir lime leaf */}
          <path
            d="M48 18C32 20 26 36 38 46C24 54 28 74 48 78C68 74 72 54 58 46C70 36 64 20 48 18Z"
            fill="#569E45"
            stroke="#4A2511"
            strokeWidth="3.5"
          />
          <path d="M48 22V76" stroke="#A6D98A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'daun-kunyit':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          {/* Long broad lance turmeric leaf with knot */}
          <path
            d="M20 74C24 44 46 22 76 20C74 50 52 72 20 74Z"
            fill="#6EB352"
            stroke="#4A2511"
            strokeWidth="3.5"
          />
          <path d="M22 72L72 22" stroke="#B7E398" strokeWidth="3" strokeLinecap="round" />
          <circle cx="46" cy="48" r="9" fill="#55943C" stroke="#4A2511" strokeWidth="3" />
        </svg>
      );
    case 'keju-cheddar':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path d="M18 42L56 24L78 42V68H18V42Z" fill="#FBBF24" stroke="#4A2511" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M18 42H78" stroke="#4A2511" strokeWidth="3" />
          <circle cx="34" cy="56" r="5" fill="#D97706" />
          <circle cx="56" cy="54" r="6" fill="#D97706" />
          <circle cx="46" cy="36" r="4" fill="#F59E0B" />
        </svg>
      );
    case 'saus-tomat':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <rect x="34" y="34" width="28" height="44" rx="8" fill="#E53924" stroke="#4A2511" strokeWidth="3.5" />
          <rect x="40" y="20" width="16" height="14" rx="3" fill="#FFFDF9" stroke="#4A2511" strokeWidth="3.5" />
          <rect x="38" y="48" width="20" height="16" rx="3" fill="#FFFDF9" />
          <circle cx="48" cy="56" r="5" fill="#E53924" />
        </svg>
      );
    case 'wortel':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <path d="M24 72L48 28L68 48L24 72Z" fill="#F97316" stroke="#4A2511" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M58 38L70 22M62 42L78 34" stroke="#569E45" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'cokelat-batang':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <rect x="24" y="22" width="48" height="52" rx="6" fill="#5C2E14" stroke="#3B1B0B" strokeWidth="3.5" />
          <path d="M24 40H72M48 22V56" stroke="#3B1B0B" strokeWidth="3" />
          <rect x="22" y="52" width="52" height="24" rx="4" fill="#F43F5E" stroke="#3B1B0B" strokeWidth="3.5" />
        </svg>
      );
    case 'mayones':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <rect x="30" y="32" width="36" height="44" rx="10" fill="#FEF3C7" stroke="#4A2511" strokeWidth="3.5" />
          <rect x="36" y="20" width="24" height="12" rx="4" fill="#3B82F6" stroke="#4A2511" strokeWidth="3.5" />
          <rect x="34" y="46" width="28" height="16" rx="4" fill="#60A5FA" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className}>
          <rect x="22" y="26" width="52" height="44" rx="8" fill="#FCD34D" stroke="#4A2511" strokeWidth="3.5" />
          <path d="M30 40C36 34 42 46 48 40C54 34 60 46 66 40" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M30 54C36 48 42 60 48 54C54 48 60 60 66 54" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
  }
};

export const CookingPotStageSVG: React.FC<{
  stage: 'cut-meat' | 'grind-spice' | 'saute-spice' | 'pour-coconut' | 'simmer-kalio' | 'final-rendang';
  isAnimating?: boolean;
  className?: string;
}> = ({ stage, isAnimating = false, className = 'w-56 h-44' }) => {
  const fillColors: Record<string, string> = {
    'cut-meat': '#E25B4B',
    'grind-spice': '#D9381E',
    'saute-spice': '#C84B20',
    'pour-coconut': '#F4E5C8',
    'simmer-kalio': '#9C4A1E',
    'final-rendang': '#52240E'
  };

  return (
    <svg viewBox="0 0 240 180" fill="none" className={className} aria-label="Simulasi Kuali Memasak Rendang">
      {/* Aroma Steam */}
      <g className={isAnimating ? 'animate-bounce' : ''}>
        <path d="M84 38C78 26 88 18 82 8" stroke="#D97724" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M120 32C114 20 124 12 118 2" stroke="#D97724" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M156 38C150 26 160 18 154 8" stroke="#D97724" strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Traditional Clay/Stone Stove Base & Fire */}
      <ellipse cx="120" cy="156" rx="76" ry="16" fill="#6D452B" stroke="#3D1C08" strokeWidth="4" />
      {/* Flames */}
      <path
        d="M78 152C76 134 90 126 96 142C102 122 118 118 122 138C130 120 144 126 146 142C154 130 164 138 162 152Z"
        fill="#F59E0B"
        stroke="#B45309"
        strokeWidth="3"
      />
      <path
        d="M92 152C92 140 102 136 108 146C114 132 126 132 130 146C136 138 146 140 148 152Z"
        fill="#FEF08A"
      />

      {/* Wok / Kuali Handles */}
      <path d="M28 84C14 84 14 102 32 104" stroke="#374151" strokeWidth="6" strokeLinecap="round" />
      <path d="M212 84C226 84 226 102 208 104" stroke="#374151" strokeWidth="6" strokeLinecap="round" />

      {/* Kuali Body */}
      <path
        d="M34 78H206C202 122 168 144 120 144C72 144 38 122 34 78Z"
        fill="#4B5563"
        stroke="#1F2937"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Kuali Rim & Food Surface */}
      <ellipse cx="120" cy="78" rx="86" ry="22" fill="#374151" stroke="#1F2937" strokeWidth="4.5" />
      <ellipse cx="120" cy="80" rx="76" ry="17" fill={fillColors[stage]} />

      {/* Beef cubes & spice leaves inside the pot */}
      <rect x="82" y="72" width="22" height="14" rx="5" fill="#702F13" stroke="#3B1B0B" strokeWidth="2.5" />
      <rect x="112" y="74" width="24" height="15" rx="5" fill="#632910" stroke="#3B1B0B" strokeWidth="2.5" />
      <rect x="142" y="71" width="20" height="14" rx="5" fill="#783416" stroke="#3B1B0B" strokeWidth="2.5" />
      <path d="M64 78C72 70 84 72 86 80" fill="#569E45" stroke="#2D5224" strokeWidth="2.5" />
      <path d="M158 82C166 74 178 76 180 84" fill="#569E45" stroke="#2D5224" strokeWidth="2.5" />

      {/* Wooden Spatula Stirring */}
      <path d="M126 78L164 26" stroke="#C87D3B" strokeWidth="9" strokeLinecap="round" />
      <path d="M126 78L164 26" stroke="#4A2511" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};

export const BadgeAwardSVG: React.FC<{
  tier: 'gold' | 'silver' | 'bronze' | 'starter';
  className?: string;
}> = ({ tier, className = 'w-28 h-28' }) => {
  const palette = {
    gold: { main: '#FBBF24', inner: '#F59E0B', ribbon: '#DC2626' },
    silver: { main: '#E2E8F0', inner: '#94A3B8', ribbon: '#2563EB' },
    bronze: { main: '#FDBA74', inner: '#D97706', ribbon: '#16A34A' },
    starter: { main: '#FDE68A', inner: '#CA8A04', ribbon: '#9333EA' }
  }[tier];

  return (
    <svg viewBox="0 0 120 128" fill="none" className={className} aria-label="Lencana Penghargaan Rendang Quest">
      {/* Ribbons */}
      <path d="M38 78L24 118L44 108L54 120L60 84" fill={palette.ribbon} stroke="#4A2511" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M82 78L96 118L76 108L66 120L60 84" fill={palette.ribbon} stroke="#4A2511" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Medal Starburst */}
      <circle cx="60" cy="52" r="38" fill={palette.main} stroke="#4A2511" strokeWidth="4" />
      <circle cx="60" cy="52" r="29" fill={palette.inner} stroke="#4A2511" strokeWidth="3" />
      {/* Chef Toque + Star inside Medal */}
      <path
        d="M44 48C38 46 38 36 44 34C48 26 58 24 60 28C64 24 72 26 76 34C82 36 82 46 76 48H44Z"
        fill="#FFFDF9"
        stroke="#4A2511"
        strokeWidth="3"
      />
      <rect x="44" y="46" width="32" height="8" rx="3" fill="#FFFDF9" stroke="#4A2511" strokeWidth="3" />
      <path d="M60 58L63 65L70 66L65 71L66 78L60 74L54 78L55 71L50 66L57 65L60 58Z" fill="#FFFBEB" />
    </svg>
  );
};
