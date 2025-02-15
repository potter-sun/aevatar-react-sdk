import { useAtom } from "jotai";
import PageLoading from "../PageLoading";
import { loadingAtom } from "../../state/atoms";
import { Button } from "../ui/button";

export interface IMyGAevatarProps {
  height?: number | string;
  width?: number | string;
}

export default function MyGAevatar({
  height = "100vh",
  width,
}: IMyGAevatarProps) {
  const [, setShow] = useAtom(loadingAtom);

  return (
    <div className="relative" style={{ height, width }}>
      <Button type="button" onClick={() => setShow((v) => !v)}>
        setShow
      </Button>
      <PageLoading />
    </div>
  );
}
