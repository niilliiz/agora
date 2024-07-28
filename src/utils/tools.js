import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export const useIsomorphicLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect;

export function isPromise(value) {
  return value != null && typeof value.then === "function";
}

export function useAwaited(promise) {
  const sp = useSafePromise();
  const [value, setValue] = useState();

  useIsomorphicLayoutEffect(() => {
    if (isPromise(promise)) {
      sp(promise).then(setValue);
    } else {
      setValue(promise);
    }
  }, [promise, sp]);

  return value;
}

export function useIsUnmounted() {
  const isUnmountRef = useRef(false);
  useEffect(() => {
    isUnmountRef.current = false;
    return () => {
      isUnmountRef.current = true;
    };
  }, []);
  return isUnmountRef;
}

export function useSafePromise() {
  const isUnmountRef = useIsUnmounted();

  function safePromise(promise, onUnmountedError) {
    // the async promise executor is intended
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const result = await promise;
        if (!isUnmountRef.current) {
          resolve(result);
        }
        // unresolved promises will be garbage collected.
      } catch (error) {
        if (!isUnmountRef.current) {
          reject(error);
        } else if (onUnmountedError) {
          onUnmountedError(error);
        } else {
          if (process.env.NODE_ENV === "development") {
            console.error("An error occurs from a promise after a component is unmounted", error);
          }
        }
      }
    });
  }

  return useCallback(safePromise, [isUnmountRef]);
}
