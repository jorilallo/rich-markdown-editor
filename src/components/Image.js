// @flow
import * as React from "react";
import ImageZoom from "react-medium-image-zoom";
import styled from "styled-components";
import type { SlateNodeProps as Props } from "../types";

class Image extends React.Component<Props> {
  handleChange = (ev: SyntheticInputEvent<*>) => {
    const alt = ev.target.value;
    const { editor, node } = this.props;
    const data = node.data.toObject();

    editor.change(change =>
      change.setNodeByKey(node.key, { data: { ...data, alt } })
    );
  };

  handleClick = (ev: SyntheticInputEvent<*>) => {
    ev.stopPropagation();
  };

  render() {
    const { attributes, editor, node, readOnly } = this.props;
    const loading = node.data.get("loading");
    const caption = node.data.get("alt");
    const src = node.data.get("src");
    const active =
      editor.value.isFocused && editor.value.selection.hasEdgeIn(node);
    const showCaption = !readOnly || caption;

    return (
      <CenteredImage>
        {!readOnly ? (
          <StyledImg
            {...attributes}
            src={src}
            alt={caption}
            active={active}
            loading={loading}
          />
        ) : (
          <ImageZoom
            image={{
              src,
              alt: caption,
              style: {
                maxWidth: "100%",
              },
              ...attributes,
            }}
            shouldRespectMaxDimension
          />
        )}
        {showCaption && (
          <Caption
            type="text"
            placeholder="Write a caption"
            onChange={this.handleChange}
            onClick={this.handleClick}
            defaultValue={caption}
            contentEditable={false}
            disabled={readOnly}
            tabIndex={-1}
          />
        )}
      </CenteredImage>
    );
  }
}

const StyledImg = styled.img`
  max-width: 100%;
  box-shadow: ${props =>
    props.active ? `0 0 0 2px ${props.theme.slate}` : "0"};
  border-radius: ${props => (props.active ? `2px` : "0")};
  opacity: ${props => (props.loading ? 0.5 : 1)};
`;

const CenteredImage = styled.span`
  display: block;
  text-align: center;
`;

const Caption = styled.input`
  border: 0;
  display: block;
  font-size: 13px;
  font-style: italic;
  color: ${props => props.theme.slate};
  padding: 2px 0;
  line-height: 16px;
  text-align: center;
  width: 100%;
  outline: none;
  background: none;

  &::placeholder {
    color: ${props => props.theme.slate};
  }
`;

export default Image;
