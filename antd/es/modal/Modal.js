var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import Dialog from 'rc-dialog';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
import { getTransitionName } from '../_util/motion';
import { canUseDocElement } from '../_util/styleChecker';
import warning from '../_util/warning';
import { renderCloseIcon, renderFooter } from './PurePanel';
import useStyle from './style';
let mousePosition;
// ref: https://github.com/ant-design/ant-design/issues/15795
const getClickPosition = e => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};
// 只有点击事件支持从鼠标位置动画展开
if (canUseDocElement()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}
const Modal = props => {
  var _a;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  const handleCancel = e => {
    const {
      onCancel
    } = props;
    onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
  };
  const handleOk = e => {
    const {
      onOk
    } = props;
    onOk === null || onOk === void 0 ? void 0 : onOk(e);
  };
  process.env.NODE_ENV !== "production" ? warning(!('visible' in props), 'Modal', `\`visible\` will be removed in next major version, please use \`open\` instead.`) : void 0;
  const {
      prefixCls: customizePrefixCls,
      className,
      open,
      wrapClassName,
      centered,
      getContainer,
      closeIcon,
      focusTriggerAfterClose = true,
      // Deprecated
      visible,
      width = 520
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "open", "wrapClassName", "centered", "getContainer", "closeIcon", "focusTriggerAfterClose", "visible", "width"]);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const wrapClassNameExtended = classNames(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl'
  });
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? warning(!('visible' in props), 'Modal', '`visible` is deprecated, please use `open` instead.') : void 0;
  }
  return wrapSSR( /*#__PURE__*/React.createElement(NoCompactStyle, null, /*#__PURE__*/React.createElement(NoFormStyle, {
    status: true,
    override: true
  }, /*#__PURE__*/React.createElement(Dialog, Object.assign({
    width: width
  }, restProps, {
    getContainer: getContainer === undefined ? getContextPopupContainer : getContainer,
    prefixCls: prefixCls,
    rootClassName: hashId,
    wrapClassName: wrapClassNameExtended,
    footer: renderFooter(Object.assign(Object.assign({}, props), {
      onOk: handleOk,
      onCancel: handleCancel
    })),
    visible: open !== null && open !== void 0 ? open : visible,
    mousePosition: (_a = restProps.mousePosition) !== null && _a !== void 0 ? _a : mousePosition,
    onClose: handleCancel,
    closeIcon: renderCloseIcon(prefixCls, closeIcon),
    focusTriggerAfterClose: focusTriggerAfterClose,
    transitionName: getTransitionName(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName),
    className: classNames(hashId, className)
  })))));
};
export default Modal;