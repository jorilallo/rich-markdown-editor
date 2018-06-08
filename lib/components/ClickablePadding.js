"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClickablePadding = function ClickablePadding(props) {
  return _react2.default.createElement(Container, { grow: props.grow, onClick: props.onClick });
};

var Container = _styledComponents2.default.div.withConfig({
  displayName: "ClickablePadding__Container"
})(["width:100%;cursor:", ";", ";"], function (_ref) {
  var onClick = _ref.onClick;
  return onClick ? "text" : "default";
}, function (_ref2) {
  var grow = _ref2.grow;
  return grow && "flex-grow: 1;";
});

exports.default = ClickablePadding;