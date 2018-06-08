"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _styledComponents2.default.span.withConfig({
  displayName: "Placeholder"
})(["position:absolute;top:0;visibility:hidden;pointer-events:none;user-select:none;color:", ";"], function (props) {
  return props.theme.placeholder;
});