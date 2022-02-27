import * as React from "react";
import LifeCanvas from "@features/life";
import CtrlPanel from "@features/ctrlPanel";

export default () => {

  return (<>
    <CtrlPanel />

    <LifeCanvas />
  </>)
}
