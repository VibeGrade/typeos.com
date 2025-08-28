export function YC() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600">Backed by</span>
      <span className="flex items-center gap-1">
        <svg className="grayscale" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_24_57)">
            <rect fill="#FF5100" height="24" rx="5.4" width="24" />
            <rect height="23" rx="4.9" stroke="#FF844B" width="23" x="0.5" y="0.5" />
            <path d="M7.54102 7.31818H9.28604L11.9458 11.9467H12.0552L14.715 7.31818H16.46L12.7662 13.5028V17.5H11.2349V13.5028L7.54102 7.31818Z" fill="white" />
          </g>
          <rect height="23" rx="4.9" stroke="#FF5100" strokeOpacity="0.1" width="23" x="0.5" y="0.5" />
          <rect height="23" rx="4.9" stroke="url(#paint0_radial_24_57)" width="23" x="0.5" y="0.5" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(7.35) rotate(58.475) scale(34.1384)" gradientUnits="userSpaceOnUse" id="paint0_radial_24_57" r="1">
              <stop stopColor="white" stopOpacity="0.56" />
              <stop offset="0.28125" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <clipPath id="clip0_24_57"><rect fill="white" height="24" rx="5.4" width="24" /></clipPath>
          </defs>
        </svg>
        <span className="text-sm font-medium bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">Combinator</span>
      </span>
    </div>
  );
}
