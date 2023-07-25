"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTitleStyles = exports.getResetStyles = exports.getLinkStyles = exports.getEllipsisStyles = exports.getEditableStyles = exports.getCopiableStyles = void 0;
var _colors = require("@ant-design/colors");
var _style = require("../../input/style");
var _style2 = require("../../style");
/*
.typography-title(@fontSize; @fontWeight; @lineHeight; @headingColor; @headingMarginBottom;) {
  margin-bottom: @headingMarginBottom;
  color: @headingColor;
  font-weight: @fontWeight;
  fontSize: @fontSize;
  line-height: @lineHeight;
}
*/

// eslint-disable-next-line import/prefer-default-export
const getTitleStyle = (fontSize, lineHeight, color, token) => {
  const {
    sizeMarginHeadingVerticalEnd,
    fontWeightStrong
  } = token;
  return {
    marginBottom: sizeMarginHeadingVerticalEnd,
    color,
    fontWeight: fontWeightStrong,
    fontSize,
    lineHeight
  };
};
// eslint-disable-next-line import/prefer-default-export
const getTitleStyles = token => {
  const headings = [1, 2, 3, 4, 5];
  const styles = {};
  headings.forEach(headingLevel => {
    styles[`
      h${headingLevel}&,
      div&-h${headingLevel},
      div&-h${headingLevel} > textarea,
      h${headingLevel}
    `] = getTitleStyle(token[`fontSizeHeading${headingLevel}`], token[`lineHeightHeading${headingLevel}`], token.colorTextHeading, token);
  });
  return styles;
};
exports.getTitleStyles = getTitleStyles;
const getLinkStyles = token => {
  const {
    componentCls
  } = token;
  return {
    'a&, a': Object.assign(Object.assign({}, (0, _style2.operationUnit)(token)), {
      textDecoration: token.linkDecoration,
      '&:active, &:hover': {
        textDecoration: token.linkHoverDecoration
      },
      [`&[disabled], &${componentCls}-disabled`]: {
        color: token.colorTextDisabled,
        cursor: 'not-allowed',
        '&:active, &:hover': {
          color: token.colorTextDisabled
        },
        '&:active': {
          pointerEvents: 'none'
        }
      }
    })
  };
};
exports.getLinkStyles = getLinkStyles;
const getResetStyles = () => ({
  code: {
    margin: '0 0.2em',
    paddingInline: '0.4em',
    paddingBlock: '0.2em 0.1em',
    fontSize: '85%',
    background: 'rgba(150, 150, 150, 0.1)',
    border: '1px solid rgba(100, 100, 100, 0.2)',
    borderRadius: 3
  },
  kbd: {
    margin: '0 0.2em',
    paddingInline: '0.4em',
    paddingBlock: '0.15em 0.1em',
    fontSize: '90%',
    background: 'rgba(150, 150, 150, 0.06)',
    border: '1px solid rgba(100, 100, 100, 0.2)',
    borderBottomWidth: 2,
    borderRadius: 3
  },
  mark: {
    padding: 0,
    // FIXME hardcode in v4
    backgroundColor: _colors.gold[2]
  },
  'u, ins': {
    textDecoration: 'underline',
    textDecorationSkipInk: 'auto'
  },
  's, del': {
    textDecoration: 'line-through'
  },
  strong: {
    fontWeight: 600
  },
  // list
  'ul, ol': {
    marginInline: 0,
    marginBlock: '0 1em',
    padding: 0,
    li: {
      marginInline: '20px 0',
      marginBlock: 0,
      paddingInline: '4px 0',
      paddingBlock: 0
    }
  },
  ul: {
    listStyleType: 'circle',
    ul: {
      listStyleType: 'disc'
    }
  },
  ol: {
    listStyleType: 'decimal'
  },
  // pre & block
  'pre, blockquote': {
    margin: '1em 0'
  },
  pre: {
    padding: '0.4em 0.6em',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    background: 'rgba(150, 150, 150, 0.1)',
    border: '1px solid rgba(100, 100, 100, 0.2)',
    borderRadius: 3,
    // Compatible for marked
    code: {
      display: 'inline',
      margin: 0,
      padding: 0,
      fontSize: 'inherit',
      fontFamily: 'inherit',
      background: 'transparent',
      border: 0
    }
  },
  blockquote: {
    paddingInline: '0.6em 0',
    paddingBlock: 0,
    borderInlineStart: '4px solid rgba(100, 100, 100, 0.2)',
    opacity: 0.85
  }
});
exports.getResetStyles = getResetStyles;
const getEditableStyles = token => {
  const {
    componentCls
  } = token;
  const inputToken = (0, _style.initInputToken)(token);
  const inputShift = inputToken.inputPaddingVertical + 1;
  return {
    '&-edit-content': {
      position: 'relative',
      'div&': {
        insetInlineStart: -token.paddingSM,
        marginTop: -inputShift,
        marginBottom: `calc(1em - ${inputShift}px)`
      },
      [`${componentCls}-edit-content-confirm`]: {
        position: 'absolute',
        insetInlineEnd: token.marginXS + 2,
        insetBlockEnd: token.marginXS,
        color: token.colorTextDescription,
        // default style
        fontWeight: 'normal',
        fontSize: token.fontSize,
        fontStyle: 'normal',
        pointerEvents: 'none'
      },
      textarea: {
        margin: '0!important',
        // Fix Editable Textarea flash in Firefox
        MozTransition: 'none',
        height: '1em'
      }
    }
  };
};
exports.getEditableStyles = getEditableStyles;
const getCopiableStyles = token => ({
  '&-copy-success': {
    [`
    &,
    &:hover,
    &:focus`]: {
      color: token.colorSuccess
    }
  }
});
exports.getCopiableStyles = getCopiableStyles;
const getEllipsisStyles = () => ({
  [`
  a&-ellipsis,
  span&-ellipsis
  `]: {
    display: 'inline-block',
    maxWidth: '100%'
  },
  '&-single-line': {
    whiteSpace: 'nowrap'
  },
  '&-ellipsis-single-line': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // https://blog.csdn.net/iefreer/article/details/50421025
    'a&, span&': {
      verticalAlign: 'bottom'
    }
  },
  '&-ellipsis-multiple-line': {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical'
  }
});
exports.getEllipsisStyles = getEllipsisStyles;