var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classNames from 'classnames';
import { debounce } from 'throttle-debounce';
import omit from "rc-util/es/omit";
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { cloneElement, isValidElement } from '../_util/reactNode';
import useStyle from './style/index';
const SpinSizes = ['small', 'default', 'large'];
// Render indicator
let defaultIndicator = null;
function renderIndicator(prefixCls, props) {
  const {
    indicator
  } = props;
  const dotClassName = `${prefixCls}-dot`;
  // should not be render default indicator when indicator value is null
  if (indicator === null) {
    return null;
  }
  if (isValidElement(indicator)) {
    return cloneElement(indicator, {
      className: classNames(indicator.props.className, dotClassName)
    });
  }
  if (isValidElement(defaultIndicator)) {
    return cloneElement(defaultIndicator, {
      className: classNames(defaultIndicator.props.className, dotClassName)
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    className: classNames(dotClassName, `${prefixCls}-dot-spin`)
  }, /*#__PURE__*/React.createElement("i", {
    className: `${prefixCls}-dot-item`
  }), /*#__PURE__*/React.createElement("i", {
    className: `${prefixCls}-dot-item`
  }), /*#__PURE__*/React.createElement("i", {
    className: `${prefixCls}-dot-item`
  }), /*#__PURE__*/React.createElement("i", {
    className: `${prefixCls}-dot-item`
  }));
}
function shouldDelay(spinning, delay) {
  return !!spinning && !!delay && !isNaN(Number(delay));
}
const Spin = props => {
  const {
      spinPrefixCls: prefixCls,
      spinning: customSpinning = true,
      delay = 0,
      className,
      size = 'default',
      tip,
      wrapperClassName,
      style,
      children,
      hashId
    } = props,
    restProps = __rest(props, ["spinPrefixCls", "spinning", "delay", "className", "size", "tip", "wrapperClassName", "style", "children", "hashId"]);
  const [spinning, setSpinning] = React.useState(() => customSpinning && !shouldDelay(customSpinning, delay));
  React.useEffect(() => {
    const updateSpinning = debounce(delay, () => {
      setSpinning(customSpinning);
    });
    updateSpinning();
    return () => {
      var _a;
      (_a = updateSpinning === null || updateSpinning === void 0 ? void 0 : updateSpinning.cancel) === null || _a === void 0 ? void 0 : _a.call(updateSpinning);
    };
  }, [delay, customSpinning]);
  const isNestedPattern = React.useMemo(() => typeof children !== 'undefined', [children]);
  const {
    direction
  } = React.useContext(ConfigContext);
  const spinClassName = classNames(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-spinning`]: spinning,
    [`${prefixCls}-show-text`]: !!tip,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  }, className, hashId);
  const containerClassName = classNames(`${prefixCls}-container`, {
    [`${prefixCls}-blur`]: spinning
  });
  // fix https://fb.me/react-unknown-prop
  const divProps = omit(restProps, ['indicator', 'prefixCls']);
  const spinElement = /*#__PURE__*/React.createElement("div", Object.assign({}, divProps, {
    style: style,
    className: spinClassName,
    "aria-live": "polite",
    "aria-busy": spinning
  }), renderIndicator(prefixCls, props), tip ? /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-text`
  }, tip) : null);
  if (isNestedPattern) {
    return /*#__PURE__*/React.createElement("div", Object.assign({}, divProps, {
      className: classNames(`${prefixCls}-nested-loading`, wrapperClassName, hashId)
    }), spinning && /*#__PURE__*/React.createElement("div", {
      key: "loading"
    }, spinElement), /*#__PURE__*/React.createElement("div", {
      className: containerClassName,
      key: "container"
    }, children));
  }
  return spinElement;
};
const SpinFC = props => {
  const {
    prefixCls: customizePrefixCls
  } = props;
  const {
    getPrefixCls
  } = React.useContext(ConfigContext);
  const spinPrefixCls = getPrefixCls('spin', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(spinPrefixCls);
  const spinClassProps = Object.assign(Object.assign({}, props), {
    spinPrefixCls,
    hashId
  });
  return wrapSSR( /*#__PURE__*/React.createElement(Spin, Object.assign({}, spinClassProps)));
};
SpinFC.setDefaultIndicator = indicator => {
  defaultIndicator = indicator;
};
if (process.env.NODE_ENV !== 'production') {
  SpinFC.displayName = 'Spin';
}
export default SpinFC;