const $ = (x) => document.getElementById(x);
const dialogueElement = $("dialogue");
const togglePowerMenuBtn = $("toggle_power_menu");
const powerMenuElement = $("power_menu");
const toggleTaskViewElement = $("toggle_task_view");
const taskViewElement = $("task_view");
const taskViewTaskElements = Array.from(
  taskViewElement.getElementsByClassName("task_view__task"),
);
const taskViewContextElement = $("task_view_context");
const shutdownBtn = $("shutdown");
const toggleBrightnessBtn = $("toggle_brightness");
const themeBtn = $("theme");
const fileElements = Array.from(
  $("file_grid").getElementsByClassName("file_grid__item"),
);
const wifiListElement = $("wifi_list");
const toggleWifiListBtn = $("toggle_wifi_list");
const bluetoothListElement = $("bluetooth_list");
const toggleBluetoothListBtn = $("toggle_bluetooth_list");
const volumeElement = $("volume");
const toggleVolumeBtn = $("toggle_volume");
const calendarElement = $("calendar");
const toggleCalendarBtn = $("toggle_calendar");
const searchElement = $("search");
const toggleSearchBtn = $("toggle_search");
const notificationsElement = $("notifications");
const toggleNotificationsBtn = $("toggle_notifications");

let powerMenuActive = false;
let taskViewActive = false;
let dialogueActive = false;
let wifiListActive = false;
let bluetoothListActive = false;
let volumeActive = false;
let calendarActive = false;
let searchActive = false;
let notificationsActive = false;
let darkMode = true;

togglePowerMenuBtn.onclick = () => {
  window.addEventListener("click", closePowerMenu);
};

function closePowerMenu() {
  if (powerMenuActive) {
    powerMenuActive = false;
    powerMenuElement.classList.remove("active");
    window.removeEventListener("click", closePowerMenu);
  } else {
    powerMenuActive = true;
    powerMenuElement.classList.add("active");
  }
}

toggleTaskViewElement.onclick = () => {
  window.addEventListener("click", closeTaskView);
};

function closeTaskView() {
  if (taskViewActive) {
    taskViewActive = false;
    taskViewElement.classList.remove("active");
    taskViewContextElement.classList.remove("active");
    window.removeEventListener("click", closeTaskView);
  } else {
    taskViewActive = true;
    taskViewElement.classList.add("active");
  }
}

taskViewTaskElements.forEach((element) => {
  element.oncontextmenu = (e) => {
    e.preventDefault();
    taskViewContextElement.classList.add("active");
    taskViewContextElement.style.top = `${e.clientY}px`;
    taskViewContextElement.style.left = `${e.clientX}px`;
  };
});

shutdownBtn.onclick = () => {
  window.addEventListener("click", closeDialogue);
};

function closeDialogue() {
  if (dialogueActive) {
    dialogueActive = false;
    dialogueElement.classList.remove("active");
    window.removeEventListener("click", closeDialogue);
  } else {
    dialogueActive = true;
    dialogueElement.classList.add("active");
  }
}

toggleBrightnessBtn.onclick = () => {
  const $i = toggleBrightnessBtn.childNodes[1];
  if (darkMode) {
    darkMode = false;
    $i.innerText = "wb_sunny";
    themeBtn.href = "./css/themes/light.css";
    document.body.classList.add("light");
  } else {
    darkMode = true;
    $i.innerText = "brightness_2";
    themeBtn.href = "";
    document.body.classList.remove("light");
  }
};

let fileDragging = false;
let fileClone;
let fileGrabbed;

fileElements.forEach((element) => {
  element.onmousedown = (e) => {
    console.log("grabbed file");
    element.classList.add("grabbed");
    fileGrabbed = element;
    window.addEventListener("mousemove", fileDrag);
    window.addEventListener("mouseup", fileRelease);
    fileClone = element.cloneNode(true);
    fileClone.classList.add("clone");
    fileClone.style.top = 0;
    fileClone.style.left = 0;
    fileClone.style.transform = `translate(${e.clientX - 10}px, ${
      e.clientY - 10
    }px)`;
    document.body.appendChild(fileClone);
  };
});

function fileDrag(e) {
  console.log("dragging file");
  fileClone.style.transform = `translate(${e.clientX - 10}px, ${
    e.clientY - 10
  }px)`;
}

function fileRelease() {
  window.removeEventListener("mousemove", fileDrag);
  window.removeEventListener("mouseup", fileRelease);
  document.body.removeChild(fileClone);
  console.log("released file");
  console.log(fileGrabbed);
  fileGrabbed.classList.remove("grabbed");
}

const $$workspaces = Array.from(document.getElementsByClassName("workspace"));

$$workspaces.forEach((element) => {
  element.onclick = () => {
    $$workspaces.forEach((elementj) => {
      elementj.classList.add("inactive");
      element.classList.remove("inactive");
    });
  };
});

toggleWifiListBtn.onclick = () => {
  window.addEventListener("click", closeWifiList);
};

function closeWifiList() {
  if (wifiListActive) {
    wifiListActive = false;
    wifiListElement.classList.remove("active");
    window.removeEventListener("click", closeWifiList);
  } else {
    wifiListActive = true;
    wifiListElement.classList.add("active");
  }
}

toggleBluetoothListBtn.onclick = () => {
  window.addEventListener("click", closeBluetoothList);
};

function closeBluetoothList() {
  if (bluetoothListActive) {
    bluetoothListActive = false;
    bluetoothListElement.classList.remove("active");
    window.removeEventListener("click", closeBluetoothList);
  } else {
    bluetoothListActive = true;
    bluetoothListElement.classList.add("active");
  }
}

toggleVolumeBtn.onclick = () => {
  window.addEventListener("click", closeVolume);
};

function closeVolume() {
  if (volumeActive) {
    volumeActive = false;
    volumeElement.classList.remove("active");
    window.removeEventListener("click", closeVolume);
  } else {
    volumeActive = true;
    volumeElement.classList.add("active");
  }
}

toggleCalendarBtn.onclick = () => {
  window.addEventListener("click", closeCalendar);
};

function closeCalendar() {
  if (calendarActive) {
    calendarActive = false;
    calendarElement.classList.remove("active");
    window.removeEventListener("click", closeCalendar);
  } else {
    calendarActive = true;
    calendarElement.classList.add("active");
  }
}

toggleSearchBtn.onclick = () => {
  window.addEventListener("click", closeSearch);
};

function closeSearch(e) {
  if (searchActive && !e.target.closest("#search")) {
    searchActive = false;
    searchElement.classList.remove("active");
    window.removeEventListener("click", closeSearch);
  } else {
    searchActive = true;
    searchElement.classList.add("active");
  }
}

toggleNotificationsBtn.onclick = () => {
  window.addEventListener("click", closeNotifications);
};

function closeNotifications(e) {
  if (notificationsActive && !e.target.closest("#notifications")) {
    notificationsActive = false;
    notificationsElement.classList.remove("active");
    window.removeEventListener("click", closeNotifications);
  } else {
    notificationsActive = true;
    notificationsElement.classList.add("active");
  }
}

let notifsClosed = 0;
const $$notificationCloseBtns = Array.from(
  notificationsElement.getElementsByClassName("notification__close"),
);

$$notificationCloseBtns.forEach((element) => {
  element.onclick = () => {
    const $notif = element.closest(".task_view__task");
    $notif.classList.add("close");
    notifsClosed++;
    setTimeout(() => {
      $notif.classList.add("gone");
      if (notifsClosed === 4) {
        Array.from(
          document.getElementsByClassName("notifications__header"),
        ).forEach((element) => {
          element.classList.add("gone");
        });
        $("no_notifications").classList.add("active");
      }
    }, 200);
  };
});

