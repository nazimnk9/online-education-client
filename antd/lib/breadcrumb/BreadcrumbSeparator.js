"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
const BreadcrumbSeparator = _ref => {
  let {
    children
  } = _ref;
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb');
  return /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-separator`
  }, children || '/');
};
BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;
var _default = BreadcrumbSeparator;
exports.default = _default;