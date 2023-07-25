import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import toArray from "rc-util/es/Children/toArray";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Menu from '../menu';
import { cloneElement } from '../_util/reactNode';
import warning from '../_util/warning';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import useStyle from './style';
function getBreadcrumbName(route, params) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(new RegExp(`:(${paramsKeys})`, 'g'), (replacement, key) => params[key] || replacement);
  return name;
}
function defaultItemRender(route, params, routes, paths) {
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  return isLastItem ? /*#__PURE__*/React.createElement("span", null, name) : /*#__PURE__*/React.createElement("a", {
    href: `#/${paths.join('/')}`
  }, name);
}
const getPath = (path, params) => {
  path = (path || '').replace(/^\//, '');
  Object.keys(params).forEach(key => {
    path = path.replace(`:${key}`, params[key]);
  });
  return path;
};
const addChildPath = (paths, childPath, params) => {
  const originalPaths = _toConsumableArray(paths);
  const path = getPath(childPath || '', params);
  if (path) {
    originalPaths.push(path);
  }
  return originalPaths;
};
const Breadcrumb = _a => {
  var {
      prefixCls: customizePrefixCls,
      separator = '/',
      style,
      className,
      routes,
      children,
      itemRender = defaultItemRender,
      params = {}
    } = _a,
    restProps = __rest(_a, ["prefixCls", "separator", "style", "className", "routes", "children", "itemRender", "params"]);
  const {
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  let crumbs;
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  if (routes && routes.length > 0) {
    // generated by route
    const paths = [];
    crumbs = routes.map(route => {
      const path = getPath(route.path, params);
      if (path) {
        paths.push(path);
      }
      // generated overlay by route.children
      let overlay;
      if (route.children && route.children.length) {
        overlay = /*#__PURE__*/React.createElement(Menu, {
          items: route.children.map(child => ({
            key: child.path || child.breadcrumbName,
            label: itemRender(child, params, routes, addChildPath(paths, child.path, params))
          }))
        });
      }
      const itemProps = {
        separator
      };
      if (overlay) {
        itemProps.overlay = overlay;
      }
      return /*#__PURE__*/React.createElement(BreadcrumbItem, Object.assign({}, itemProps, {
        key: path || route.breadcrumbName
      }), itemRender(route, params, routes, paths));
    });
  } else if (children) {
    crumbs = toArray(children).map((element, index) => {
      if (!element) {
        return element;
      }
      process.env.NODE_ENV !== "production" ? warning(element.type && (element.type.__ANT_BREADCRUMB_ITEM === true || element.type.__ANT_BREADCRUMB_SEPARATOR === true), 'Breadcrumb', "Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children") : void 0;
      return cloneElement(element, {
        separator,
        key: index
      });
    });
  }
  const breadcrumbClassName = classNames(prefixCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, hashId);
  return wrapSSR( /*#__PURE__*/React.createElement("nav", Object.assign({
    className: breadcrumbClassName,
    style: style
  }, restProps), /*#__PURE__*/React.createElement("ol", null, crumbs)));
};
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;
if (process.env.NODE_ENV !== 'production') {
  Breadcrumb.displayName = 'Breadcrumb';
}
export default Breadcrumb;