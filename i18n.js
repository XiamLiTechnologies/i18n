/**
 * i18n v1.2.1 - https://github.com/XiamLiTechnologies/i18n
 * Copyright (C) 2018 XiamLi Technologies - XiamLi.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function() {
    const i18n = {};
    const translationCache = {};
    const fallbackLanguage = 'en';
    const tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };

    let currentLanguage;

    i18n.getTranslation = function(property, language) {
        let translation = translationCache[typeof language === "string" ? language : i18n.getLanguage()][property];
        if(isEmpty(translation))
            if((typeof language === "string" ? language : i18n.getLanguage()) === fallbackLanguage)
                return null;
            else
                return translationCache[fallbackLanguage][property];
        else
            return translation;
    };

    i18n.translate = function() {
        let elements = document.querySelectorAll('[i18n]');
        [].forEach.call(elements, function(element) {
            let prop = element.getAttribute('i18n');
            let translation = i18n.getTranslation(prop);

            if(isEmpty(translation)) {
                console.log('No translation found for property ' + prop);
                return;
            }

            let innerText = [].reduce.call(element.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, '');
            innerText = replaceTags(innerText);

            element.innerHTML = element.innerHTML.replace(innerText, translation);
        });
    };

    i18n.getLanguage = function() {
        if(typeof currentLanguage === "string" && !isEmpty(currentLanguage))
            return currentLanguage;
        let cookie = getCookie('language');
        if(cookie) {
            currentLanguage = cookie;
            return cookie;
        }
        let navLang = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage;
        currentLanguage = navLang.split('-')[0] || "en";
        return currentLanguage;
    };

    i18n.changeLanguage = function(language) {
        if(language in translationCache) {
            setCookie("language", language, 365);
            currentLanguage = language;
            i18n.translate();
        } else
            loadLanguageFile(language, function() {
                setCookie("language", language, 365);
                currentLanguage = language;
                i18n.translate();
            });
    };

    function replaceTag(tag) {
        return tagsToReplace[tag] || tag;
    }

    // Source: https://stackoverflow.com/a/5499821
    function replaceTags(str) {
        return str.replace(/[&<>]/g, replaceTag);
    }

    function isEmpty(string) {
        return !string || string.length === 0 || /^\s*$/.test(string);
    }

    function loadLanguageFile(language, callback) {
        let request = new XMLHttpRequest();
        request.open('GET', '/i18n/' + language + ".json", true);

        request.onload = function() {
            if(request.status >= 200 && request.status < 400)
                translationCache[language] = JSON.parse(request.responseText);
            else
                console.log('Failed to load language file ' + language);

            if (typeof callback === "function")
                callback();
        };

        request.onerror = function() {
            console.log('Failed to load language file ' + language);
            if (typeof callback === "function")
                callback();
        };

        request.send();
    }

    // Source: https://www.quirksmode.org/js/cookies.html
    function setCookie(name, value, days) {
        let expires;
        if(days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        name = name + "=";
        let cookies = document.cookie.split(';');
        for(let index = 0; index < cookies.length; index++) {
            let cookie = cookies[index].trim();
            if(cookie.indexOf(name) === 0)
                return cookie.substring(name.length, cookie.length);
        }
        return null;
    }

    window.i18n = i18n;
    loadLanguageFile(fallbackLanguage, function() {
        i18n.changeLanguage(i18n.getLanguage());
    });
}());
