"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _desc, _value, _class, _class2, _temp;

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _slate = require("slate");

var _slateReact = require("slate-react");

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactKeydown = require("react-keydown");

var _reactKeydown2 = _interopRequireDefault(_reactKeydown);

var _theme = require("./theme");

var _theme2 = _interopRequireDefault(_theme);

var _schema = require("./schema");

var _schema2 = _interopRequireDefault(_schema);

var _getDataTransferFiles = require("./lib/getDataTransferFiles");

var _getDataTransferFiles2 = _interopRequireDefault(_getDataTransferFiles);

var _isModKey = require("./lib/isModKey");

var _isModKey2 = _interopRequireDefault(_isModKey);

var _Flex = require("./components/Flex");

var _Flex2 = _interopRequireDefault(_Flex);

var _ClickablePadding = require("./components/ClickablePadding");

var _ClickablePadding2 = _interopRequireDefault(_ClickablePadding);

var _Toolbar = require("./components/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _BlockInsert = require("./components/BlockInsert");

var _BlockInsert2 = _interopRequireDefault(_BlockInsert);

var _Placeholder = require("./components/Placeholder");

var _Placeholder2 = _interopRequireDefault(_Placeholder);

var _Contents = require("./components/Contents");

var _Contents2 = _interopRequireDefault(_Contents);

var _serializer = require("./serializer");

var _serializer2 = _interopRequireDefault(_serializer);

var _plugins = require("./plugins");

var _plugins2 = _interopRequireDefault(_plugins);

var _changes = require("./changes");

var _marks = require("./marks");

var _marks2 = _interopRequireDefault(_marks);

var _nodes = require("./nodes");

var _nodes2 = _interopRequireDefault(_nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var RichMarkdownEditor = (_dec = (0, _reactKeydown2.default)("meta+s"), _dec2 = (0, _reactKeydown2.default)("meta+enter"), _dec3 = (0, _reactKeydown2.default)("esc"), (_class = (_temp = _class2 = function (_React$Component) {
  _inherits(RichMarkdownEditor, _React$Component);

  function RichMarkdownEditor(props) {
    var _this2 = this;

    _classCallCheck(this, RichMarkdownEditor);

    var _this = _possibleConstructorReturn(this, (RichMarkdownEditor.__proto__ || Object.getPrototypeOf(RichMarkdownEditor)).call(this, props));

    _this.setEditorRef = function (ref) {
      _this.editor = ref;
      // Force re-render to show ToC (<Content />)
      _this.setState({ editorLoaded: true });
    };

    _this.onChange = function (change) {
      if (_this.state.editorValue !== change.value) {
        _this.props.onChange(_serializer2.default.serialize(change.value));
        _this.setState({ editorValue: change.value });
      }
    };

    _this.handleDrop = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ev) {
        var files, i, _file;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.props.readOnly) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (_this.editor.props.uploadImage) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                if (!ev.isDefaultPrevented()) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return");

              case 6:

                // otherwise we'll handle this
                ev.preventDefault();
                ev.stopPropagation();

                files = (0, _getDataTransferFiles2.default)(ev);
                i = 0;

              case 10:
                if (!(i < files.length)) {
                  _context.next = 18;
                  break;
                }

                _file = files[i];

                if (!_file.type.startsWith("image/")) {
                  _context.next = 15;
                  break;
                }

                _context.next = 15;
                return _this.insertImageFile(_file);

              case 15:
                i++;
                _context.next = 10;
                break;

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.insertImageFile = function (file) {
      _this.editor.change(function (change) {
        return change.call(_changes.insertImageFile, file, _this.editor);
      });
    };

    _this.cancelEvent = function (ev) {
      ev.preventDefault();
    };

    _this.onKeyDown = function (ev, change) {
      if (!(0, _isModKey2.default)(ev)) return;

      switch (ev.key) {
        case "s":
          _this.onSave(ev);
          return change;
        case "Enter":
          _this.onSaveAndExit(ev);
          return change;
        case "Escape":
          _this.onCancel();
          return change;
        default:
      }
    };

    _this.focusAtStart = function () {
      _this.editor.change(function (change) {
        return change.collapseToStartOf(change.value.document).focus();
      });
    };

    _this.focusAtEnd = function () {
      _this.editor.change(function (change) {
        return change.collapseToEndOf(change.value.document).focus();
      });
    };

    _this.render = function () {
      var _this$props = _this.props,
          readOnly = _this$props.readOnly,
          pretitle = _this$props.pretitle,
          theme = _this$props.theme,
          title = _this$props.title,
          titlePlaceholder = _this$props.titlePlaceholder,
          bodyPlaceholder = _this$props.bodyPlaceholder,
          onSave = _this$props.onSave,
          uploadImage = _this$props.uploadImage,
          onSearchLink = _this$props.onSearchLink,
          onClickLink = _this$props.onClickLink,
          onImageUploadStart = _this$props.onImageUploadStart,
          onImageUploadStop = _this$props.onImageUploadStop,
          className = _this$props.className,
          style = _this$props.style;


      return React.createElement(
        _styledComponents.ThemeProvider,
        { theme: theme },
        React.createElement(
          _Flex2.default,
          {
            style: style,
            className: className,
            onDrop: _this.handleDrop,
            onDragOver: _this.cancelEvent,
            onDragEnter: _this.cancelEvent,
            column: true,
            auto: true
          },
          readOnly && _this.state.editorLoaded && _this.editor && React.createElement(_Contents2.default, { editor: _this.editor }),
          !readOnly && _this.editor && React.createElement(_Toolbar2.default, { value: _this.state.editorValue, editor: _this.editor }),
          false && !readOnly && _this.editor && React.createElement(_BlockInsert2.default, {
            editor: _this.editor,
            onInsertImage: _this.insertImageFile
          }),
          React.createElement(StyledEditor, {
            innerRef: _this.setEditorRef,
            title: title,
            titlePlaceholder: titlePlaceholder,
            bodyPlaceholder: bodyPlaceholder,
            plugins: _this.plugins,
            pretitle: pretitle,
            value: _this.state.editorValue,
            renderNode: _this.renderNode,
            renderMark: _marks2.default,
            schema: _this.state.schema,
            onKeyDown: _this.onKeyDown,
            onChange: _this.onChange,
            onSave: onSave,
            onSearchLink: onSearchLink,
            onClickLink: onClickLink,
            onImageUploadStart: onImageUploadStart,
            onImageUploadStop: onImageUploadStop,
            readOnly: readOnly,
            spellCheck: !readOnly,
            uploadImage: uploadImage
          }),
          !readOnly && React.createElement(_ClickablePadding2.default, {
            onClick: !readOnly ? _this.focusAtEnd : undefined,
            grow: true
          })
        )
      );
    };

    _this.renderNode = (0, _nodes2.default)({
      onInsertImage: _this.insertImageFile
    });
    _this.plugins = (0, _plugins2.default)();
    if (props.plugins) {
      _this.plugins = _this.plugins.concat(props.plugins);
    }
    _this.state = {
      editorLoaded: false,
      editorValue: _serializer2.default.deserialize(props.defaultValue),
      schema: _extends({}, (0, _schema2.default)({ title: props.title }), _this.props.schema)
    };
    return _this;
  }

  _createClass(RichMarkdownEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.readOnly) return;
      if (this.props.defaultValue) {
        this.focusAtEnd();
      } else {
        this.focusAtStart();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.schema !== this.props.schema) {
        this.setState({
          schema: _extends({}, (0, _schema2.default)({ title: nextProps.title }), nextProps.schema)
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.readOnly && !this.props.readOnly) {
        this.focusAtEnd();
      }
    }
  }, {
    key: "onSave",


    // Handling of keyboard shortcuts outside of editor focus
    value: function onSave(ev) {
      if (this.props.readOnly) return;

      ev.preventDefault();
      ev.stopPropagation();
      this.props.onSave({ redirect: false });
    }
  }, {
    key: "onSaveAndExit",
    value: function onSaveAndExit(ev) {
      if (this.props.readOnly) return;

      ev.preventDefault();
      ev.stopPropagation();
      this.props.onSave({ redirect: true });
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      if (this.props.readOnly) return;
      this.props.onCancel();
    }

    // Handling of keyboard shortcuts within editor focus

  }]);

  return RichMarkdownEditor;
}(React.Component), _class2.defaultProps = {
  theme: _theme2.default,
  defaultValue: "",
  title: true,
  titlePlaceholder: "Your title",
  bodyPlaceholder: "Write something nice…",
  onImageUploadStart: function onImageUploadStart() {},
  onImageUploadStop: function onImageUploadStop() {}
}, _temp), (_applyDecoratedDescriptor(_class.prototype, "onSave", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "onSave"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSaveAndExit", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "onSaveAndExit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onCancel", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "onCancel"), _class.prototype)), _class));


var StyledEditor = (0, _styledComponents2.default)(_slateReact.Editor).withConfig({
  displayName: "src__StyledEditor"
})(["font-family:", ";font-weight:", ";font-size:1em;line-height:1.7em;width:100%;color:", ";h1,h2,h3,h4,h5,h6{font-weight:500;}h1:first-of-type{", "{visibility:", ";}}p:nth-child(2){", "{visibility:", ";}}p:first-child{", "{visibility:", ";}}ul,ol{margin:0 0.1em;padding-left:1em;ul,ol{margin:0.1em;}}p{position:relative;margin:0;}a{color:", ";}a:hover{text-decoration:", ";}li p{display:inline;margin:0;}.todoList{list-style:none;padding-left:0;.todoList{padding-left:1em;}}.todo{span:last-child:focus{outline:none;}}blockquote{border-left:3px solid ", ";margin:0;padding-left:10px;font-style:italic;}table{border-collapse:collapse;}tr{border-bottom:1px solid #eee;}th{font-weight:bold;}th,td{padding:5px 20px 5px 0;}b,strong{font-weight:600;}"], function (props) {
  return props.theme.fontFamily;
}, function (props) {
  return props.theme.fontWeight;
}, function (props) {
  return props.theme.text;
}, _Placeholder2.default, function (props) {
  return props.title ? "visible" : "hidden";
}, _Placeholder2.default, function (props) {
  return props.title ? "visible" : "hidden";
}, _Placeholder2.default, function (props) {
  return props.title ? "hidden" : "visible";
}, function (props) {
  return props.theme.link;
}, function (props) {
  return props.readOnly ? "underline" : "none";
}, function (props) {
  return props.theme.slateLight;
});

exports.default = RichMarkdownEditor;