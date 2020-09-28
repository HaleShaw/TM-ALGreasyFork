// ==UserScript==
// @name               自动登录到GreasyFork
// @name:zh-CN         自动登录到GreasyFork
// @name:en            Automatically login to GreasyFork by GitHub.
// @description        用GitHub自动登录到GreasyFork。
// @description:zh-CN  用GitHub自动登录到GreasyFork。
// @description:en     Automatically login to GreasyFork by GitHub.
// @namespace          https://github.com/HaleShaw
// @version            1.0.1
// @author             HaleShaw
// @copyright          2020+, HaleShaw (https://github.com/HaleShaw)
// @license            AGPL-3.0-or-later
// @homepage           https://github.com/HaleShaw/TM-ALGreasyFork
// @supportURL         https://github.com/HaleShaw/TM-ALGreasyFork/issues
// @downloadURL        https://raw.githubusercontent.com/HaleShaw/TM-ALGreasyFork/master/ALGreasyFork.user.js
// @updateURL          https://raw.githubusercontent.com/HaleShaw/TM-ALGreasyFork/master/ALGreasyFork.user.js
// @contributionURL    https://www.jianwudao.com/
// @icon               https://greasyfork.org/assets/blacklogo16-bc64b9f7afdc9be4cbfa58bdd5fc2e5c098ad4bca3ad513a27b15602083fd5bc.png
// @require            https://greasyfork.org/scripts/398010-commonutils/code/CommonUtils.js?version=781197
// @match              https://greasyfork.org/*
// @compatible         Chrome
// @run-at             document-idle
// @grant              none
// ==/UserScript==

// ==OpenUserJS==
// @author              HaleShaw
// @collaborator        HaleShaw
// ==/OpenUserJS==

(function () {
  'use strict';

  var st = setTimeout(function show() {
    if (isValidByClassName("external-login github-login")) {
      if (isValidById("remember_me")) {
        document.getElementById("remember_me").checked = true;
      }
      const btnGitHub = document.getElementsByClassName("external-login github-login")[0];
      if ("使用 GitHub 登录" == btnGitHub.innerText || "Sign in with GitHub" == btnGitHub.innerText) {
        showMsg();
        btnGitHub.click();
      }
    }

    if (isValidByClassName('sign-in-link') && !isValidByClassName("external-login github-login")) {
      console.log("Login Button is exist, and will be clicked soon.");

      var btnLogin = document.getElementsByClassName("sign-in-link")[0].children[0];
      if ("登录" == btnLogin.textContent || "Sign in" == btnLogin.textContent) {
        showMsg();
        btnLogin.click();
      }
    }
  }, 1000);

  function showMsg() {
    // Create A
    var aMsg = document.createElement("a");
    aMsg.text = "Auto login...";
    aMsg.style.color = 'white';
    aMsg.style.fontWeight = 'bold';

    const divSite = document.getElementById("site-name-text");
    divSite.appendChild(aMsg);
  }
})();
