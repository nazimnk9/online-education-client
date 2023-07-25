var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import DownOutlined from "@ant-design/icons/es/icons/DownOutlined";
import * as React from 'react';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';
import Dropdown from '../dropdown/dropdown';
const BreadcrumbItem = props => {
  const {
      prefixCls: customizePrefixCls,
      separator = '/',
      children,
      menu,
      overlay,
      dropdownProps
    } = props,
    restProps = __rest(props, ["prefixCls", "separator", "children", "menu", "overlay", "dropdownProps"]);
  const {
    getPrefixCls
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? warning(!('overlay' in props), 'Breadcrumb.Item', '`overlay` is deprecated. Please use `menu` instead.') : void 0;
  }
  /** If overlay is have Wrap a Dropdown */
  const renderBreadcrumbNode = breadcrumbItem => {
    if (menu || overlay) {
      const mergeDropDownProps = Object.assign({}, dropdownProps);
      if ('overlay' in props) {
        mergeDropDownProps.overlay = overlay;
      }
      return /*#__PURE__*/React.createElement(Dropdown, Object.assign({
        menu: menu,
        placement: "bottom"
      }, mergeDropDownProps), /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-overlay-link`
      }, breadcrumbItem, /*#__PURE__*/React.createElement(DownOutlined, null)));
    }
    return breadcrumbItem;
  };
  let link;
  if ('href' in restProps) {
    link = /*#__PURE__*/React.createElement("a", Object.assign({
      className: `${prefixCls}-link`
    }, restProps), children);
  } else {
    link = /*#__PURE__*/React.createElement("span", Object.assign({
      className: `${prefixCls}-link`
    }, restProps), children);
  }
  // wrap to dropDown
  link = renderBreadcrumbNode(link);
  if (children !== undefined && children !== null) {
    return /*#__PURE__*/React.createElement("li", null, link, separator && /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-separator`
    }, separator));
  }
  return null;
};
BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;
export default BreadcrumbItem;