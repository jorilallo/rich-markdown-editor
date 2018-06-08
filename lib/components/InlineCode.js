"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InlineCode = _styledComponents2.default.code.attrs({
  spellCheck: false
}).withConfig({
  displayName: "InlineCode"
})(["padding:0.25em;background:", ";border-radius:4px;border:1px solid ", ";"], function (props) {
  return props.theme.smoke;
}, function (props) {
  return props.theme.smokeDark;
});
exports.default = InlineCode;