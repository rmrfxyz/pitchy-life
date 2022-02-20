import React from 'react';
import { useWasm, useLoadedWasm, WASM_READY_STATE } from './useWasm';
import Canvas from "./components/Canvas";
// import { setupAudio } from "./pitch/setupAudio";


// const TestComponent = () => {
//   const { wasm, readyState } = useLoadedWasm();

//   return (
//     <div>
//       <button onClick={wasm.greet}>Click</button>
//     </div>
//   );
// };

// function PitchReadout({ running, latestPitch }) {
//   return (
//     <div className="Pitch-readout">
//       {latestPitch
//         ? `Latest pitch: ${latestPitch.toFixed(1)} Hz`
//         : running
//         ? "Listening..."
//         : "Paused"}
//     </div>
//   );
// }

// function AudioRecorderControl() {
//   const [audio, setAudio] = React.useState(undefined);
//   const [running, setRunning] = React.useState(false);
//   const [latestPitch, setLatestPitch] = React.useState(undefined);

//   const { wasm, readyState } = useLoadedWasm();

//   console.log('wasm:')
//   console.dir(wasm)
//   console.log('readyState:')
//   console.dir(readyState)
//   console.log()

//   // Initial state. Initialize the web audio once a user gesture on the page
//   // has been registered.
//   if (!audio) {
//     return (
//       <button
//         onClick={async () => {
//           setAudio(await setupAudio(setLatestPitch));
//           setRunning(true);
//         }}
//       >
//         Start listening
//       </button>
//     );
//   }

//   // Audio already initialized. Suspend / resume based on its current state.
//   const { context } = audio;
//   return (
//     <div>
//       <button
//         onClick={async () => {
//           if (running) {
//             await context.suspend();
//             setRunning(context.state === "running");
//           } else {
//             await context.resume();
//             setRunning(context.state === "running");
//           }
//         }}
//         disabled={context.state !== "running" && context.state !== "suspended"}
//       >
//         {running ? "Pause" : "Resume"}
//       </button>
//       <PitchReadout running={running} latestPitch={latestPitch} />
//     </div>
//   );
// }


const App = () => {
  const [WasmProvider, wasmObject] = useWasm();

  return (
    <WasmProvider value={wasmObject}>
      <div id="App">
        {wasmObject.readyState === WASM_READY_STATE.READY && <TestComponent/>}

        <header className="App-header">
          Wasm Audio Tutorial
        </header>
        
        <div className="App-content">
          {/* <AudioRecorderControl /> */}
        </div>

        <Canvas />

      </div>
    </WasmProvider>
  );
};

export default App;
