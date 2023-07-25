"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tinycolor = require("@ctrl/tinycolor");
var _internal = require("../../theme/internal");
var _style = require("../../style");
// =============================== Base ===============================
const genBaseStyle = token => {
  const {
    componentCls,
    controlSize,
    dotSize,
    marginFull,
    marginPart,
    colorFillContentHover
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      position: 'relative',
      height: controlSize,
      margin: `${marginPart}px ${marginFull}px`,
      padding: 0,
      cursor: 'pointer',
      touchAction: 'none',
      [`&-vertical`]: {
        margin: `${marginFull}px ${marginPart}px`
      },
      [`${componentCls}-rail`]: {
        position: 'absolute',
        backgroundColor: token.colorFillTertiary,
        borderRadius: token.borderRadiusXS,
        transition: `background-color ${token.motionDurationMid}`
      },
      [`${componentCls}-track`]: {
        position: 'absolute',
        backgroundColor: token.colorPrimaryBorder,
        borderRadius: token.borderRadiusXS,
        transition: `background-color ${token.motionDurationMid}`
      },
      '&:hover': {
        [`${componentCls}-rail`]: {
          backgroundColor: token.colorFillSecondary
        },
        [`${componentCls}-track`]: {
          backgroundColor: token.colorPrimaryBorderHover
        },
        [`${componentCls}-dot`]: {
          borderColor: colorFillContentHover
        },
        [`${componentCls}-handle::after`]: {
          boxShadow: `0 0 0 ${token.handleLineWidth}px ${token.colorPrimaryBorderHover}`
        },
        [`${componentCls}-dot-active`]: {
          borderColor: token.colorPrimary
        }
      },
      [`${componentCls}-handle`]: {
        position: 'absolute',
        width: token.handleSize,
        height: token.handleSize,
        outline: 'none',
        [`${componentCls}-dragging`]: {
          zIndex: 1
        },
        // 扩大选区
        '&::before': {
          content: '""',
          position: 'absolute',
          insetInlineStart: -token.handleLineWidth,
          insetBlockStart: -token.handleLineWidth,
          width: token.handleSize + token.handleLineWidth * 2,
          height: token.handleSize + token.handleLineWidth * 2,
          backgroundColor: 'transparent'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: token.handleSize,
          height: token.handleSize,
          backgroundColor: token.colorBgElevated,
          boxShadow: `0 0 0 ${token.handleLineWidth}px ${token.colorPrimaryBorder}`,
          borderRadius: '50%',
          cursor: 'pointer',
          transition: `
            inset-inline-start ${token.motionDurationMid},
            inset-block-start ${token.motionDurationMid},
            width ${token.motionDurationMid},
            height ${token.motionDurationMid},
            box-shadow ${token.motionDurationMid}
          `
        },
        '&:hover, &:active, &:focus': {
          '&::before': {
            insetInlineStart: -((token.handleSizeHover - token.handleSize) / 2 + token.handleLineWidthHover),
            insetBlockStart: -((token.handleSizeHover - token.handleSize) / 2 + token.handleLineWidthHover),
            width: token.handleSizeHover + token.handleLineWidthHover * 2,
            height: token.handleSizeHover + token.handleLineWidthHover * 2
          },
          '&::after': {
            boxShadow: `0 0 0 ${token.handleLineWidthHover}px ${token.colorPrimary}`,
            width: token.handleSizeHover,
            height: token.handleSizeHover,
            insetInlineStart: (token.handleSize - token.handleSizeHover) / 2,
            insetBlockStart: (token.handleSize - token.handleSizeHover) / 2
          }
        }
      },
      [`${componentCls}-mark`]: {
        position: 'absolute',
        fontSize: token.fontSize
      },
      [`${componentCls}-mark-text`]: {
        position: 'absolute',
        display: 'inline-block',
        color: token.colorTextDescription,
        textAlign: 'center',
        wordBreak: 'keep-all',
        cursor: 'pointer',
        userSelect: 'none',
        '&-active': {
          color: token.colorText
        }
      },
      [`${componentCls}-step`]: {
        position: 'absolute',
        background: 'transparent',
        pointerEvents: 'none'
      },
      [`${componentCls}-dot`]: {
        position: 'absolute',
        width: dotSize,
        height: dotSize,
        backgroundColor: token.colorBgElevated,
        border: `${token.handleLineWidth}px solid ${token.colorBorderSecondary}`,
        borderRadius: '50%',
        cursor: 'pointer',
        transition: `border-color ${token.motionDurationSlow}`,
        '&-active': {
          borderColor: token.colorPrimaryBorder
        }
      },
      [`&${componentCls}-disabled`]: {
        cursor: 'not-allowed',
        [`${componentCls}-rail`]: {
          backgroundColor: `${token.colorFillSecondary} !important`
        },
        [`${componentCls}-track`]: {
          backgroundColor: `${token.colorTextDisabled} !important`
        },
        [`
          ${componentCls}-dot
        `]: {
          backgroundColor: token.colorBgElevated,
          borderColor: token.colorTextDisabled,
          boxShadow: 'none',
          cursor: 'not-allowed'
        },
        [`${componentCls}-handle::after`]: {
          backgroundColor: token.colorBgElevated,
          cursor: 'not-allowed',
          width: token.handleSize,
          height: token.handleSize,
          boxShadow: `0 0 0 ${token.handleLineWidth}px ${new _tinycolor.TinyColor(token.colorTextDisabled).onBackground(token.colorBgContainer).toHexString()}`,
          insetInlineStart: 0,
          insetBlockStart: 0
        },
        [`
          ${componentCls}-mark-text,
          ${componentCls}-dot
        `]: {
          cursor: `not-allowed !important`
        }
      }
    })
  };
};
// ============================ Horizontal ============================
const genDirectionStyle = (token, horizontal) => {
  const {
    componentCls,
    railSize,
    handleSize,
    dotSize
  } = token;
  const railPadding = horizontal ? 'paddingBlock' : 'paddingInline';
  const full = horizontal ? 'width' : 'height';
  const part = horizontal ? 'height' : 'width';
  const handlePos = horizontal ? 'insetBlockStart' : 'insetInlineStart';
  const markInset = horizontal ? 'top' : 'insetInlineStart';
  return {
    [railPadding]: railSize,
    [part]: railSize * 3,
    [`${componentCls}-rail`]: {
      [full]: '100%',
      [part]: railSize
    },
    [`${componentCls}-track`]: {
      [part]: railSize
    },
    [`${componentCls}-handle`]: {
      [handlePos]: (railSize * 3 - handleSize) / 2
    },
    [`${componentCls}-mark`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: handleSize,
      [full]: '100%'
    },
    [`${componentCls}-step`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: railSize,
      [full]: '100%',
      [part]: railSize
    },
    [`${componentCls}-dot`]: {
      position: 'absolute',
      [handlePos]: (railSize - dotSize) / 2
    }
  };
};
// ============================ Horizontal ============================
const genHorizontalStyle = token => {
  const {
    componentCls,
    marginPartWithMark
  } = token;
  return {
    [`${componentCls}-horizontal`]: Object.assign(Object.assign({}, genDirectionStyle(token, true)), {
      [`&${componentCls}-with-marks`]: {
        marginBottom: marginPartWithMark
      }
    })
  };
};
// ============================= Vertical =============================
const genVerticalStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-vertical`]: Object.assign(Object.assign({}, genDirectionStyle(token, false)), {
      height: '100%'
    })
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Slider', token => {
  const sliderToken = (0, _internal.mergeToken)(token, {
    marginPart: (token.controlHeight - token.controlSize) / 2,
    marginFull: token.controlSize / 2,
    marginPartWithMark: token.controlHeightLG - token.controlSize
  });
  return [genBaseStyle(sliderToken), genHorizontalStyle(sliderToken), genVerticalStyle(sliderToken)];
}, token => {
  // Handle line width is always width-er 1px
  const increaseHandleWidth = 1;
  const controlSize = token.controlHeightLG / 4;
  const controlSizeHover = token.controlHeightSM / 2;
  const handleLineWidth = token.lineWidth + increaseHandleWidth;
  const handleLineWidthHover = token.lineWidth + increaseHandleWidth * 3;
  return {
    controlSize,
    railSize: 4,
    handleSize: controlSize,
    handleSizeHover: controlSizeHover,
    dotSize: 8,
    handleLineWidth,
    handleLineWidthHover
  };
});
exports.default = _default;