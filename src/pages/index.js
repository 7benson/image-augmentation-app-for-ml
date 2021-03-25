import dynamic from "next/dynamic";
import $ from "jquery";
import {useEffect} from "react"
import Head from 'next/head';

const ImageEditor = dynamic(
  () => import("../components/image-editor"),
  { ssr: false }
);
const ImagesPoster = dynamic(
  () => import("../components/ImagesPoster"),
  { ssr: false }
);
  
const Home = () => {
      
      useEffect(() => {
        $("body").css("margin",0)
        $("-webkit-scrollbar").css("display","none")
      }, [])

      return(
      <div
        className="home"
        style={{
          maxWidth:"98vw",
          margin:0,
          fontFamily:"'Roboto', sans-serif"
        }}
      >
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Cabin"
            rel="stylesheet"
            key="google-font-cabin"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>
        </Head>
        <ImagesPoster />
        <ImageEditor />
      </div>
)};

export default Home;
