import { useEffect, useRef } from "react";

function useTimeout(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setTimeout(tick, delay);

      //cleaning function set for the future (autoexecuted when "delay" change)
      return () => {
        clearTimeout(id);
      };
    }
  }, [delay]);
}

export default useTimeout;