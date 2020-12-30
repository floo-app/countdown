import Head from 'next/head'
import { useWindowSize } from '../hooks/use-windows-size'
import { Shaders, Node, GLSL } from 'gl-react'
import { Surface } from 'gl-react-dom'
import { useEffect, useRef, useState } from 'react'

const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`

precision highp float;

varying vec2 uv;
uniform float time;

void main() {
  gl_FragColor = vec4(vec3(clamp(cos(time / 2.0), 0.1, 1.0) * cos(uv.xy), mix(0.5, 1.0, time)), 1.0);
}`

  }});

export default function Home() {
  const size = useWindowSize()
  const blue = 0.5

  const [counter, setCounter] = useState(0)
  const counterRef = useRef()

  const animate = time => {
    setCounter((1 + Math.cos(time / 1000)) / 2);
    counterRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    counterRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(counterRef.current)
  }, []);


  return (
    <div>
      <Head>
        <title>Countdown</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      
      <Surface width={size.width || 0} height={size.height || 0}>
        <Node shader={shaders.helloBlue} uniforms={{
          
          time: counter}} />
      </Surface>
      </main>
      <style jsx global>{`
          * {
            box-sizing: border-box;
          }
          html, body {
            padding: 0;
            margin: 0;
          }
      `}  
      </style>
      </div>
  )
}
