import Loading from "../../assets/svg/loading.svg?react";
import "./index.css";

export default function CardLoading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Loading className="aevatar-loading-icon" />
    </div>
  );
}
