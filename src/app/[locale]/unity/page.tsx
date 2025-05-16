"use client";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityPage() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "/WebGL/Build/WebGL.loader.js",
        dataUrl: "/WebGL/Build/webgl.data",
        frameworkUrl: "/WebGL/Build/build.framework.js",
        codeUrl: "/WebGL/Build/build.wasm",
    });
    
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden'
        }}>
            <Unity unityProvider={unityProvider} style={{
                width: '100%',
                height: '100%'
            }} />
        </div>
    );
}

