/// <reference types="react-scripts" />

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.css' {
    const src: string
    export default src
}

declare module '*.scss' {
    const src: string
    export default src
}

declare module '*.png' {
    const src: string
    export default src
}

declare module '*.jpg' {
    const src: string
    export default src
}

declare module '*.mp3' {
    const src: string
    export default src
}

declare module '*.mp4' {
    const src: string
    export default src
}