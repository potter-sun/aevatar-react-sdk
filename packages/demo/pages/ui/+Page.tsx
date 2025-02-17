import { MyGAevatar } from "@aevatar-react-sdk/ui-react";
import "@aevatar-react-sdk/ui-react/ui-react.css";
import { useCallback } from "react";

export default function UI() {
  const onNewGAevatar = useCallback(() => {
    console.log("onNewGAevatar");
  }, []);
  return (
    <div>
      <div className="text-[12px] lg:text-[24px]">aad</div>

      <MyGAevatar height={600} onNewGAevatar={onNewGAevatar} />
    </div>
  );
}
