import Logo from "../../assets/react.svg?react";
export default function MyButton() {
  return (
    <div>
      Button
      {/* @ts-expect-error - Logo is a valid React component */}
      <Logo width={100} height={100} fill="red" />
    </div>
  );
}
