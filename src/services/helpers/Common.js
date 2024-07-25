import moment from "moment";
import toast from "react-hot-toast";
import {
  GOOGLE_MAP_API_KEY,
  OPENWEATHERMAP_API_KEY,
} from "../config/Constants";
import { ApiPost } from "./API/ApiData";
import ProfileImage from "../../assets/317334.jpg";
import axios from "axios";

export function formatDate(ci) {
  return moment(ci.value).local().format("DD MMM YYYY");
}

export function formatTaskDate(date) {
  return moment(date).local().format("YYYY-MM-DD");
}

export const formatDateInll = (ci) => {
  return moment(ci).format("ll");
};

export const formatCallSheetDate = (ci) => {
  return moment(ci).format("ddd, MMM, D, YYYY ");
};

export const formatCallSheetDate1 = (date) => {
  return moment(date).format("DD - MMMM");
};

export const formatCallSheetDate2 = (date) => {
  return moment(date).format("ddd, MMMM DD, YYYY @ hh:mm A");
};

export const formatComfirmCallsheet = (date) => {
  return moment(date).format("ddd, MMM DD, YYYY @ hh:mm A");
};

export const formatWorkflowDate = (date) => {
  return moment(date).format("MMM DD");
};

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDate = (date) => {
  let d = new Date(date);
  if (d.getDate() < 10 && d.getMonth() < 10) {
    return d.getFullYear() + "-0" + (d.getMonth() + 1) + "-0" + d.getDate();
  } else {
    if (d.getDate() < 10) {
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-0" + d.getDate();
    } else if (d.getMonth() < 10) {
      return d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate();
    }
  }
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
};

export const getDateMonth = (date) => {
  let d = new Date(date);
  return monthNames[d.getMonth()];
};

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

export const getDateDay = (date) => {
  let d = new Date(date);
  return weekday[d.getDay()];
};

export const getBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getServerURL = (url) => {
  let m = url.match("(^(?:(?:.*?)?//)?[^/?#;]*)");
  return m[1];
};

export const getFirstName = (name) => {
  return name?.split(" ")[0];
};

export const getRandomInt = (min, max) => {
  // Create byte array and fill with 1 random number
  let byteArray = new Uint8Array(1);
  window.crypto.getRandomValues(byteArray);

  // Convert to decimal
  let randomNum = "0." + byteArray[0].toString();

  // Get number in range
  randomNum = Math.floor(randomNum * (max - min + 1)) + min;
  return randomNum;
};

export const generate3DigitRNumber = () => {
  return getRandomInt(100, 999);
};

export const capitalizeFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string.slice(1);
};

export const setHeaderName = (path) => {
  return capitalizeFirstLetter(path.replace("/", "")) === ""
    ? "Projects"
    : capitalizeFirstLetter(path.replace("/", ""));
};

export const setDepartmentName = (departmentList, departmentId) => {
  if (departmentList?.length) {
    let departmentName = departmentList?.find((e) => e?._id === departmentId);

    if (!departmentName) return;
    return departmentName?.name;
  } else {
    return;
  }
};

export const getColor = () => {
  let color = ["#DC67C2", "#63B8D3", "#E3749C", "#D36363", "#D3A663"];
  let rndItem = (a) => a[(rnd() * a.length) | 0];
  let rnd = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
  // return rndItem(color);

  return "#DC67C2";
};

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const getFileType = (url) => {
  return url?.substring(url?.lastIndexOf(".") + 1);
};

export const getFileTypeFromName = (fileName) => {
  return fileName.substr(fileName.lastIndexOf(".") + 1);
};

export const noDataTernary = (value) => {
  return value === "" || value === null || value === undefined ? "-" : value;
};

export const downloadFile = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};
export const downloadFileUint = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([new Uint8Array(data)], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

export const getTemperature = async (city) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${OPENWEATHERMAP_API_KEY}&units=metric`
    );
    const data = await res.json();
    return data;
  } catch (error) {}
};

export const isValidEmail = (email) => {
  return new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
};

export const askAccess = async (data) => {
  await ApiPost(`project/request-access`, data)
    .then((res) => {
      if (res.data.result !== -1) {
        toast.success(res.data.message);
      }
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
    });
};

function capFirst(string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export const getRandomInt1 = (min, max) => {
  // Create byte array and fill with 1 random number
  let byteArray = new Uint8Array(1);
  window.crypto.getRandomValues(byteArray);

  // Convert to decimal
  let randomNum = "0." + byteArray[0].toString();

  // Get number in range
  randomNum = Math.floor(randomNum * (max - min + 1)) + min;
  return randomNum;
};



export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c?.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c?.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const onTimeChange = (time) => {
  if (!time) return "";
  let timeSplit = time?.split(":"),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = "PM";
    hours -= 12;
  } else if (hours < 12) {
    meridian = "AM";
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = "PM";
  }
  return hours + ":" + minutes + " " + meridian;
};

export const handleOnClickViewTutorial = () => {
  window.open("//youtube.com/c/V%C5%ABTechnologies");
};

export const getAvatarArray = (index) => {
  let arr = [];
  for (let i = 0; i < index; i++) {
    arr.push({ name: "peter", src: ProfileImage });
  }
  return arr;
};

export const getAvatarArrayWithProfile = (userData) => {
  let arr = [];
  for (let i in userData) {
    arr.push({
      name: userData[i]?.fullName,
      ...(userData[i]?.profileImage && {
        src: userData[i]?.profileImage
          ? userData[i]?.profileImage
          : ProfileImage,
      }),
    });
  }
  return arr;
};

export const onFullscreen = () => {
  let element = document.getElementById("root");
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen(); // Firefox
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // Safari
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen(); // IE/Edge
  }
};

export const onExitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
};

export const getObjectFromArray = (array, key, value) => {
  return array.find((f) => f[key] === value);
};

export const redirectToViewMap = async (addr) => {
  if (addr === undefined) return;
  let latDes = addr?.results?.[0]?.geometry?.location?.lat;
  let longDes = addr?.results?.[0]?.geometry?.location?.lng;
  let url = "https://www.google.com/maps/dir/?api=1";
  let origin = "&origin=" + latDes + "," + longDes;
  let destination = "&destination=" + latDes + "," + longDes;
  let newUrl = new URL(url + origin + destination);
  let win = window.open(newUrl, "_blank");
  win.focus();
};

export const getCoordinates = async (address1) => {
  let address = await fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address1 +
      "&key=" +
      GOOGLE_MAP_API_KEY
  );
  address = await address.json();
  return address;
};

export const isValidURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const convertCelsiusToFahrenheit = (celsius) => {
  var cTemp = celsius;
  var cToFahr = (cTemp * 9) / 5 + 32;
  var message = cToFahr.toFixed(2);
  return message;
};

export const convertTimeSunriseAndSunSet = (unixTime) => {
  let dt = new Date(unixTime * 1000);
  let h = moment(dt).format("HH:MM");
  return h;
};

export const onClickFileDownloadFromAWSS3 = async (url, name) => {
  let fileType = getFileType(url);
  let id = toast.loading("Downloading...");
  fetch(url, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cors-Any-Origin": "*",
    },
  })
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      setTimeout((_) => {
        window.URL.revokeObjectURL(url);
      }, 60000);
      toast.success("Downloaded Successfully", { id });
    })
    .catch((err) => {
      toast.error("Something went wrong", { id });
    });
  // fetch(url, {
  //   method: "GET",
  //   responseType: "blob",
  // })
  //   .then((res) => {
  //     return res.blob();
  //   })
  //   .then((blob) => {
  //     var url = window.URL.createObjectURL(blob);
  //     var a = document.createElement("a");
  //     a.href = url;
  //     a.download = name;
  //     document.body.appendChild(a);
  //     a.click();
  //     setTimeout((_) => {
  //       window.URL.revokeObjectURL(url);
  //     }, 60000);
  //     toast.success("Downloaded Successfully", { id });
  //     a.remove();
  //   })
  //   .catch((err) => {
  //     console.error("err: ", err);
  //     toast.error("Something went wrong", { id });
  //   });
};

export const findAndReplaceNestedObj = (
  entireObj,
  keyToFind,
  valToFind,
  replace
) => {
  let foundObj = JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = replace;
    }
    return nestedValue;
  });
  return foundObj ? JSON.parse(foundObj) : "";
};

export const findNestedObj = (entireObj, keyToFind, valToFind) => {
  let foundObj;
  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = nestedValue;
    }
    return nestedValue;
  });
  return foundObj;
};

export const groupedByUpdatedAt = (data) => {
  let arr = data.reduce((acc, cur) => {
    const key = moment(cur.updatedAt).format("D MMM YYYY h:mm a");
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(cur);
    return acc;
  }, {});
  return arr;
};

export const findPath = (data, id) => {
  let path = [];
  let f = 0;
  function find(data, id) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
        path.push(data[i]);
        f = 1;
        return;
      } else if (data[i].folder.length > 0) {
        find(data[i].folder, id);
        if (f == 1) {
          path.push(data[i]);
          return;
        }
      }
    }
  }
  find(data, id);
  return path;
};

export const removeKeys = (array, keysToRemove) => {
  let newArray = array.map((obj) => {
    return Object.keys(obj)
      .filter((key) => !keysToRemove.includes(key))
      .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
      }, {});
  });
  return newArray;
};
export const removeEmptyObjects = (obj) => {
  return Object.keys(obj).some((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      return removeEmptyObjects(obj[key]);
    } else {
      return obj[key] !== "";
    }
  });
};

export const modifyArray = (dataarray) => {
  return dataarray.filter((obj) => removeEmptyObjects(obj));
};

export const emptyObject = (arr) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    let hasValues = false;

    for (let key in arr[i]) {
      if (
        arr[i][key] !== null &&
        arr[i][key] !== undefined &&
        arr[i][key] !== "" &&
        Object.keys(arr[i][key])?.length !== 0
      ) {
        hasValues = true;
        break;
      }
    }

    if (!hasValues) {
      result.push(i);
    }
  }
  return result;
};

export const summationSchedule = (arr) => {
  let count;
  let pages = 0;
  let hours = 0;
  if (arr.length > 0) {
    let w = 0;
    let f = 0;
    let r = 0;
    arr.forEach((item) => {
      if (item.est) {
        hours += Number(item.est);
      }
      if (item.pages) {
        pages += item.pages;
        if (item.pages.split(" ").length > 1) {
          if (item.pages.split(" ")[1].split("/").length > 1) {
            f += Number(item.pages.split(" ")[1].split("/")[0]);
            w += Number(item.pages.split(" ")[0]);
          }
        } else {
          if (item.pages.split("/").length > 1) {
            f += Number(item.pages.split("/")[0]);
          } else {
            w += Number(item.pages);
          }
        }
      }
    });
    r = Math.floor(f % 8);
    w += Math.floor(f / 8);
    pages = `${w} ${r}/8`;
  }
  count = {
    est: hours,
    pages: pages,
  };

  return count;
};

export const downloadBase64File = (base64Data, mimeType, fileName, id) => {
  const b64Data = base64Data;
  const contentType = mimeType;
  const byteCharacters = atob(b64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  toast.success("File downloaded successfully", { id });
  document.body.removeChild(link);

  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 0);
};

export const handleDownloadFile = (data, fileName) => {
  let id = toast.loading("Downloading...");
  ApiPost(`media_library/download-pdf`, data)
    .catch((err) => {
      toast.error("Something went wrong", { id });
    })
    .then((res) => {
      if (res.data.result !== -1) {
        downloadFileUint({
          data: [
            ...Object.keys(res.data.payload).map(
              (key) => res.data.payload[key]
            ),
          ],
          fileName: fileName,
          fileType: "application/pdf",
        });
        toast.success("File downloaded successfully", { id });
      }
    });
};

export const handleDownloadOtherFile = (data, fileName) => {
  let id = toast.loading("Downloading...");
  ApiPost(`media_library/download-pdf`, data)
    .catch((err) => {
      toast.error("Something went wrong", { id });
    })
    .then((res) => {
      if (res.data.result !== -1) {
        downloadBase64File(
          res?.data?.payload?.raw,
          res?.data?.payload?.contentType,
          fileName,
          id
        );
        toast.success("File downloaded successfully", { id });
      }
    });
};

export const downloadS3File = (data, fileName) => {
  let bodyPayload = data;
  if (getFileType(bodyPayload?.link) === "pdf") {
    bodyPayload.type = "pdf";
    handleDownloadFile(bodyPayload, fileName);
  } else {
    bodyPayload.type = "download-image";
    handleDownloadOtherFile(bodyPayload, fileName);
  }
};

export const formattedPhoneNumberWithCountryCode = (
  countryCode,
  phoneNumber
) => {
  const phoneNumberFormated = `${phoneNumber
    .toString()
    .slice(0, 3)}-${phoneNumber.toString().slice(3, 6)}-${phoneNumber
    .toString()
    .slice(6)}`;

  const phoneNoWithCountryCode = countryCode
    ? `(+${countryCode}) ${phoneNumberFormated}`
    : phoneNumberFormated;

  return phoneNoWithCountryCode;
};
