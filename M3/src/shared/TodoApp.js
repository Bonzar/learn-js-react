var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var TodoApp = /** @class */ (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { items: [], text: "" };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    TodoApp.prototype.render = function () {
        return (_jsxs("div", { children: [_jsx("h3", { children: "TODO" }), _jsx(TodoList, { items: this.state.items }), _jsxs("form", __assign({ onSubmit: this.handleSubmit }, { children: [_jsx("label", __assign({ htmlFor: "new-todo" }, { children: "Nothing be done. Procrastinate!" })), " ", _jsx("input", { id: "new-todo", onChange: this.handleChange, value: this.state.text }), _jsxs("button", { children: ["Add #", this.state.items.length + 1] })] }))] }));
    };
    TodoApp.prototype.handleChange = function (e) {
        this.setState({ text: e.target.value });
    };
    TodoApp.prototype.handleSubmit = function (e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        var newItem = {
            text: this.state.text,
            id: Date.now(),
        };
        this.setState(function (state) { return ({
            items: state.items.concat(newItem),
            text: "",
        }); });
    };
    return TodoApp;
}(React.Component));
export { TodoApp };
var TodoList = /** @class */ (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TodoList.prototype.render = function () {
        return (_jsx("ul", { children: this.props.items.map(function (item) { return (_jsx("li", { children: item.text }, item.id)); }) }));
    };
    return TodoList;
}(React.Component));
//# sourceMappingURL=TodoApp.js.map