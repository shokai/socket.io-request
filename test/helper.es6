/* global Promise */

import "babel-polyfill";

export function delay(msec){
  return new Promise((resolve) => {
    setTimeout(resolve, msec);
  });
}
