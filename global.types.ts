declare global {
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

  type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
}

// declare global {}

// if (import.meta.hot) {
//   useStore.subscribe((state) => {
//     if (typeof window !== "undefined") {
//       window.__store = state;
//     }
//   });

//   import.meta.hot!.accept((newModule) => {
//     if (!newModule) return;

//     const newStore = newModule.useStore;

//     if (!newStore) return;

//     if (window.__store) {
//       newStore.setState(window.__store, true);
//     }
//   });
// }

export {};
