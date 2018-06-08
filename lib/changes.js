"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertImageFile = undefined;

var insertImageFile = exports.insertImageFile = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(change, file, editor) {
    var _editor$props, uploadImage, onImageUploadStart, onImageUploadStop, id, alt, reader, src, placeholder;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _editor$props = editor.props, uploadImage = _editor$props.uploadImage, onImageUploadStart = _editor$props.onImageUploadStart, onImageUploadStop = _editor$props.onImageUploadStop;


            if (!uploadImage) {
              console.warn("uploadImage callback must be defined to handle image uploads.");
            }

            onImageUploadStart();
            _context.prev = 3;

            // load the file as a data URL
            id = _uuid2.default.v4();
            alt = "";
            reader = new FileReader();

            reader.addEventListener("load", function () {
              var src = reader.result;
              var node = {
                type: "image",
                isVoid: true,
                data: { src: src, id: id, alt: alt, loading: true }
              };

              // insert / replace into document as uploading placeholder replacing
              // empty paragraphs if available.
              if (!change.value.startBlock.text && change.value.startBlock.type === "paragraph") {
                change.setBlocks(node);
              } else {
                change.insertBlock(node);
              }

              editor.onChange(change);
            });
            reader.readAsDataURL(file);

            // now we have a placeholder, start the upload
            _context.next = 11;
            return uploadImage(file);

          case 11:
            src = _context.sent;

            if (src) {
              _context.next = 14;
              break;
            }

            throw new Error("No image url returned from uploadImage callback");

          case 14:

            // we dont use the original change provided to the callback here
            // as the state may have changed significantly in the time it took to
            // upload the file.
            placeholder = editor.value.document.findDescendant(function (node) {
              return node.data && node.data.get("id") === id;
            });


            change.setNodeByKey(placeholder.key, {
              data: { src: src, alt: alt, loading: false }
            });
            editor.onChange(change);
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](3);
            throw _context.t0;

          case 22:
            _context.prev = 22;

            onImageUploadStop();
            return _context.finish(22);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 19, 22, 25]]);
  }));

  return function insertImageFile(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.splitAndInsertBlock = splitAndInsertBlock;

var _slate = require("slate");

var _slateReact = require("slate-react");

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _EditList = require("./plugins/EditList");

var _EditList2 = _interopRequireDefault(_EditList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var changes = _EditList2.default.changes;
function splitAndInsertBlock(change, options) {
  var type = options.type,
      wrapper = options.wrapper;

  var parent = change.value.document.getParent(change.value.startBlock.key);

  // lists get some special treatment
  if (parent && parent.type === "list-item") {
    change.collapseToStart().call(changes.splitListItem).collapseToEndOfPreviousBlock().call(changes.unwrapList);
  }

  if (wrapper) change.collapseToStartOfNextBlock();

  // this is a hack as insertBlock with normalize: false does not appear to work
  change.insertBlock("paragraph").setBlocks(type, { normalize: false });

  if (wrapper) change.wrapBlock(wrapper);
  return change;
}