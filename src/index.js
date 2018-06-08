// @flow
import * as React from "react";
import { Value, Change, Schema } from "slate";
import { Editor } from "slate-react";
import styled, { ThemeProvider } from "styled-components";
import keydown from "react-keydown";
import type { SlateNodeProps, Plugin, SearchResult } from "./types";
import defaultTheme from "./theme";
import defaultSchema from "./schema";
import getDataTransferFiles from "./lib/getDataTransferFiles";
import isModKey from "./lib/isModKey";
import Flex from "./components/Flex";
import ClickablePadding from "./components/ClickablePadding";
import Toolbar from "./components/Toolbar";
import BlockInsert from "./components/BlockInsert";
import Placeholder from "./components/Placeholder";
import Contents from "./components/Contents";
import Markdown from "./serializer";
import createPlugins from "./plugins";
import { insertImageFile } from "./changes";
import renderMark from "./marks";
import createRenderNode from "./nodes";

type Props = {
  defaultValue: string,
  titlePlaceholder: string,
  bodyPlaceholder: string,
  title?: boolean,
  pretitle?: string,
  plugins?: Plugin[],
  readOnly?: boolean,
  schema?: Schema,
  theme: Object,
  uploadImage?: (file: File) => Promise<string>,
  onSave: ({ redirect?: boolean }) => *,
  onCancel: () => *,
  onChange: string => *,
  onImageUploadStart: () => *,
  onImageUploadStop: () => *,
  onSearchLink?: (term: string) => Promise<SearchResult[]>,
  onClickLink?: (href: string) => *,
  className?: string,
  style?: Object
};

type State = {
  editorValue: Value,
  editorLoaded: boolean,
  schema: Schema
};

class RichMarkdownEditor extends React.Component<Props, State> {
  static defaultProps = {
    theme: defaultTheme,
    defaultValue: "",
    title: true,
    titlePlaceholder: "Your title",
    bodyPlaceholder: "Write something nice…",
    onImageUploadStart: () => {},
    onImageUploadStop: () => {}
  };

  editor: Editor;
  renderNode: SlateNodeProps => *;
  plugins: Plugin[];

  constructor(props: Props) {
    super(props);

    this.renderNode = createRenderNode({
      onInsertImage: this.insertImageFile
    });
    this.plugins = createPlugins();
    if (props.plugins) {
      this.plugins = this.plugins.concat(props.plugins);
    }
    this.state = {
      editorLoaded: false,
      editorValue: Markdown.deserialize(props.defaultValue),
      schema: {
        ...defaultSchema({ title: props.title }),
        ...this.props.schema
      }
    };
  }

  componentDidMount() {
    if (this.props.readOnly) return;
    if (this.props.defaultValue) {
      this.focusAtEnd();
    } else {
      this.focusAtStart();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.schema !== this.props.schema) {
      this.setState({
        schema: {
          ...defaultSchema({ title: nextProps.title }),
          ...nextProps.schema
        }
      });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.readOnly && !this.props.readOnly) {
      this.focusAtEnd();
    }
  }

  setEditorRef = (ref: Editor) => {
    this.editor = ref;
    // Force re-render to show ToC (<Content />)
    this.setState({ editorLoaded: true });
  };

  onChange = (change: Change) => {
    if (this.state.editorValue !== change.value) {
      this.props.onChange(Markdown.serialize(change.value));
      this.setState({ editorValue: change.value });
    }
  };

  handleDrop = async (ev: SyntheticDragEvent<*>) => {
    if (this.props.readOnly) return;

    // check an image upload callback is defined
    if (!this.editor.props.uploadImage) return;

    // check if this event was already handled by the Editor
    if (ev.isDefaultPrevented()) return;

    // otherwise we'll handle this
    ev.preventDefault();
    ev.stopPropagation();

    const files = getDataTransferFiles(ev);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        await this.insertImageFile(file);
      }
    }
  };

  insertImageFile = (file: window.File) => {
    this.editor.change(change =>
      change.call(insertImageFile, file, this.editor)
    );
  };

  cancelEvent = (ev: SyntheticEvent<*>) => {
    ev.preventDefault();
  };

  // Handling of keyboard shortcuts outside of editor focus
  @keydown("meta+s")
  onSave(ev: SyntheticKeyboardEvent<*>) {
    if (this.props.readOnly) return;

    ev.preventDefault();
    ev.stopPropagation();
    this.props.onSave({ redirect: false });
  }

  @keydown("meta+enter")
  onSaveAndExit(ev: SyntheticKeyboardEvent<*>) {
    if (this.props.readOnly) return;

    ev.preventDefault();
    ev.stopPropagation();
    this.props.onSave({ redirect: true });
  }

  @keydown("esc")
  onCancel() {
    if (this.props.readOnly) return;
    this.props.onCancel();
  }

  // Handling of keyboard shortcuts within editor focus
  onKeyDown = (ev: SyntheticKeyboardEvent<*>, change: Change) => {
    if (!isModKey(ev)) return;

    switch (ev.key) {
      case "s":
        this.onSave(ev);
        return change;
      case "Enter":
        this.onSaveAndExit(ev);
        return change;
      case "Escape":
        this.onCancel();
        return change;
      default:
    }
  };

  focusAtStart = () => {
    this.editor.change(change =>
      change.collapseToStartOf(change.value.document).focus()
    );
  };

  focusAtEnd = () => {
    this.editor.change(change =>
      change.collapseToEndOf(change.value.document).focus()
    );
  };

  render = () => {
    const {
      readOnly,
      pretitle,
      theme,
      title,
      titlePlaceholder,
      bodyPlaceholder,
      onSave,
      uploadImage,
      onSearchLink,
      onClickLink,
      onImageUploadStart,
      onImageUploadStop,
      className,
      style
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Flex
          style={style}
          className={className}
          onDrop={this.handleDrop}
          onDragOver={this.cancelEvent}
          onDragEnter={this.cancelEvent}
          align="flex-start"
          justify="center"
          auto
          column
        >
          {readOnly &&
            this.state.editorLoaded &&
            this.editor && <Contents editor={this.editor} />}
          {!readOnly &&
            this.editor && (
              <Toolbar value={this.state.editorValue} editor={this.editor} />
            )}
          {!readOnly &&
            this.editor && (
              <BlockInsert
                editor={this.editor}
                onInsertImage={this.insertImageFile}
              />
            )}
          <StyledEditor
            innerRef={this.setEditorRef}
            title={title}
            titlePlaceholder={titlePlaceholder}
            bodyPlaceholder={bodyPlaceholder}
            plugins={this.plugins}
            pretitle={pretitle}
            value={this.state.editorValue}
            renderNode={this.renderNode}
            renderMark={renderMark}
            schema={this.state.schema}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            onSave={onSave}
            onSearchLink={onSearchLink}
            onClickLink={onClickLink}
            onImageUploadStart={onImageUploadStart}
            onImageUploadStop={onImageUploadStop}
            readOnly={readOnly}
            spellCheck={!readOnly}
            uploadImage={uploadImage}
          />
          {!readOnly && (
            <ClickablePadding
              onClick={!readOnly ? this.focusAtEnd : undefined}
              grow
            />
          )}
        </Flex>
      </ThemeProvider>
    );
  };
}

const StyledEditor = styled(Editor)`
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeight};
  font-size: 1em;
  line-height: 1.7em;
  width: 100%;
  color: ${props => props.theme.text};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
  }

  /* With title and placeholder (components interpolation not allowed inside props) */
  h1:first-of-type {
    ${Placeholder} {
      visibility: ${props => (props.title ? "visible" : "hidden")};
    }
  }

  p:nth-child(2) {
    ${Placeholder} {
      visibility: ${props => (props.title ? "visible" : "hidden")};
    }
  }

  /* Without title */
  p:first-child {
    ${Placeholder} {
      visibility: ${props => (props.title ? "hidden" : "visible")};
    }
  }

  ul,
  ol {
    margin: 0 0.1em;
    padding-left: 1em;

    ul,
    ol {
      margin: 0.1em;
    }
  }

  p {
    position: relative;
    margin: 0;
  }

  a {
    color: ${props => props.theme.link};
  }

  a:hover {
    text-decoration: ${props => (props.readOnly ? "underline" : "none")};
  }

  li p {
    display: inline;
    margin: 0;
  }

  .todoList {
    list-style: none;
    padding-left: 0;

    .todoList {
      padding-left: 1em;
    }
  }

  .todo {
    span:last-child:focus {
      outline: none;
    }
  }

  blockquote {
    border-left: 3px solid ${props => props.theme.slateLight};
    margin: 0;
    padding-left: 10px;
    font-style: italic;
  }

  table {
    border-collapse: collapse;
  }

  tr {
    border-bottom: 1px solid #eee;
  }

  th {
    font-weight: bold;
  }

  th,
  td {
    padding: 5px 20px 5px 0;
  }

  b,
  strong {
    font-weight: 600;
  }
`;

export default RichMarkdownEditor;
