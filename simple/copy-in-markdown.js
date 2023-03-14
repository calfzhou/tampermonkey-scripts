// ==UserScript==
// @name         Copy in Markdown
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Generate current page useful information in Markdown format into clip board.
// @author       calfzhou
// @downloadURL  https://cdn.jsdelivr.net/gh/calfzhou/tampermonkey-scripts/simple/copy-in-markdown.js
// @updateURL    https://cdn.jsdelivr.net/gh/calfzhou/tampermonkey-scripts/simple/copy-in-markdown.js
// @include      /^https://github\.com/[^/]+/[^/]+/
// @run-at       document-start
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// ==/UserScript==

;(function () {
  'use strict'

  function copyGithubInfo(includeRelease = false) {
    const parts = location.pathname.split('/', 4)
    const user = parts[1]
    const repo = parts[2]
    let markdown =
      `[![${user}/${repo}](https://img.shields.io/static/v1?label=${user}&message=${repo}&color=blue&logo=github)]` +
      `(https://github.com/${user}/${repo})` +
      ` ![stars](https://img.shields.io/github/stars/${user}/${repo}?logo=.&style=social)` +
      ` ![forks](https://img.shields.io/github/forks/${user}/${repo}?logo=.&style=social)` +
      ` ![updated](https://img.shields.io/github/last-commit/${user}/${repo}?label=)`
    if (includeRelease) {
      markdown +=
        ` ![release](https://img.shields.io/github/v/release/${user}/${repo}?label=)` +
        ` ![release date](https://img.shields.io/github/release-date/${user}/${repo}?label=)`
    }
    GM_setClipboard(markdown, 'text')
  }

  const host = location.host
  if (host === 'github.com') {
    GM_registerMenuCommand('Copy repo info badges as Markdown', () => copyGithubInfo())
    GM_registerMenuCommand('Copy repo info & release badges as Markdown', () => copyGithubInfo(true))
  }
})()
