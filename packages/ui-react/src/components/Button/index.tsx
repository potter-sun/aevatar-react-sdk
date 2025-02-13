import Logo from "../../assets/react.svg?react";
import "../../index.css";

export default function MyButton() {
  return (
    <div className="sdk:text-red-500">
      Button
      <Logo width={100} height={100} fill="red" />
    </div>
  );
}
