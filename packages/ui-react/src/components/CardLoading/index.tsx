import Loading from "../../assets/svg/loading.svg?react";
import "./index.css";

export default function CardLoading() {
  return (
    <div
      data-testid="card-loading"
      className="sdk:flex sdk:justify-center sdk:items-center sdk:h-full">
      <Loading className="aevatarai-loading-icon" />
    </div>
  );
}
