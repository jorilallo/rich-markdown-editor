"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Paragraph;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _slate = require("slate");

var _Placeholder = require("./Placeholder");

var _Placeholder2 = _interopRequireDefault(_Placeholder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Paragraph(_ref) {
  var attributes = _ref.attributes,
      editor = _ref.editor,
      node = _ref.node,
      parent = _ref.parent,
      children = _ref.children,
      readOnly = _ref.readOnly;

  var parentIsDocument = parent instanceof _slate.Document;
  var firstParagraph = parent && parent.nodes.get(editor.props.title ? 1 : 0) === node;
  var lastParagraph = parent && parent.nodes.last() === node;
  var showPlaceholder = !readOnly && parentIsDocument && firstParagraph && lastParagraph && !node.text;

  return _react2.default.createElement(
    "p",
    attributes,
    children,
    showPlaceholder && _react2.default.createElement(
      _Placeholder2.default,
      { contentEditable: false },
      editor.props.bodyPlaceholder
    )
  );
}