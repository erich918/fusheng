export function BodhiLeaf({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 4C24 4 8 14 8 28c0 9 7 16 16 16s16-7 16-16C40 14 24 4 24 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M24 10v30"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M24 18c-3 1.5-6 4-7.5 7M24 18c3 1.5 6 4 7.5 7M24 27c-2.5 1.2-5 3-6 5.5M24 27c2.5 1.2 5 3 6 5.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
