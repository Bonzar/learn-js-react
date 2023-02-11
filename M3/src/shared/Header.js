var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import styles from "./header.less";
export function Header() {
    var fetchApi = function (e) {
        e.preventDefault();
        fetch("/api")
            .then(function (response) { return response.json(); })
            .then(function (data) { return console.log(data); })
            .catch(function (error) { return console.error(error); });
    };
    return (_jsxs("header", { children: [_jsx("h1", __assign({ className: styles.example }, { children: "Hello every one" })), _jsx("a", __assign({ onClick: function (e) { return fetchApi(e); } }, { children: "Click to fetch server api message (see on console)" }))] }));
}
//# sourceMappingURL=Header.js.map