export const PostArtwork = () => (
  <div className="mini-art" aria-hidden="true">
    <svg viewBox="0 0 160 160" fill="none">
      <path d="m80 25 54 28-54 28-54-28z" stroke="currentColor" />
      <path
        d="m26 70 54 28 54-28M26 87l54 28 54-28M26 104l54 28 54-28"
        stroke="currentColor"
        opacity=".6"
      />
      <path
        d="M80 81v51M26 53v51M134 53v51"
        stroke="currentColor"
        opacity=".6"
        strokeDasharray="3 4"
      />
      <circle cx="80" cy="53" r="12" fill="currentColor" />
      <circle cx="80" cy="53" r="4" fill="var(--deep)" />
    </svg>
  </div>
);
