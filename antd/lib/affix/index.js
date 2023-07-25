"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));
var _omit = _interopRequireDefault(require("rc-util/lib/omit"));
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _throttleByAnimationFrame = _interopRequireDefault(require("../_util/throttleByAnimationFrame"));
var _style = _interopRequireDefault(require("./style"));
var _utils = require("./utils");
function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}
var AffixStatus;
(function (AffixStatus) {
  AffixStatus[AffixStatus["None"] = 0] = "None";
  AffixStatus[AffixStatus["Prepare"] = 1] = "Prepare";
})(AffixStatus || (AffixStatus = {}));
let Affix = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Affix, _React$Component);
  var _super = (0, _createSuper2.default)(Affix);
  function Affix() {
    var _this;
    (0, _classCallCheck2.default)(this, Affix);
    _this = _super.apply(this, arguments);
    _this.state = {
      status: AffixStatus.None,
      lastAffix: false,
      prevTarget: null
    };
    _this.getOffsetTop = () => {
      const {
        offsetBottom,
        offsetTop
      } = _this.props;
      return offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop;
    };
    _this.getOffsetBottom = () => _this.props.offsetBottom;
    _this.savePlaceholderNode = node => {
      _this.placeholderNode = node;
    };
    _this.saveFixedNode = node => {
      _this.fixedNode = node;
    };
    // =================== Measure ===================
    _this.measure = () => {
      const {
        status,
        lastAffix
      } = _this.state;
      const {
        onChange
      } = _this.props;
      const targetFunc = _this.getTargetFunc();
      if (status !== AffixStatus.Prepare || !_this.fixedNode || !_this.placeholderNode || !targetFunc) {
        return;
      }
      const offsetTop = _this.getOffsetTop();
      const offsetBottom = _this.getOffsetBottom();
      const targetNode = targetFunc();
      if (!targetNode) {
        return;
      }
      const newState = {
        status: AffixStatus.None
      };
      const targetRect = (0, _utils.getTargetRect)(targetNode);
      const placeholderReact = (0, _utils.getTargetRect)(_this.placeholderNode);
      const fixedTop = (0, _utils.getFixedTop)(placeholderReact, targetRect, offsetTop);
      const fixedBottom = (0, _utils.getFixedBottom)(placeholderReact, targetRect, offsetBottom);
      if (placeholderReact.top === 0 && placeholderReact.left === 0 && placeholderReact.width === 0 && placeholderReact.height === 0) {
        return;
      }
      if (fixedTop !== undefined) {
        newState.affixStyle = {
          position: 'fixed',
          top: fixedTop,
          width: placeholderReact.width,
          height: placeholderReact.height
        };
        newState.placeholderStyle = {
          width: placeholderReact.width,
          height: placeholderReact.height
        };
      } else if (fixedBottom !== undefined) {
        newState.affixStyle = {
          position: 'fixed',
          bottom: fixedBottom,
          width: placeholderReact.width,
          height: placeholderReact.height
        };
        newState.placeholderStyle = {
          width: placeholderReact.width,
          height: placeholderReact.height
        };
      }
      newState.lastAffix = !!newState.affixStyle;
      if (onChange && lastAffix !== newState.lastAffix) {
        onChange(newState.lastAffix);
      }
      _this.setState(newState);
    };
    _this.prepareMeasure = () => {
      // event param is used before. Keep compatible ts define here.
      _this.setState({
        status: AffixStatus.Prepare,
        affixStyle: undefined,
        placeholderStyle: undefined
      });
      // Test if `updatePosition` called
      if (process.env.NODE_ENV === 'test') {
        const {
          onTestUpdatePosition
        } = _this.props;
        onTestUpdatePosition === null || onTestUpdatePosition === void 0 ? void 0 : onTestUpdatePosition();
      }
    };
    _this.updatePosition = (0, _throttleByAnimationFrame.default)(() => {
      _this.prepareMeasure();
    });
    _this.lazyUpdatePosition = (0, _throttleByAnimationFrame.default)(() => {
      const targetFunc = _this.getTargetFunc();
      const {
        affixStyle
      } = _this.state;
      // Check position change before measure to make Safari smooth
      if (targetFunc && affixStyle) {
        const offsetTop = _this.getOffsetTop();
        const offsetBottom = _this.getOffsetBottom();
        const targetNode = targetFunc();
        if (targetNode && _this.placeholderNode) {
          const targetRect = (0, _utils.getTargetRect)(targetNode);
          const placeholderReact = (0, _utils.getTargetRect)(_this.placeholderNode);
          const fixedTop = (0, _utils.getFixedTop)(placeholderReact, targetRect, offsetTop);
          const fixedBottom = (0, _utils.getFixedBottom)(placeholderReact, targetRect, offsetBottom);
          if (fixedTop !== undefined && affixStyle.top === fixedTop || fixedBottom !== undefined && affixStyle.bottom === fixedBottom) {
            return;
          }
        }
      }
      // Directly call prepare measure since it's already throttled.
      _this.prepareMeasure();
    });
    return _this;
  }
  (0, _createClass2.default)(Affix, [{
    key: "getTargetFunc",
    value: function getTargetFunc() {
      const {
        getTargetContainer
      } = this.context;
      const {
        target
      } = this.props;
      if (target !== undefined) {
        return target;
      }
      return getTargetContainer !== null && getTargetContainer !== void 0 ? getTargetContainer : getDefaultTarget;
    }
    // Event handler
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      const targetFunc = this.getTargetFunc();
      if (targetFunc) {
        // [Legacy] Wait for parent component ref has its value.
        // We should use target as directly element instead of function which makes element check hard.
        this.timeout = setTimeout(() => {
          (0, _utils.addObserveTarget)(targetFunc(), this);
          // Mock Event object.
          this.updatePosition();
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      const {
        prevTarget
      } = this.state;
      const targetFunc = this.getTargetFunc();
      const newTarget = (targetFunc === null || targetFunc === void 0 ? void 0 : targetFunc()) || null;
      if (prevTarget !== newTarget) {
        (0, _utils.removeObserveTarget)(this);
        if (newTarget) {
          (0, _utils.addObserveTarget)(newTarget, this);
          // Mock Event object.
          this.updatePosition();
        }
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          prevTarget: newTarget
        });
      }
      if (prevProps.offsetTop !== this.props.offsetTop || prevProps.offsetBottom !== this.props.offsetBottom) {
        this.updatePosition();
      }
      this.measure();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      (0, _utils.removeObserveTarget)(this);
      this.updatePosition.cancel();
      // https://github.com/ant-design/ant-design/issues/22683
      this.lazyUpdatePosition.cancel();
    }
    // =================== Render ===================
  }, {
    key: "render",
    value: function render() {
      const {
        affixStyle,
        placeholderStyle
      } = this.state;
      const {
        affixPrefixCls,
        rootClassName,
        children
      } = this.props;
      const className = (0, _classnames.default)({
        [rootClassName]: !!affixStyle,
        [affixPrefixCls]: !!affixStyle
      });
      let props = (0, _omit.default)(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange', 'affixPrefixCls', 'rootClassName']);
      // Omit this since `onTestUpdatePosition` only works on test.
      if (process.env.NODE_ENV === 'test') {
        props = (0, _omit.default)(props, ['onTestUpdatePosition']);
      }
      return /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
        onResize: this.updatePosition
      }, /*#__PURE__*/React.createElement("div", Object.assign({}, props, {
        ref: this.savePlaceholderNode
      }), affixStyle && /*#__PURE__*/React.createElement("div", {
        style: placeholderStyle,
        "aria-hidden": "true"
      }), /*#__PURE__*/React.createElement("div", {
        className: className,
        ref: this.saveFixedNode,
        style: affixStyle
      }, /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
        onResize: this.updatePosition
      }, children))));
    }
  }]);
  return Affix;
}(React.Component);
Affix.contextType = _configProvider.ConfigContext;
const AffixFC = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls
  } = props;
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const affixPrefixCls = getPrefixCls('affix', customizePrefixCls);
  const [wrapSSR, hashId] = (0, _style.default)(affixPrefixCls);
  const AffixProps = Object.assign(Object.assign({}, props), {
    affixPrefixCls,
    rootClassName: hashId
  });
  return wrapSSR( /*#__PURE__*/React.createElement(Affix, Object.assign({}, AffixProps, {
    ref: ref
  })));
});
if (process.env.NODE_ENV !== 'production') {
  AffixFC.displayName = 'Affix';
}
var _default = AffixFC;
exports.default = _default;