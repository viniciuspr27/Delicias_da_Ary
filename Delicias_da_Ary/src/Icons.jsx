export function Icon({ name, size = 22, ...props }) {
  const paths = {
    arrow: (
      <>
        <path d="M4 12h15M13 6l6 6-6 6" />
      </>
    ),
    diagonal: (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    down: (
      <>
        <path d="M12 4v16M6 14l6 6 6-6" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    star: <path d="m12 2 2.8 6.6 7.2.6-5.5 4.8 1.7 7-6.2-3.7L5.8 21l1.7-7L2 9.2l7.2-.6Z" />,
    spark: (
      <>
        <path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2Z" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M6 18 18 6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    plus: <path d="M5 12h14M12 5v14" />,
    minus: <path d="M5 12h14" />,
    left: <path d="m14 5-7 7 7 7" />,
    right: <path d="m10 5 7 7-7 7" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.7" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.7Z" />
        <path d="M8 7.7c.5 3.8 2.5 5.7 6.3 6.8l1.3-1.6-2.3-1.1-.9.9a7.5 7.5 0 0 1-2.2-2.4l.8-.8-1-2.2Z" />
      </>
    ),
    cake: (
      <>
        <path d="M4 12h16v9H4zM3 21h18M4 15c2-3 4 3 6 0s4 3 6 0 4 0 4 0M7 12V8h10v4M12 8V4" />
        <path d="M12 4c-2-1-1-3 0-4 2 2 2 3 0 4" />
      </>
    ),
    flower: (
      <>
        <path d="M12 7c-7-10-13 2-5 5-8 3-2 15 5 5 7 10 13-2 5-5 8-3 2-15-5-5Z" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    zoom: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5M7.5 10.5h6M10.5 7.5v6" />
      </>
    ),
    bag: (
      <>
        <path d="M4 7h16l1 14H3L4 7Z" />
        <path d="M8 8V5a4 4 0 0 1 8 0v3" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.7 6.5h.01" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.spark}
    </svg>
  );
}

export function Bow({ className = '' }) {
  return (
    <svg
      className={className}
      width="92"
      height="72"
      viewBox="0 0 92 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M46 31C25-3 3 11 11 27c5 11 25 9 35 4Zm0 0C67-3 89 11 81 27c-5 11-25 9-35 4Z" />
      <path d="M42 33c-3 11-5 21-15 29l12-2 4 8c7-13 6-25 5-34M49 34c7 7 10 17 16 25l-11-4-6 7" />
      <ellipse cx="46" cy="31" rx="5" ry="6" />
    </svg>
  );
}
