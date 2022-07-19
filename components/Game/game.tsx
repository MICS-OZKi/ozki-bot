import { Fullscreen } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import LinearProgressWithLabel from "./progressBar";

interface GameProps {
  // isUnmount: boolean;
}

function Game(props: GameProps) {
  const {
    loadingProgression,
    unityProvider,
    isLoaded,
    requestFullscreen,
    unload,
  } = useUnityContext({
    loaderUrl: "webgl/Build/webgl.loader.js",
    dataUrl: "webgl/Build/webgl.data",
    frameworkUrl: "webgl/Build/webgl.framework.js",
    codeUrl: "webgl/Build/webgl.wasm",
  });

  const loadingPercentage = Math.round(loadingProgression * 100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  window.unityWebgl = {
    unmount: unload,
    isLoaded: isLoaded,
  };

  return (
    <div className="container">
	<h1> </h1>
      {isLoaded === false && (
        <div className="loading-overlay">
          <LinearProgressWithLabel value={loadingPercentage} />
        </div>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{
          border: "1px solid black",
          height: 768,
          width: 1024,
        }}
        ref={canvasRef}
      />
      <Grid container spacing={1} justifyContent="right">
        <Grid item>
          <Button
            variant="text"
            color="primary"
            aria-label="Fullscreen"
            component="span"
            size="large"
            sx={{
              fontWeight: "bold",
            }}
            onClick={() => {
              requestFullscreen(true);
            }}
            endIcon={<Fullscreen fontSize="large" />}
          >
            Fullscreen
          </Button>
        </Grid>
      </Grid>
      {/* <p>
        Actions
        <button onClick={() => unload()}>Unload</button>
      </p> */}
    </div>
  );
}

export default Game;
