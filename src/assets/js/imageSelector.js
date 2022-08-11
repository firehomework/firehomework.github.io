const IMGinit = (elementCSSSelector) => {
  const shadow_style = {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
    display: "none",
  };

  const dialog_style = {
    position: "relative",
    display: "inline-block",
    width: "auto",
    height: "auto",
    maxHeight: "100%",
    maxWidth: "100%",
    verticalAlign: "middle",
  };

  const button_style = {
    position: "fixed",
    zIndex: 20,
    top: "49%",
    opacity: "0.5",
    cursor: "pointer",
  };

  const leftButton = document.createElement("div");

  const rightButton = document.createElement("div");

  leftButton.innerHTML =
    '<svg width="44" height="60"><polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4" stroke-linecap="butt" fill="none" stroke-linejoin="round"></polyline></svg>';

  rightButton.innerHTML =
    '<svg width="44" height="60"><polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4" stroke-linecap="butt" fill="none" stroke-linejoin="round"></polyline></svg>';

  setStyle(leftButton, button_style);
  setStyle(rightButton, button_style);

  leftButton.style.left = "10px";
  rightButton.style.right = "10px";

  const mydialog = document.createElement("img");

  const mydialog_shadow = document.createElement("div");

  setStyle(mydialog_shadow, shadow_style);

  setStyle(mydialog, dialog_style);

  mydialog_shadow.onclick = (e) => {
    if (e.target === mydialog_shadow) dialogProxy.show = false;
  };

  leftButton.onclick = () => {
    if (imgProxy.srcIndex > 0) {
      imgProxy.srcIndex--;
    } else {
      alert("这已经是第一张了，往后面翻翻看吧");
    }
  };

  rightButton.onclick = () => {
    if (imgProxy.srcIndex < srcArr.length - 1) {
      imgProxy.srcIndex++;
    } else {
      alert("这已经是最后一张了，往前面翻翻看吧");
    }
  };

  mydialog_shadow.append(mydialog);

  mydialog_shadow.append(leftButton);
  mydialog_shadow.append(rightButton);

  const dialogProxy = new Proxy(
    { show: false },
    {
      set(target, prop, res) {
        mydialog_shadow.style.display = res ? "flex" : "none";
        return Reflect.set(...arguments);
      },
    }
  );

  const imgProxy = new Proxy(
    { srcIndex: 0 },
    {
      set(target, prop, res) {
        mydialog.src = srcArr[res];
        return Reflect.set(...arguments);
      },
    }
  );
  let arr;
  if(elementCSSSelector){
    arr = [...document.querySelectorAll(elementCSSSelector)]
  } else {
    arr = [...document.getElementsByTagName("img")];
  }
  const srcArr = [];

  const mybody = document.querySelector("body");

  mybody.append(mydialog_shadow);

  for (let i = 0; i < arr.length; i++) {
    srcArr[i] = arr[i].src;
    arr[i].onclick = function () {
      dialogProxy.show = true;
      imgProxy.srcIndex = i;
    };
  }

  function setStyle(element, style) {
    for (const key in style) {
      element.style[key] = style[key];
    }
  }
}
