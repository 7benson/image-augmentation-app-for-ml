import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
import React,{useState} from "react"
import axios from "axios"
import config from "../../config"
import userActions from "../_actions/userActions";
import { Button } from "@material-ui/core";

 const theme = {
    // "common.bi.image":
    //   "https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg",
    "common.bisize.width": "50px",
    "common.bisize.height": "50px",
    "common.backgroundImage": "none",
    "common.backgroundColor": "#1e1e1e",
    "common.border": "0px",
  
    // header
    "header.backgroundImage": "none",
    "header.backgroundColor": "transparent",
    "header.border": "0px",
  
    // load button
    "loadButton.backgroundColor": "#fff",
    "loadButton.border": "1px solid #ddd",
    "loadButton.color": "#222",
    "loadButton.fontFamily": "NotoSans, sans-serif",
    "loadButton.fontSize": "12px",
  
    // download button
    "downloadButton.backgroundColor": "#fdba3b",
    "downloadButton.border": "1px solid #fdba3b",
    "downloadButton.color": "#fff",
    "downloadButton.fontFamily": "NotoSans, sans-serif",
    "downloadButton.fontSize": "12px",
  
    // icons default
    "menu.normalIcon.color": "#8a8a8a",
    "menu.activeIcon.color": "#555555",
    "menu.disabledIcon.color": "#434343",
    "menu.hoverIcon.color": "#e9e9e9",
    "submenu.normalIcon.color": "#8a8a8a",
    "submenu.activeIcon.color": "#e9e9e9",
  
    "menu.iconSize.width": "24px",
    "menu.iconSize.height": "24px",
    "submenu.iconSize.width": "32px",
    "submenu.iconSize.height": "32px",
  
    // submenu primary color
    "submenu.backgroundColor": "#1e1e1e",
    "submenu.partition.color": "#858585",
  
    // submenu labels
    "submenu.normalLabel.color": "#858585",
    "submenu.normalLabel.fontWeight": "lighter",
    "submenu.activeLabel.color": "#fff",
    "submenu.activeLabel.fontWeight": "lighter",
  
    // checkbox style
    "checkbox.border": "1px solid #ccc",
    "checkbox.backgroundColor": "#fff",
  
    // rango style
    "range.pointer.color": "#fff",
    "range.bar.color": "#666",
    "range.subbar.color": "#d1d1d1",
  
    "range.disabledPointer.color": "#414141",
    "range.disabledBar.color": "#282828",
    "range.disabledSubbar.color": "#414141",
  
    "range.value.color": "#fff",
    "range.value.fontWeight": "lighter",
    "range.value.fontSize": "11px",
    "range.value.border": "1px solid #353535",
    "range.value.backgroundColor": "#151515",
    "range.title.color": "#fff",
    "range.title.fontWeight": "lighter",
  
    // colorpicker style
    "colorpicker.button.border": "1px solid #1e1e1e",
    "colorpicker.title.color": "#fff",
  };
  
const CustomImageEditor = () => {
  const [imageSrc, setImageSrc] = useState("data:image/png;base64,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");
  const imageEditor = React.createRef();

  const onFileUpload = async () => {
    // await userActions.uploadFile(imageSrc)
    console.log({imageSrc})
  };

  const saveImageToDisk = () => {

    const imageEditorInst = imageEditor.current.imageEditorInst;
    console.log({imageEditorInst})
    const data = imageEditorInst.toDataURL();
    console.log({data})
    if (data) {
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      // download(data, `image.${extension}`, mimeType);
    }
  };
  return (
    // <div>
  <div
    style={{
      width: "99vw",
      maxWidth:"100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000",
    }}
  >
    <div
      style={{
        margin:"auto"
      }}
    >
      <Button
      color="secondary"
      className='button' onClick={saveImageToDisk}>Post edited pic to backend</Button>
    </div>

    <ImageEditor
     style={{
      margin:"auto"
    }}
      includeUI={{
        loadImage: {
          path: imageSrc,
          name: "image",
        },
        theme,
        menu: ["shape", "filter", "text", 'mask', 'icon', 'draw', 'crop', 'flip', 'rotate'],
        initMenu: "crop",
        uiSize: {
          width: "1000px",
          height: "700px",
        },
        menuBarPosition: "left",
      }}
      cssMaxHeight={window.innerHeight}
      cssMaxWidth={window.innerWidth}
      selectionStyle={{
        cornerSize: 20,
        rotatingPointOffset: 70,
      }}
      usageStatistics={true}
      ref={imageEditor}
    />
  </div>

  );
};

export default CustomImageEditor;
