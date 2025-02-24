import ReactLoading from "react-loading";
import { useAtom } from "jotai";
import { loadingAtom } from "../../state/atoms";

export default function PageLoading() {
  const [show] = useAtom(loadingAtom);
  if (!show) return null;
  return (
    <div
      data-testid="page-loading"
      className="flex items-center justify-center w-full h-full bg-black absolute top-0 left-0 z-50">
      <div className="flex text-2xl font-bold text-gray-800 flex items-center">
        <div className="text-white font-syne text-lg font-semibold leading-normal lowercase">
          Scanning......
        </div>
        <ReactLoading type="bars" color="rgba(255, 255, 255, 0.20)" />
      </div>
    </div>
  );
}
