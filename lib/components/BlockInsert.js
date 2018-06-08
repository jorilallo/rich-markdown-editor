"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEqual2 = require("lodash/isEqual");

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _reactPortal = require("react-portal");

var _slate = require("slate");

var _slateReact = require("slate-react");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _outlineIcons = require("outline-icons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function findClosestRootNode(value, ev) {
  var previous = void 0;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = value.document.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      var element = (0, _slateReact.findDOMNode)(node);
      var bounds = element.getBoundingClientRect();
      if (bounds.top > ev.clientY) return previous;
      previous = { node: node, element: element, bounds: bounds };
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return previous;
}

var BlockInsert = function (_React$Component) {
  _inherits(BlockInsert, _React$Component);

  function BlockInsert() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BlockInsert);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BlockInsert.__proto__ || Object.getPrototypeOf(BlockInsert)).call.apply(_ref, [this].concat(args))), _this), _this.mouseMovementSinceClick = 0, _this.lastClientX = 0, _this.lastClientY = 0, _this.state = {
      top: 0,
      left: 0,
      active: false,
      closestRootNode: undefined
    }, _this.componentDidMount = function () {
      window.addEventListener("mousemove", _this.handleMouseMove);
    }, _this.componentWillUnmount = function () {
      window.removeEventListener("mousemove", _this.handleMouseMove);
    }, _this.setInactive = function () {
      _this.setState({ active: false });
    }, _this.handleMouseMove = function (ev) {
      var windowWidth = window.innerWidth / 2.5;
      var result = findClosestRootNode(_this.props.editor.value, ev);
      var movementThreshold = 200;
      var newState = _this.state;

      _this.mouseMovementSinceClick += Math.abs(_this.lastClientX - ev.clientX) + Math.abs(_this.lastClientY - ev.clientY);
      _this.lastClientX = ev.clientX;
      _this.lastClientY = ev.clientY;

      newState.active = ev.clientX < windowWidth && _this.mouseMovementSinceClick > movementThreshold;

      if (result) {
        newState.closestRootNode = result.node;

        // do not show block menu on title heading or editor
        var firstNode = _this.props.editor.value.document.nodes.first();
        var hideToolbar = _this.props.editor.props.title && result.node === firstNode || result.node.type === "block-toolbar" || !!result.node.text.trim();

        if (hideToolbar) {
          newState.left = -1000;
        } else {
          newState.left = Math.round(result.bounds.left - 20);
          newState.top = Math.round(result.bounds.top + window.scrollY);
        }
      }

      if (_this.state.active) {
        if (_this.mouseMoveTimeout) clearTimeout(_this.mouseMoveTimeout);
        _this.mouseMoveTimeout = setTimeout(_this.setInactive, 2000);
      }

      if (!(0, _isEqual3.default)(newState, _this.state)) {
        _this.setState(newState);
      }
    }, _this.handleClick = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();

      _this.mouseMovementSinceClick = 0;
      _this.setState({ active: false });

      var editor = _this.props.editor;


      editor.change(function (change) {
        // remove any existing toolbars in the document as a fail safe
        editor.value.document.nodes.forEach(function (node) {
          if (node.type === "block-toolbar") {
            change.removeNodeByKey(node.key);
          }
        });

        var node = _this.state.closestRootNode;
        if (!node) return;

        change.collapseToStartOf(node);

        // if we're on an empty paragraph then just replace it with the block
        // toolbar. Otherwise insert the toolbar as an extra Node.
        if (!node.text.trim() && node.type === "paragraph") {
          change.setNodeByKey(node.key, {
            type: "block-toolbar",
            isVoid: true
          });
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BlockInsert, [{
    key: "render",
    value: function render() {
      var theme = this.props.theme;

      var style = { top: this.state.top + "px", left: this.state.left + "px" };

      return React.createElement(
        _reactPortal.Portal,
        null,
        React.createElement(
          Trigger,
          { active: this.state.active, style: style },
          React.createElement(_outlineIcons.PlusIcon, { onClick: this.handleClick, color: theme.slate })
        )
      );
    }
  }]);

  return BlockInsert;
}(React.Component);

var Trigger = _styledComponents2.default.div.withConfig({
  displayName: "BlockInsert__Trigger"
})(["position:absolute;z-index:1;opacity:0;background-color:", ";transition:opacity 150ms cubic-bezier(0.175,0.885,0.32,1.275),transform 150ms cubic-bezier(0.175,0.885,0.32,1.275);line-height:0;margin-left:-10px;box-shadow:inset 0 0 0 2px ", ";border-radius:100%;transform:scale(0.9);cursor:pointer;&:hover{background-color:", ";svg{fill:", ";}}", ";"], function (props) {
  return props.theme.white;
}, function (props) {
  return props.theme.slate;
}, function (props) {
  return props.theme.slate;
}, function (props) {
  return props.theme.white;
}, function (_ref2) {
  var active = _ref2.active;
  return active && "\n    transform: scale(1);\n    opacity: .9;\n  ";
});

exports.default = (0, _styledComponents.withTheme)(BlockInsert);