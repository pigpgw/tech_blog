export const ConnectionArtwork = () => (
  <div>
    <div className="hero-art">
      <div className="art-top">
        <span>FIG. 01 · CONNECTING THE DOTS</span>
        <span>FIELD NOTES</span>
      </div>
      <span className="cross one" aria-hidden="true" />
      <span className="cross two" aria-hidden="true" />
      <svg viewBox="0 0 400 260" fill="none" aria-hidden="true">
        <defs>
          <pattern
            id="connection-dots"
            width="19"
            height="19"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".7" fill="currentColor" opacity=".16" />
          </pattern>
        </defs>
        <path fill="url(#connection-dots)" d="M0 0h400v260H0z" />
        <g stroke="currentColor" strokeWidth=".9" opacity=".55">
          <ellipse
            cx="203"
            cy="131"
            rx="112"
            ry="91"
            transform="rotate(-28 203 131)"
          />
          <ellipse
            cx="203"
            cy="131"
            rx="112"
            ry="48"
            transform="rotate(-28 203 131)"
          />
          <ellipse
            cx="203"
            cy="131"
            rx="46"
            ry="95"
            transform="rotate(-28 203 131)"
          />
          <ellipse
            cx="203"
            cy="131"
            rx="78"
            ry="95"
            transform="rotate(-28 203 131)"
          />
          <path
            d="m108 184 192-104M145 43l113 175M97 121l181-42M129 195l179-69"
            opacity=".7"
          />
        </g>
        <g fill="var(--art-surface)" stroke="currentColor">
          <circle cx="130" cy="70" r="5" />
          <circle cx="278" cy="173" r="5" />
          <circle cx="173" cy="219" r="5" />
        </g>
        <circle cx="295" cy="77" r="21" fill="var(--brand)" />
        <circle cx="295" cy="77" r="28" stroke="var(--brand)" opacity=".3" />
        <circle cx="203" cy="131" r="3" fill="currentColor" />
        <path
          d="M67 221h70M302 39h40M70 62h40"
          stroke="currentColor"
          opacity=".4"
          strokeDasharray="2 4"
        />
        <text
          x="32"
          y="226"
          fill="currentColor"
          fontSize="8"
          fontFamily="monospace"
        >
          INPUT
        </text>
        <text
          x="313"
          y="29"
          fill="currentColor"
          fontSize="8"
          fontFamily="monospace"
        >
          INSIGHT
        </text>
      </svg>
      <div className="art-bottom">
        <span>QUESTION → EXPERIMENT → UNDERSTANDING</span>
        <span className="serif">Everything connects.</span>
      </div>
    </div>
    <p className="hero-caption">
      작은 질문들이 연결되어, 나만의 이해가 되는 과정.
    </p>
  </div>
);
