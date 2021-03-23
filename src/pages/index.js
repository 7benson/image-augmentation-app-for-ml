import dynamic from "next/dynamic";
import $ from "jquery";
import {useEffect} from "react"

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
  }, [])
  return(
  <div
  className="home"
  style={{
    maxWidth:"98vw",
    margin:0
  }}
  >
    <ImagesPoster />
    <ImageEditor />
  </div>
)};

export default Home;
