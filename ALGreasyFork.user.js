// ==UserScript==
// @name               自动登录到GreasyFork
// @name:zh-CN         自动登录到GreasyFork
// @name:en            Automatically login to GreasyFork by GitHub.
// @description        用GitHub自动登录到GreasyFork。
// @description:zh-CN  用GitHub自动登录到GreasyFork。
// @description:en     Automatically login to GreasyFork by GitHub.
// @namespace          https://github.com/HaleShaw
// @version            1.0.2
// @author             HaleShaw
// @copyright          2020+, HaleShaw (https://github.com/HaleShaw)
// @license            AGPL-3.0-or-later
// @homepage           https://github.com/HaleShaw/TM-ALGreasyFork
// @supportURL         https://github.com/HaleShaw/TM-ALGreasyFork/issues
// @downloadURL        https://github.com/HaleShaw/TM-ALGreasyFork/raw/master/ALGreasyFork.user.js
// @updateURL          https://github.com/HaleShaw/TM-ALGreasyFork/raw/master/ALGreasyFork.user.js
// @contributionURL    https://www.jianwudao.com/
// @icon               https://greasyfork.org/packs/media/images/blacklogo16-5421a97c75656cecbe2befcec0778a96.png
// @require            https://greasyfork.org/scripts/398010-commonutils/code/CommonUtils.js?version=781197
// @match              https://greasyfork.org/*
// @compatible         Chrome
// @grant              GM_addStyle
// @grant              GM_info
// ==/UserScript==

// ==OpenUserJS==
// @author             HaleShaw
// @collaborator       HaleShaw
// ==/OpenUserJS==

(function () {
  'use strict';

  const mainStyle = `
  #site-name > a > img {
    width: 32px;
    height: 32px;
  }

  #main-header h1 {
      font-size: 36px;
  }
  `;

  const personalCenterStyle = `
  #about-user > a,
  #about-user > h2,
  #control-panel > header,
  #user-discussions-on-scripts-written,
  #user-discussions,
  #user-conversations,
  #user-script-sets-section {
    display: none !important;
  }

  #about-user {
    display: flex;
    position: fixed;
    right: 20px;
    margin: 0;
    padding: 0 10px 0 0;
  }

  .script-list li:not(.ad-entry) {
      padding: 0.5em 1em;
  }
  `;

  main();

  function main() {
    logInfo(GM_info.script.name, GM_info.script.version);
    GM_addStyle(mainStyle);
    beautifyPersonalCenter();
    login();
  }

  function login() {
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
  }

  function showMsg() {
    // Create A
    var aMsg = document.createElement("a");
    aMsg.text = "Auto login...";
    aMsg.style.color = 'white';
    aMsg.style.fontWeight = 'bold';

    const divSite = document.getElementById("site-name-text");
    divSite.appendChild(aMsg);
  }

  function beautifyPersonalCenter() {
    if (window.location.href.startsWith('https://greasyfork.org/zh-CN/users/331591')) {
      GM_addStyle(personalCenterStyle);
    }
  }

  /**
   * Log the title and version at the front of the console.
   * @param {String} title title.
   * @param {String} version script version.
   */
  function logInfo(title, version) {
    console.clear();
    const titleStyle = 'color:white;background-color:#606060';
    const versionStyle = 'color:white;background-color:#1475b2';
    const logTitle = ' ' + title + ' ';
    const logVersion = ' ' + version + ' ';
    console.log('%c' + logTitle + '%c' + logVersion, titleStyle, versionStyle);
  }
})();
