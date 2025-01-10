import { SVGProps } from "react";

export interface SafariProps extends SVGProps<SVGSVGElement> {
  url?: string;
  imageSrc?: string;
  videoSrc?: string;
  width?: number;
  height?: number;
}

export default function Safari({
  imageSrc,
  videoSrc,
  url,
  width = 1203,
  height = 753,
  ...props
}: SafariProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#path0)">
        {/* Fundo preto completo */}
        <rect x="0" y="0" width={width} height={height} fill="#000000" />
        <path
          d="M0 52H1202V741C1202 747.627 1196.63 753 1190 753H12C5.37258 0 741V52Z"
          className="fill-[#404040]"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 12C0 5.37258 0 12 0H1190C1196.63 1202 12V52H0L0 12Z"
          className="fill-[#404040]"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.06738 12C1.06738 5.92487 5.99225 1 12.0674 1H1189.93C1196.01 1200.93 12V51H1.06738V12Z"
          className="fill-[#262626]"
        />
        <circle cx="27" cy="25" r="6" className="fill-[#FF5F57]" />
        <circle cx="47" cy="25" r="6" className="fill-[#FFBC2E]" />
        <circle cx="67" cy="25" r="6" className="fill-[#28C840]" />
        <path
          d="M286 17C286 13.6863 288.686 11 292 11H946C949.314 952 17V35C952 38.3137 949.314 41 946 41H292C288.686 286 35V17Z"
          className="fill-[#404040]"
        />
        <g className="mix-blend-luminosity">
          <text
            x="580"
            y="30"
            fill="#A3A3A3"
            fontSize="12"
            fontFamily="Inter, Arial, sans-serif"
          >
            {url}
          </text>
        </g>
        {/* Conteúdo dinâmico: vídeo ou imagem */}
        {videoSrc ? (
          <foreignObject x="0" y="52" width={width} height={height - 52}>
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </foreignObject>
        ) : imageSrc ? (
          <foreignObject x="0" y="52" width={width} height={height - 52}>
            <img
              src={imageSrc}
              alt="Safari preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </foreignObject>
        ) : null}
      </g>
      <defs>
        <clipPath id="path0">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
