import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import classNames from 'classnames';
import RcDropdown from 'rc-dropdown';
import useEvent from "rc-util/es/hooks/useEvent";
import useMergedState from "rc-util/es/hooks/useMergedState";
import * as React from 'react';
import Menu from '../menu';
import { ConfigContext } from '../config-provider';
import { OverrideProvider } from '../menu/OverrideContext';
import genPurePanel from '../_util/PurePanel';
import getPlacements from '../_util/placements';
import { cloneElement } from '../_util/reactNode';
import warning from '../_util/warning';
import { NoCompactStyle } from '../space/Compact';
import DropdownButton from './dropdown-button';
import useStyle from './style';
const Placements = ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight', 'top', 'bottom'];
const Dropdown = props => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['onVisibleChange', 'onOpenChange']].forEach(_ref => {
      let [deprecatedName, newName] = _ref;
      process.env.NODE_ENV !== "production" ? warning(!(deprecatedName in props), 'Dropdown', `\`${deprecatedName}\` is deprecated which will be removed in next major version, please use \`${newName}\` instead.`) : void 0;
    });
    process.env.NODE_ENV !== "production" ? warning(!('overlay' in props), 'Dropdown', '`overlay` is deprecated. Please use `menu` instead.') : void 0;
  }
  const getTransitionName = () => {
    const rootPrefixCls = getPrefixCls();
    const {
      placement = '',
      transitionName
    } = props;
    if (transitionName !== undefined) {
      return transitionName;
    }
    if (placement.includes('top')) {
      return `${rootPrefixCls}-slide-down`;
    }
    return `${rootPrefixCls}-slide-up`;
  };
  const getPlacement = () => {
    const {
      placement
    } = props;
    if (!placement) {
      return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    }
    if (placement.includes('Center')) {
      const newPlacement = placement.slice(0, placement.indexOf('Center'));
      process.env.NODE_ENV !== "production" ? warning(!placement.includes('Center'), 'Dropdown', `You are using '${placement}' placement in Dropdown, which is deprecated. Try to use '${newPlacement}' instead.`) : void 0;
      return newPlacement;
    }
    return placement;
  };
  const {
    menu,
    arrow,
    prefixCls: customizePrefixCls,
    children,
    trigger,
    disabled,
    dropdownRender,
    getPopupContainer,
    overlayClassName,
    open,
    onOpenChange,
    // Deprecated
    visible,
    onVisibleChange,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1
  } = props;
  if (process.env.NODE_ENV !== 'production') {
    [['visible', 'open'], ['onVisibleChange', 'onOpenChange']].forEach(_ref2 => {
      let [deprecatedName, newName] = _ref2;
      process.env.NODE_ENV !== "production" ? warning(!(deprecatedName in props), 'Dropdown', `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`) : void 0;
    });
  }
  const prefixCls = getPrefixCls('dropdown', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const child = React.Children.only(children);
  const dropdownTrigger = cloneElement(child, {
    className: classNames(`${prefixCls}-trigger`, {
      [`${prefixCls}-rtl`]: direction === 'rtl'
    }, child.props.className),
    disabled
  });
  const triggerActions = disabled ? [] : trigger;
  let alignPoint;
  if (triggerActions && triggerActions.includes('contextMenu')) {
    alignPoint = true;
  }
  // =========================== Open ============================
  const [mergedOpen, setOpen] = useMergedState(false, {
    value: open !== null && open !== void 0 ? open : visible
  });
  const onInnerOpenChange = useEvent(nextOpen => {
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextOpen);
    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(nextOpen);
    setOpen(nextOpen);
  });
  // =========================== Overlay ============================
  const overlayClassNameCustomized = classNames(overlayClassName, hashId, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });
  const builtinPlacements = getPlacements({
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
    autoAdjustOverflow: true
  });
  const onMenuClick = React.useCallback(() => {
    setOpen(false);
  }, []);
  const renderOverlay = () => {
    // rc-dropdown already can process the function of overlay, but we have check logic here.
    // So we need render the element to check and pass back to rc-dropdown.
    const {
      overlay
    } = props;
    let overlayNode;
    if (menu === null || menu === void 0 ? void 0 : menu.items) {
      overlayNode = /*#__PURE__*/React.createElement(Menu, Object.assign({}, menu));
    } else if (typeof overlay === 'function') {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }
    if (dropdownRender) {
      overlayNode = dropdownRender(overlayNode);
    }
    overlayNode = React.Children.only(typeof overlayNode === 'string' ? /*#__PURE__*/React.createElement("span", null, overlayNode) : overlayNode);
    return /*#__PURE__*/React.createElement(OverrideProvider, {
      prefixCls: `${prefixCls}-menu`,
      expandIcon: /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-menu-submenu-arrow`
      }, /*#__PURE__*/React.createElement(RightOutlined, {
        className: `${prefixCls}-menu-submenu-arrow-icon`
      })),
      mode: "vertical",
      selectable: false,
      onClick: onMenuClick,
      validator: _ref3 => {
        let {
          mode
        } = _ref3;
        // Warning if use other mode
        process.env.NODE_ENV !== "production" ? warning(!mode || mode === 'vertical', 'Dropdown', `mode="${mode}" is not supported for Dropdown's Menu.`) : void 0;
      }
    }, /*#__PURE__*/React.createElement(NoCompactStyle, null, overlayNode));
  };
  // ============================ Render ============================
  return wrapSSR( /*#__PURE__*/React.createElement(RcDropdown, Object.assign({
    alignPoint: alignPoint
  }, props, {
    mouseEnterDelay: mouseEnterDelay,
    mouseLeaveDelay: mouseLeaveDelay,
    visible: mergedOpen,
    builtinPlacements: builtinPlacements,
    arrow: !!arrow,
    overlayClassName: overlayClassNameCustomized,
    prefixCls: prefixCls,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    transitionName: getTransitionName(),
    trigger: triggerActions,
    overlay: renderOverlay,
    placement: getPlacement(),
    onVisibleChange: onInnerOpenChange
  }), dropdownTrigger));
};
Dropdown.Button = DropdownButton;
// We don't care debug panel
const PurePanel = genPurePanel(Dropdown, 'dropdown', prefixCls => prefixCls);
/* istanbul ignore next */
const WrapPurePanel = props => /*#__PURE__*/React.createElement(PurePanel, Object.assign({}, props), /*#__PURE__*/React.createElement("span", null));
Dropdown._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;
if (process.env.NODE_ENV !== 'production') {
  Dropdown.displayName = 'Dropdown';
}
export default Dropdown;