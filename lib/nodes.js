"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createRenderNode;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Code = require("./components/Code");

var _Code2 = _interopRequireDefault(_Code);

var _BlockToolbar = require("./components/Toolbar/BlockToolbar");

var _BlockToolbar2 = _interopRequireDefault(_BlockToolbar);

var _HorizontalRule = require("./components/HorizontalRule");

var _HorizontalRule2 = _interopRequireDefault(_HorizontalRule);

var _Image = require("./components/Image");

var _Image2 = _interopRequireDefault(_Image);

var _Link = require("./components/Link");

var _Link2 = _interopRequireDefault(_Link);

var _ListItem = require("./components/ListItem");

var _ListItem2 = _interopRequireDefault(_ListItem);

var _TodoList = require("./components/TodoList");

var _TodoList2 = _interopRequireDefault(_TodoList);

var _Heading = require("./components/Heading");

var _Paragraph = require("./components/Paragraph");

var _Paragraph2 = _interopRequireDefault(_Paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRenderNode(_ref) {
  var onInsertImage = _ref.onInsertImage;

  return function renderNode(props) {
    var attributes = props.attributes;


    switch (props.node.type) {
      case "paragraph":
        return _react2.default.createElement(_Paragraph2.default, props);
      case "block-toolbar":
        return _react2.default.createElement(_BlockToolbar2.default, _extends({ onInsertImage: onInsertImage }, props));
      case "block-quote":
        return _react2.default.createElement(
          "blockquote",
          attributes,
          props.children
        );
      case "bulleted-list":
        return _react2.default.createElement(
          "ul",
          attributes,
          props.children
        );
      case "ordered-list":
        return _react2.default.createElement(
          "ol",
          attributes,
          props.children
        );
      case "todo-list":
        return _react2.default.createElement(
          _TodoList2.default,
          attributes,
          props.children
        );
      case "table":
        return _react2.default.createElement(
          "table",
          attributes,
          props.children
        );
      case "table-row":
        return _react2.default.createElement(
          "tr",
          attributes,
          props.children
        );
      case "table-head":
        return _react2.default.createElement(
          "th",
          attributes,
          props.children
        );
      case "table-cell":
        return _react2.default.createElement(
          "td",
          attributes,
          props.children
        );
      case "list-item":
        return _react2.default.createElement(_ListItem2.default, props);
      case "horizontal-rule":
        return _react2.default.createElement(_HorizontalRule2.default, props);
      case "code":
        return _react2.default.createElement(_Code2.default, props);
      case "code-line":
        return _react2.default.createElement(
          "pre",
          attributes,
          props.children
        );
      case "image":
        return _react2.default.createElement(_Image2.default, props);
      case "link":
        return _react2.default.createElement(_Link2.default, props);
      case "heading1":
        return _react2.default.createElement(_Heading.Heading1, _extends({ placeholder: true }, props));
      case "heading2":
        return _react2.default.createElement(_Heading.Heading2, props);
      case "heading3":
        return _react2.default.createElement(_Heading.Heading3, props);
      case "heading4":
        return _react2.default.createElement(_Heading.Heading4, props);
      case "heading5":
        return _react2.default.createElement(_Heading.Heading5, props);
      case "heading6":
        return _react2.default.createElement(_Heading.Heading6, props);
      default:
    }
  };
}