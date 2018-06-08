"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slate = require("slate");

var schema = function schema(_ref) {
  var title = _ref.title;

  var nodes = [{
    types: ["paragraph", "heading1", "heading2", "heading3", "heading4", "heading5", "heading6", "block-quote", "code", "horizontal-rule", "image", "bulleted-list", "ordered-list", "todo-list", "block-toolbar", "table"],
    min: 1
  }];

  if (title) {
    nodes.unshift({ types: ["heading1"], min: 1, max: 1 });
  }

  return {
    blocks: {
      heading1: { nodes: [{ objects: ["text"] }], marks: [""] },
      heading2: { nodes: [{ objects: ["text"] }], marks: [""] },
      heading3: { nodes: [{ objects: ["text"] }], marks: [""] },
      heading4: { nodes: [{ objects: ["text"] }], marks: [""] },
      heading5: { nodes: [{ objects: ["text"] }], marks: [""] },
      heading6: { nodes: [{ objects: ["text"] }], marks: [""] },
      "block-quote": { marks: [""] },
      table: {
        nodes: [{ types: ["table-row", "table-head", "table-cell"] }]
      },
      "horizontal-rule": {
        isVoid: true
      },
      "block-toolbar": {
        isVoid: true
      }
    },
    document: {
      nodes: nodes,
      normalize: function normalize(change, reason, _ref2) {
        var node = _ref2.node,
            child = _ref2.child,
            mark = _ref2.mark,
            index = _ref2.index;

        var insertHeading = title && index === 0;

        switch (reason) {
          case "child_type_invalid":
            {
              return change.setNodeByKey(child.key, insertHeading ? "heading1" : "paragraph");
            }
          case "child_required":
            {
              var block = _slate.Block.create(insertHeading ? "heading1" : "paragraph");
              return change.insertNodeByKey(node.key, index, block);
            }
          default:
        }
      }
    }
  };
};
exports.default = schema;