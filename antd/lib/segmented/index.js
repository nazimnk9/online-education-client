"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _rcSegmented = _interopRequireDefault(require("rc-segmented"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function isSegmentedLabeledOptionWithIcon(option) {
  return typeof option === 'object' && !!(option === null || option === void 0 ? void 0 : option.icon);
}
const Segmented = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      className,
      block,
      options = [],
      size: customSize = 'middle'
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "block", "options", "size"]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('segmented', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = (0, _style.default)(prefixCls);
  // ===================== Size =====================
  const size = React.useContext(_SizeContext.default);
  const mergedSize = customSize || size;
  // syntactic sugar to support `icon` for Segmented Item
  const extendedOptions = React.useMemo(() => options.map(option => {
    if (isSegmentedLabeledOptionWithIcon(option)) {
      const {
          icon,
          label
        } = option,
        restOption = __rest(option, ["icon", "label"]);
      return Object.assign(Object.assign({}, restOption), {
        label: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-item-icon`
        }, icon), label && /*#__PURE__*/React.createElement("span", null, label))
      });
    }
    return option;
  }), [options, prefixCls]);
  return wrapSSR( /*#__PURE__*/React.createElement(_rcSegmented.default, Object.assign({}, restProps, {
    className: (0, _classnames.default)(className, {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-lg`]: mergedSize === 'large'
    }, hashId),
    options: extendedOptions,
    ref: ref,
    prefixCls: prefixCls,
    direction: direction
  })));
});
if (process.env.NODE_ENV !== 'production') {
  Segmented.displayName = 'Segmented';
}
var _default = Segmented;
exports.default = _default;