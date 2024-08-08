type IconProps = {
  size?: number;
  stroke?: number;
  className?: string;
};

export const IconSearch = ({
  size = 16,
  stroke = 2,
  className = "",
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={stroke}
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6" />
  </svg>
);

export const IconChevronDown = ({
  size = 16,
  stroke = 2,
  className = "",
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={stroke}
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconX = ({ size = 16, stroke = 2, className = "" }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={stroke}
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const IconCheck = ({
  size = 16,
  stroke = 2,
  className = "",
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={stroke}
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m5 12 5 5L20 7" />
  </svg>
);
