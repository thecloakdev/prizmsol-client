const LogoIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={31} height={25} viewBox="0 0 31 25" {...props}>
    <g fill="none" fillRule="evenodd">
      <path fill="#FF0080" d="M12.5 0 25 25H0z" />
      <path fill="#007EFF" d="M18.5 0 31 25H6z" />
      <path
        className="fill-black dark:fill-white"
        d="M15.5 6 25 25H6l9.5-19Z"
      />
    </g>
  </svg>
);
export default LogoIcon;
