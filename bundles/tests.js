/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./spec/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./spec/main.ts":
/*!**********************!*\
  !*** ./spec/main.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = __webpack_require__(/*! ../src/model/Model */ "./src/model/Model.ts");
var Actions_1 = __webpack_require__(/*! ../src/model/Actions */ "./src/model/Actions.ts");
var DockLocation_1 = __webpack_require__(/*! ../src/DockLocation */ "./src/DockLocation.ts");
describe("Tree", function () {
    it("adds a tab to center of empty tabset using add action", function () {
        var model = Model_1.default.fromJson({
            global: {},
            layout: {
                type: "row",
                id: "0",
                children: [
                    {
                        type: "tabset",
                        name: "one",
                        id: "1",
                        enableDeleteWhenEmpty: false,
                        children: []
                    }
                ]
            }
        });
        model.doAction(Actions_1.default.addNode({ id: "2", name: "newtab1", component: "grid" }, "1", DockLocation_1.default.CENTER, -1));
        var expected = {
            "global": {},
            "layout": {
                "type": "row",
                "id": "0",
                "children": [
                    {
                        "type": "tabset",
                        "name": "one",
                        "enableDeleteWhenEmpty": false,
                        "active": true,
                        "id": "1",
                        "children": [
                            {
                                "type": "tab",
                                "id": "2",
                                "name": "newtab1",
                                "component": "grid"
                            }
                        ]
                    }
                ]
            },
            "borders": []
        };
        var json = model.toJson();
        expect(json).toEqual(expected);
        console.log(JSON.stringify(json, null, "\t"));
    });
    // todo:
    // adding into tabset with position: 0, middle, end
    // adding into rows (ie splitting a tabset)
    // auto assignment of ids
    // dividers moving
    // moving tabs and tidying tree
    // removing tabs and tidying tree
    // setting attributes
});


/***/ }),

/***/ "./src/Attribute.ts":
/*!**************************!*\
  !*** ./src/Attribute.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** @hidden @internal */
var Attribute = /** @class */ (function () {
    function Attribute(name, modelName, defaultValue, alwaysWriteJson) {
        this.name = name;
        this.modelName = modelName;
        this.defaultValue = defaultValue;
        this.alwaysWriteJson = alwaysWriteJson;
        this.type = undefined;
        this.values = [];
        this.from = -99999999;
        this.to = 99999999;
    }
    Attribute.prototype.setType = function (value) {
        this.type = value;
        return this;
    };
    Attribute.prototype.setValues = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.values = args;
        return this;
    };
    Attribute.prototype.setFrom = function (value) {
        this.from = value;
        return this;
    };
    Attribute.prototype.setTo = function (value) {
        this.to = value;
        return this;
    };
    Attribute.ENUM = "Enum";
    Attribute.INT = "Int";
    Attribute.NUMBER = "Number";
    Attribute.STRING = "String";
    Attribute.BOOLEAN = "Boolean";
    Attribute.ID = "Id";
    Attribute.JSON = "Json";
    return Attribute;
}());
/** @hidden @internal */
exports.default = Attribute;


/***/ }),

/***/ "./src/AttributeDefinitions.ts":
/*!*************************************!*\
  !*** ./src/AttributeDefinitions.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Attribute_1 = __webpack_require__(/*! ./Attribute */ "./src/Attribute.ts");
/** @hidden @internal */
var AttributeDefinitions = /** @class */ (function () {
    function AttributeDefinitions() {
        this.attributes = [];
        this.nameToAttribute = {};
    }
    AttributeDefinitions.prototype.addWithAll = function (name, modelName, defaultValue, alwaysWriteJson) {
        var attr = new Attribute_1.default(name, modelName, defaultValue, alwaysWriteJson);
        this.attributes.push(attr);
        this.nameToAttribute[name] = attr;
        return attr;
    };
    AttributeDefinitions.prototype.addInherited = function (name, modelName) {
        return this.addWithAll(name, modelName, undefined, false);
    };
    AttributeDefinitions.prototype.add = function (name, defaultValue, alwaysWriteJson) {
        return this.addWithAll(name, undefined, defaultValue, alwaysWriteJson);
    };
    AttributeDefinitions.prototype.getAttributes = function () {
        return this.attributes;
    };
    AttributeDefinitions.prototype.getModelName = function (name) {
        var conversion = this.nameToAttribute[name];
        if (conversion !== undefined) {
            return conversion.modelName;
        }
        return undefined;
    };
    AttributeDefinitions.prototype.toJson = function (jsonObj, obj) {
        this.attributes.forEach(function (attr) {
            var fromValue = obj[attr.name];
            if (attr.alwaysWriteJson || fromValue !== attr.defaultValue) {
                jsonObj[attr.name] = fromValue;
            }
        });
    };
    AttributeDefinitions.prototype.fromJson = function (jsonObj, obj) {
        this.attributes.forEach(function (attr) {
            var fromValue = jsonObj[attr.name];
            if (fromValue === undefined) {
                obj[attr.name] = attr.defaultValue;
            }
            else {
                obj[attr.name] = fromValue;
            }
        });
    };
    AttributeDefinitions.prototype.update = function (jsonObj, obj) {
        this.attributes.forEach(function (attr) {
            var fromValue = jsonObj[attr.name];
            if (fromValue !== undefined) {
                obj[attr.name] = fromValue;
            }
        });
    };
    AttributeDefinitions.prototype.setDefaults = function (obj) {
        this.attributes.forEach(function (attr) {
            obj[attr.name] = attr.defaultValue;
        });
    };
    return AttributeDefinitions;
}());
/** @hidden @internal */
exports.default = AttributeDefinitions;


/***/ }),

/***/ "./src/DockLocation.ts":
/*!*****************************!*\
  !*** ./src/DockLocation.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rect_1 = __webpack_require__(/*! ./Rect */ "./src/Rect.ts");
var Orientation_1 = __webpack_require__(/*! ./Orientation */ "./src/Orientation.ts");
var DockLocation = /** @class */ (function () {
    /** @hidden @internal */
    function DockLocation(name, orientation, indexPlus) {
        this._name = name;
        this._orientation = orientation;
        this._indexPlus = indexPlus;
        DockLocation.values[this._name] = this;
    }
    DockLocation.prototype.getName = function () {
        return this._name;
    };
    DockLocation.prototype.getOrientation = function () {
        return this._orientation;
    };
    /** @hidden @internal */
    DockLocation.getByName = function (name) {
        return DockLocation.values[name];
    };
    /** @hidden @internal */
    DockLocation.getLocation = function (rect, x, y) {
        if (x < rect.x + rect.width / 4) {
            return DockLocation.LEFT;
        }
        else if (x > rect.getRight() - rect.width / 4) {
            return DockLocation.RIGHT;
        }
        else if (y < rect.y + rect.height / 4) {
            return DockLocation.TOP;
        }
        else if (y > rect.getBottom() - rect.height / 4) {
            return DockLocation.BOTTOM;
        }
        else {
            return DockLocation.CENTER;
        }
    };
    /** @hidden @internal */
    DockLocation.prototype.getDockRect = function (r) {
        if (this === DockLocation.TOP) {
            return new Rect_1.default(r.x, r.y, r.width, r.height / 2);
        }
        else if (this === DockLocation.BOTTOM) {
            return new Rect_1.default(r.x, r.getBottom() - r.height / 2, r.width, r.height / 2);
        }
        if (this === DockLocation.LEFT) {
            return new Rect_1.default(r.x, r.y, r.width / 2, r.height);
        }
        else if (this === DockLocation.RIGHT) {
            return new Rect_1.default(r.getRight() - r.width / 2, r.y, r.width / 2, r.height);
        }
        else {
            return r.clone();
        }
    };
    /** @hidden @internal */
    DockLocation.prototype.split = function (rect, size) {
        if (this === DockLocation.TOP) {
            var r1 = new Rect_1.default(rect.x, rect.y, rect.width, size);
            var r2 = new Rect_1.default(rect.x, rect.y + size, rect.width, rect.height - size);
            return { start: r1, end: r2 };
        }
        else if (this === DockLocation.LEFT) {
            var r1 = new Rect_1.default(rect.x, rect.y, size, rect.height);
            var r2 = new Rect_1.default(rect.x + size, rect.y, rect.width - size, rect.height);
            return { start: r1, end: r2 };
        }
        if (this === DockLocation.RIGHT) {
            var r1 = new Rect_1.default(rect.getRight() - size, rect.y, size, rect.height);
            var r2 = new Rect_1.default(rect.x, rect.y, rect.width - size, rect.height);
            return { start: r1, end: r2 };
        }
        else { //if (this === DockLocation.BOTTOM) {
            var r1 = new Rect_1.default(rect.x, rect.getBottom() - size, rect.width, size);
            var r2 = new Rect_1.default(rect.x, rect.y, rect.width, rect.height - size);
            return { start: r1, end: r2 };
        }
    };
    /** @hidden @internal */
    DockLocation.prototype.reflect = function () {
        if (this === DockLocation.TOP) {
            return DockLocation.BOTTOM;
        }
        else if (this === DockLocation.LEFT) {
            return DockLocation.RIGHT;
        }
        if (this === DockLocation.RIGHT) {
            return DockLocation.LEFT;
        }
        else { //if (this === DockLocation.BOTTOM) {
            return DockLocation.TOP;
        }
    };
    DockLocation.prototype.toString = function () {
        return "(DockLocation: name=" + this._name + ", orientation=" + this._orientation + ")";
    };
    DockLocation.values = {};
    DockLocation.TOP = new DockLocation("top", Orientation_1.default.VERT, 0);
    DockLocation.BOTTOM = new DockLocation("bottom", Orientation_1.default.VERT, 1);
    DockLocation.LEFT = new DockLocation("left", Orientation_1.default.HORZ, 0);
    DockLocation.RIGHT = new DockLocation("right", Orientation_1.default.HORZ, 1);
    DockLocation.CENTER = new DockLocation("center", Orientation_1.default.VERT, 0);
    return DockLocation;
}());
exports.default = DockLocation;


/***/ }),

/***/ "./src/DropInfo.ts":
/*!*************************!*\
  !*** ./src/DropInfo.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DropInfo = /** @class */ (function () {
    function DropInfo(node, rect, location, index, className) {
        this.node = node;
        this.rect = rect;
        this.location = location;
        this.index = index;
        this.className = className;
    }
    return DropInfo;
}());
exports.default = DropInfo;


/***/ }),

/***/ "./src/Orientation.ts":
/*!****************************!*\
  !*** ./src/Orientation.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Orientation = /** @class */ (function () {
    /** @hidden @internal */
    function Orientation(name) {
        this._name = name;
    }
    Orientation.flip = function (from) {
        if (from === Orientation.HORZ) {
            return Orientation.VERT;
        }
        else {
            return Orientation.HORZ;
        }
    };
    Orientation.prototype.toString = function () {
        return this._name;
    };
    Orientation.HORZ = new Orientation("horz");
    Orientation.VERT = new Orientation("vert");
    return Orientation;
}());
exports.default = Orientation;


/***/ }),

/***/ "./src/Rect.ts":
/*!*********************!*\
  !*** ./src/Rect.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Orientation_1 = __webpack_require__(/*! ./Orientation */ "./src/Orientation.ts");
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rect.empty = function () {
        return new Rect(0, 0, 0, 0);
    };
    Rect.prototype.clone = function () {
        return new Rect(this.x, this.y, this.width, this.height);
    };
    Rect.prototype.equals = function (rect) {
        if (this.x === rect.x
            && this.y === rect.y
            && this.width === rect.width
            && this.height === rect.height) {
            return true;
        }
        else {
            return false;
        }
    };
    Rect.prototype.getBottom = function () {
        return this.y + this.height;
    };
    Rect.prototype.getRight = function () {
        return this.x + this.width;
    };
    Rect.prototype.positionElement = function (element) {
        this.styleWithPosition(element.style);
    };
    Rect.prototype.styleWithPosition = function (style) {
        style.left = this.x + "px";
        style.top = this.y + "px";
        style.width = Math.max(0, this.width) + "px"; // need Math.max to prevent -ve, cause error in IE
        style.height = Math.max(0, this.height) + "px";
        style.position = "absolute";
        return style;
    };
    Rect.prototype.contains = function (x, y) {
        if (this.x <= x && x <= this.getRight()
            && this.y <= y && y <= this.getBottom()) {
            return true;
        }
        else {
            return false;
        }
    };
    Rect.prototype.removeInsets = function (insets) {
        return new Rect(this.x + insets.left, this.y + insets.top, Math.max(0, this.width - insets.left - insets.right), Math.max(0, this.height - insets.top - insets.bottom));
    };
    Rect.prototype.centerInRect = function (outerRect) {
        this.x = (outerRect.width - this.width) / 2;
        this.y = (outerRect.height - this.height) / 2;
    };
    /** @hidden @internal */
    Rect.prototype._getSize = function (orientation) {
        var prefSize = this.width;
        if (orientation === Orientation_1.default.VERT) {
            prefSize = this.height;
        }
        return prefSize;
    };
    Rect.prototype.toString = function () {
        return "(Rect: x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
    };
    return Rect;
}());
exports.default = Rect;


/***/ }),

/***/ "./src/model/Action.ts":
/*!*****************************!*\
  !*** ./src/model/Action.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Action = /** @class */ (function () {
    function Action(type, data) {
        this.type = type;
        this.data = data;
    }
    return Action;
}());
exports.default = Action;


/***/ }),

/***/ "./src/model/Actions.ts":
/*!******************************!*\
  !*** ./src/model/Actions.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = __webpack_require__(/*! ./Action */ "./src/model/Action.ts");
/**
 * The Action creator class for FlexLayout model actions
 */
var Actions = /** @class */ (function () {
    function Actions() {
    }
    /**
     * Adds a tab node to the given tabset node
     * @param json the json for the new tab node e.g {type:"tab", component:"table"}
     * @param toNodeId the new tab node will be added to the tabset with this node id
     * @param location the location where the new tab will be added, one of the DockLocation enum values.
     * @param index for docking to the center this value is the index of the tab, use -1 to add to the end.
     * @returns {{type: (string|string), json: *, toNode: *, location: (*|string), index: *}}
     */
    Actions.addNode = function (json, toNodeId, location, index) {
        return new Action_1.default(Actions.ADD_NODE, { json: json, toNode: toNodeId, location: location.getName(), index: index });
    };
    /**
     * Moves a node (tab or tabset) from one location to another
     * @param fromNodeId the id of the node to move
     * @param toNodeId the id of the node to receive the moved node
     * @param location the location where the moved node will be added, one of the DockLocation enum values.
     * @param index for docking to the center this value is the index of the tab, use -1 to add to the end.
     * @returns {{type: (string|string), fromNode: *, toNode: *, location: (*|string), index: *}}
     */
    Actions.moveNode = function (fromNodeId, toNodeId, location, index) {
        return new Action_1.default(Actions.MOVE_NODE, {
            fromNode: fromNodeId,
            toNode: toNodeId,
            location: location.getName(),
            index: index
        });
    };
    /**
     * Deletes a tab node from the layout
     * @param tabNodeId the id of the node to delete
     * @returns {{type: (string|string), node: *}}
     */
    Actions.deleteTab = function (tabNodeId) {
        return new Action_1.default(Actions.DELETE_TAB, { node: tabNodeId });
    };
    /**
     * Change the given nodes tab text
     * @param tabNodeId the id of the node to rename
     * @param text the test of the tab
     * @returns {{type: (string|string), node: *, text: *}}
     */
    Actions.renameTab = function (tabNodeId, text) {
        return new Action_1.default(Actions.RENAME_TAB, { node: tabNodeId, text: text });
    };
    /**
     * Selects the given tab in its parent tabset
     * @param tabNodeId the id of the node to set selected
     * @returns {{type: (string|string), tabNode: *}}
     */
    Actions.selectTab = function (tabNodeId) {
        return new Action_1.default(Actions.SELECT_TAB, { tabNode: tabNodeId });
    };
    /**
     * Set the given tabset node as the active tabset
     * @param tabsetNodeId the id of the tabset node to set as active
     * @returns {{type: (string|string), tabsetNode: *}}
     */
    Actions.setActiveTabset = function (tabsetNodeId) {
        return new Action_1.default(Actions.SET_ACTIVE_TABSET, { tabsetNode: tabsetNodeId });
    };
    /**
     * Adjust the splitter between two tabsets
     * @example
     *  Actions.adjustSplit({node1: "1", weight1:30, pixelWidth1:300, node2: "2", weight2:70, pixelWidth2:700});
     *
     * @param splitSpec an object the defines the new split between two tabsets, see example below.
     * @returns {{type: (string|string), node1: *, weight1: *, pixelWidth1: *, node2: *, weight2: *, pixelWidth2: *}}
     */
    Actions.adjustSplit = function (splitSpec) {
        var node1 = splitSpec.node1Id;
        var node2 = splitSpec.node2Id;
        return new Action_1.default(Actions.ADJUST_SPLIT, {
            node1: node1, weight1: splitSpec.weight1, pixelWidth1: splitSpec.pixelWidth1,
            node2: node2, weight2: splitSpec.weight2, pixelWidth2: splitSpec.pixelWidth2
        });
    };
    Actions.adjustBorderSplit = function (nodeId, pos) {
        return new Action_1.default(Actions.ADJUST_BORDER_SPLIT, { node: nodeId, pos: pos });
    };
    /**
     * Maximizes the given tabset
     * @param tabsetNodeId the id of the tabset to maximize
     * @returns {{type: (string|string), node: *}}
     */
    Actions.maximizeToggle = function (tabsetNodeId) {
        return new Action_1.default(Actions.MAXIMIZE_TOGGLE, { node: tabsetNodeId });
    };
    /**
     * Updates the global model jsone attributes
     * @param attributes the json for the model attributes to update (merge into the existing attributes)
     * @returns {{type: (string|string), json: *}}
     */
    Actions.updateModelAttributes = function (attributes) {
        return new Action_1.default(Actions.UPDATE_MODEL_ATTRIBUTES, { json: attributes });
    };
    /**
     * Updates the given nodes json attributes
     * @param nodeId the id of the node to update
     * @param attributes the json attributes to update (merge with the existing attributes)
     * @returns {{type: (string|string), node: *, json: *}}
     */
    Actions.updateNodeAttributes = function (nodeId, attributes) {
        return new Action_1.default(Actions.UPDATE_NODE_ATTRIBUTES, { node: nodeId, json: attributes });
    };
    Actions.ADD_NODE = "FlexLayout_AddNode";
    Actions.MOVE_NODE = "FlexLayout_MoveNode";
    Actions.DELETE_TAB = "FlexLayout_DeleteTab";
    Actions.RENAME_TAB = "FlexLayout_RenameTab";
    Actions.SELECT_TAB = "FlexLayout_SelectTab";
    Actions.SET_ACTIVE_TABSET = "FlexLayout_SetActiveTabset";
    Actions.ADJUST_SPLIT = "FlexLayout_AdjustSplit";
    Actions.ADJUST_BORDER_SPLIT = "FlexLayout_AdjustBorderSplit";
    Actions.MAXIMIZE_TOGGLE = "FlexLayout_MaximizeToggle";
    Actions.UPDATE_MODEL_ATTRIBUTES = "FlexLayout_UpdateModelAttributes";
    Actions.UPDATE_NODE_ATTRIBUTES = "FlexLayout_UpdateNodeAttributes";
    return Actions;
}());
exports.default = Actions;


/***/ }),

/***/ "./src/model/BorderNode.ts":
/*!*********************************!*\
  !*** ./src/model/BorderNode.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __webpack_require__(/*! ./Node */ "./src/model/Node.ts");
var Rect_1 = __webpack_require__(/*! ../Rect */ "./src/Rect.ts");
var DockLocation_1 = __webpack_require__(/*! ../DockLocation */ "./src/DockLocation.ts");
var Orientation_1 = __webpack_require__(/*! ../Orientation */ "./src/Orientation.ts");
var DropInfo_1 = __webpack_require__(/*! ../DropInfo */ "./src/DropInfo.ts");
var TabNode_1 = __webpack_require__(/*! ./TabNode */ "./src/model/TabNode.ts");
var TabSetNode_1 = __webpack_require__(/*! ./TabSetNode */ "./src/model/TabSetNode.ts");
var SplitterNode_1 = __webpack_require__(/*! ./SplitterNode */ "./src/model/SplitterNode.ts");
var Attribute_1 = __webpack_require__(/*! ../Attribute */ "./src/Attribute.ts");
var AttributeDefinitions_1 = __webpack_require__(/*! ../AttributeDefinitions */ "./src/AttributeDefinitions.ts");
var BorderNode = /** @class */ (function (_super) {
    __extends(BorderNode, _super);
    /** @hidden @internal */
    function BorderNode(location, json, model) {
        var _this = _super.call(this, model) || this;
        /** @hidden @internal */
        _this._adjustedSize = 0;
        _this._location = location;
        _this._drawChildren = [];
        _this._attributes["id"] = "border_" + location.getName();
        BorderNode._attributeDefinitions.fromJson(json, _this._attributes);
        model._addNode(_this);
        return _this;
    }
    BorderNode.prototype.getLocation = function () {
        return this._location;
    };
    BorderNode.prototype.getTabHeaderRect = function () {
        return this._tabHeaderRect;
    };
    BorderNode.prototype.getContentRect = function () {
        return this._contentRect;
    };
    BorderNode.prototype.isEnableDrop = function () {
        return this._getAttr("enableDrop");
    };
    BorderNode.prototype.getClassName = function () {
        return this._getAttributeAsStringOrUndefined("className");
    };
    BorderNode.prototype.getBorderBarSize = function () {
        return this._getAttr("barSize");
    };
    BorderNode.prototype.getSize = function () {
        return this._attributes["size"];
    };
    BorderNode.prototype.getSelected = function () {
        return this._attributes["selected"];
    };
    BorderNode.prototype.getSelectedNode = function () {
        if (this.getSelected() !== -1) {
            return this._children[this.getSelected()];
        }
        return undefined;
    };
    BorderNode.prototype.getOrientation = function () {
        return this._location.getOrientation();
    };
    BorderNode.prototype.isMaximized = function () {
        return false;
    };
    BorderNode.prototype.isShowing = function () {
        return this._attributes["show"];
    };
    /** @hidden @internal */
    BorderNode.prototype._setSelected = function (index) {
        this._attributes["selected"] = index;
    };
    /** @hidden @internal */
    BorderNode.prototype._setSize = function (pos) {
        this._attributes["size"] = pos;
    };
    /** @hidden @internal */
    BorderNode.prototype._updateAttrs = function (json) {
        BorderNode._attributeDefinitions.update(json, this._attributes);
    };
    /** @hidden @internal */
    BorderNode.prototype._getDrawChildren = function () {
        return this._drawChildren;
    };
    /** @hidden @internal */
    BorderNode.prototype._setAdjustedSize = function (size) {
        this._adjustedSize = size;
    };
    /** @hidden @internal */
    BorderNode.prototype._getAdjustedSize = function () {
        return this._adjustedSize;
    };
    /** @hidden @internal */
    BorderNode.prototype._layoutBorderOuter = function (outer) {
        var split1 = this._location.split(outer, this.getBorderBarSize()); // split border outer
        this._tabHeaderRect = split1.start;
        return split1.end;
    };
    /** @hidden @internal */
    BorderNode.prototype._layoutBorderInner = function (inner) {
        var _this = this;
        this._drawChildren = [];
        var location = this._location;
        var split1 = location.split(inner, this._adjustedSize + this._model.getSplitterSize()); // split off tab contents
        var split2 = location.reflect().split(split1.start, this._model.getSplitterSize()); // split contents into content and splitter
        this._contentRect = split2.end;
        this._children.forEach(function (child, i) {
            child._layout(_this._contentRect);
            child._setVisible(i === _this.getSelected());
            _this._drawChildren.push(child);
        });
        if (this.getSelected() == -1) {
            return inner;
        }
        else {
            var newSplitter = new SplitterNode_1.default(this._model);
            newSplitter._setParent(this);
            newSplitter._setRect(split2.start);
            this._drawChildren.push(newSplitter);
            return split1.end;
        }
    };
    /** @hidden @internal */
    BorderNode.prototype._remove = function (node) {
        if (this.getSelected() !== -1) {
            var selectedNode = this._children[this.getSelected()];
            if (node === selectedNode) {
                this._setSelected(-1);
                this._removeChild(node);
            }
            else {
                this._removeChild(node);
                for (var i = 0; i < this._children.length; i++) {
                    if (this._children[i] === selectedNode) {
                        this._setSelected(i);
                        break;
                    }
                }
            }
        }
        else {
            this._removeChild(node);
        }
    };
    /** @hidden @internal */
    BorderNode.prototype.canDrop = function (dragNode, x, y) {
        if (dragNode.getType() !== TabNode_1.default.TYPE) {
            return undefined;
        }
        var dropInfo = undefined;
        var dockLocation = DockLocation_1.default.CENTER;
        if (this._tabHeaderRect.contains(x, y)) {
            if (this._location._orientation === Orientation_1.default.VERT) {
                if (this._children.length > 0) {
                    var child = this._children[0];
                    var childRect = child.getTabRect();
                    var childY = childRect.y;
                    var childHeight = childRect.height;
                    var pos = this._tabHeaderRect.x;
                    var childCenter = 0;
                    for (var i = 0; i < this._children.length; i++) {
                        child = this._children[i];
                        childRect = child.getTabRect();
                        childCenter = childRect.x + childRect.width / 2;
                        if (x >= pos && x < childCenter) {
                            var outlineRect = new Rect_1.default(childRect.x - 2, childY, 3, childHeight);
                            dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, i, "flexlayout__outline_rect");
                            break;
                        }
                        pos = childCenter;
                    }
                    if (dropInfo == undefined) {
                        var outlineRect = new Rect_1.default(childRect.getRight() - 2, childY, 3, childHeight);
                        dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, this._children.length, "flexlayout__outline_rect");
                    }
                }
                else {
                    var outlineRect = new Rect_1.default(this._tabHeaderRect.x + 1, this._tabHeaderRect.y + 2, 3, 18);
                    dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, 0, "flexlayout__outline_rect");
                }
            }
            else {
                if (this._children.length > 0) {
                    var child = this._children[0];
                    var childRect = child.getTabRect();
                    var childX = childRect.x;
                    var childWidth = childRect.width;
                    var pos = this._tabHeaderRect.y;
                    var childCenter = 0;
                    for (var i = 0; i < this._children.length; i++) {
                        child = this._children[i];
                        childRect = child.getTabRect();
                        childCenter = childRect.y + childRect.height / 2;
                        if (y >= pos && y < childCenter) {
                            var outlineRect = new Rect_1.default(childX, childRect.y - 2, childWidth, 3);
                            dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, i, "flexlayout__outline_rect");
                            break;
                        }
                        pos = childCenter;
                    }
                    if (dropInfo == undefined) {
                        var outlineRect = new Rect_1.default(childX, childRect.getBottom() - 2, childWidth, 3);
                        dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, this._children.length, "flexlayout__outline_rect");
                    }
                }
                else {
                    var outlineRect = new Rect_1.default(this._tabHeaderRect.x + 2, this._tabHeaderRect.y + 1, 18, 3);
                    dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, 0, "flexlayout__outline_rect");
                }
            }
            if (!dragNode._canDockInto(dragNode, dropInfo)) {
                return undefined;
            }
        }
        else if (this.getSelected() !== -1 && this._contentRect.contains(x, y)) {
            var outlineRect = this._contentRect;
            dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, -1, "flexlayout__outline_rect");
            if (!dragNode._canDockInto(dragNode, dropInfo)) {
                return undefined;
            }
        }
        return dropInfo;
    };
    /** @hidden @internal */
    BorderNode.prototype.drop = function (dragNode, location, index) {
        var fromIndex = 0;
        var parent = dragNode.getParent();
        if (parent !== undefined) {
            fromIndex = parent._removeChild(dragNode);
        }
        // if dropping a tab back to same tabset and moving to forward position then reduce insertion index
        if (dragNode.getType() === TabNode_1.default.TYPE && parent === this && fromIndex < index && index > 0) {
            index--;
        }
        // for the tabset/border being removed from set the selected index
        if (parent !== undefined) {
            if (parent instanceof TabSetNode_1.default) {
                parent._setSelected(0);
            }
            else if (parent instanceof BorderNode) {
                if (parent.getSelected() !== -1) {
                    if (fromIndex === parent.getSelected() && parent._children.length > 0) {
                        parent._setSelected(0);
                    }
                    else if (fromIndex < parent.getSelected()) {
                        parent._setSelected(parent.getSelected() - 1);
                    }
                    else if (fromIndex > parent.getSelected()) {
                        // leave selected index as is
                    }
                    else {
                        parent._setSelected(-1);
                    }
                }
            }
        }
        // simple_bundled dock to existing tabset
        var insertPos = index;
        if (insertPos === -1) {
            insertPos = this._children.length;
        }
        if (dragNode.getType() === TabNode_1.default.TYPE) {
            this._addChild(dragNode, insertPos);
        }
        if (this.getSelected() !== -1) { // already open
            this._setSelected(insertPos);
        }
        this._model._tidy();
    };
    /** @hidden @internal */
    BorderNode.prototype._toJson = function () {
        var json = {};
        BorderNode._attributeDefinitions.toJson(json, this._attributes);
        json.location = this._location.getName();
        json.children = this._children.map(function (child) { return child._toJson(); });
        return json;
    };
    /** @hidden @internal */
    BorderNode._fromJson = function (json, model) {
        var location = DockLocation_1.default.getByName(json.location);
        var border = new BorderNode(location, json, model);
        if (json.children) {
            border._children = json.children.map(function (jsonChild) {
                var child = TabNode_1.default._fromJson(jsonChild, model);
                child._setParent(border);
                return child;
            });
        }
        return border;
    };
    /** @hidden @internal */
    BorderNode.prototype._getSplitterBounds = function (splitter) {
        var pBounds = [0, 0];
        var outerRect = this._model._getOuterInnerRects().outer;
        var innerRect = this._model._getOuterInnerRects().inner;
        if (this._location === DockLocation_1.default.TOP) {
            pBounds[0] = outerRect.y;
            pBounds[1] = innerRect.getBottom() - splitter.getHeight();
        }
        else if (this._location === DockLocation_1.default.LEFT) {
            pBounds[0] = outerRect.x;
            pBounds[1] = innerRect.getRight() - splitter.getWidth();
        }
        else if (this._location === DockLocation_1.default.BOTTOM) {
            pBounds[0] = innerRect.y;
            pBounds[1] = outerRect.getBottom() - splitter.getHeight();
        }
        else if (this._location === DockLocation_1.default.RIGHT) {
            pBounds[0] = innerRect.x;
            pBounds[1] = outerRect.getRight() - splitter.getWidth();
        }
        return pBounds;
    };
    /** @hidden @internal */
    BorderNode.prototype._calculateSplit = function (splitter, splitterPos) {
        var pBounds = this._getSplitterBounds(splitter);
        if (this._location === DockLocation_1.default.BOTTOM || this._location === DockLocation_1.default.RIGHT) {
            return Math.max(0, pBounds[1] - splitterPos);
        }
        else {
            return Math.max(0, splitterPos - pBounds[0]);
        }
    };
    /** @hidden @internal */
    BorderNode.prototype._getAttributeDefinitions = function () {
        return BorderNode._attributeDefinitions;
    };
    /** @hidden @internal */
    BorderNode._createAttributeDefinitions = function () {
        var attributeDefinitions = new AttributeDefinitions_1.default();
        attributeDefinitions.add("type", BorderNode.TYPE, true);
        attributeDefinitions.add("size", 200);
        attributeDefinitions.add("selected", -1);
        attributeDefinitions.add("show", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.addInherited("barSize", "borderBarSize").setType(Attribute_1.default.INT).setFrom(0);
        attributeDefinitions.addInherited("enableDrop", "borderEnableDrop").setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.addInherited("className", "borderClassName").setType(Attribute_1.default.STRING);
        return attributeDefinitions;
    };
    BorderNode.TYPE = "border";
    /** @hidden @internal */
    BorderNode._attributeDefinitions = BorderNode._createAttributeDefinitions();
    return BorderNode;
}(Node_1.default));
exports.default = BorderNode;


/***/ }),

/***/ "./src/model/BorderSet.ts":
/*!********************************!*\
  !*** ./src/model/BorderSet.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BorderNode_1 = __webpack_require__(/*! ./BorderNode */ "./src/model/BorderNode.ts");
var Orientation_1 = __webpack_require__(/*! ../Orientation */ "./src/Orientation.ts");
var BorderSet = /** @class */ (function () {
    /** @hidden @internal */
    function BorderSet(model) {
        this._model = model;
        this._borders = [];
    }
    BorderSet.prototype.getBorders = function () {
        return this._borders;
    };
    /** @hidden @internal */
    BorderSet.prototype._forEachNode = function (fn) {
        this._borders.forEach(function (borderNode) {
            fn(borderNode, 0);
            borderNode.getChildren().forEach(function (node) {
                node._forEachNode(fn, 1);
            });
        });
    };
    /** @hidden @internal */
    BorderSet.prototype._toJson = function () {
        return this._borders.map(function (borderNode) { return borderNode._toJson(); });
    };
    /** @hidden @internal */
    BorderSet._fromJson = function (json, model) {
        var borderSet = new BorderSet(model);
        borderSet._borders = json.map(function (borderJson) { return BorderNode_1.default._fromJson(borderJson, model); });
        return borderSet;
    };
    /** @hidden @internal */
    BorderSet.prototype._layoutBorder = function (outerInnerRects) {
        var rect = outerInnerRects.outer;
        var height = rect.height;
        var width = rect.width;
        var sumHeight = 0;
        var sumWidth = 0;
        var adjustableHeight = 0;
        var adjustableWidth = 0;
        var showingBorders = this._borders.filter(function (border) { return border.isShowing(); });
        // sum size of borders to see they will fit
        for (var i_1 = 0; i_1 < showingBorders.length; i_1++) {
            var border = showingBorders[i_1];
            if (border.isShowing()) {
                border._setAdjustedSize(border.getSize());
                var visible = border.getSelected() !== -1;
                if (border.getLocation().getOrientation() === Orientation_1.default.HORZ) {
                    sumWidth += border.getBorderBarSize() + this._model.getSplitterSize();
                    if (visible) {
                        sumWidth += border.getSize();
                        adjustableWidth += border.getSize();
                    }
                }
                else {
                    sumHeight += border.getBorderBarSize() + this._model.getSplitterSize();
                    if (visible) {
                        sumHeight += border.getSize();
                        adjustableHeight += border.getSize();
                    }
                }
            }
        }
        // adjust border sizes if too large
        var i = 0;
        while ((sumWidth > width && adjustableWidth > 0)
            || (sumHeight > height && adjustableHeight > 0)) {
            var border = showingBorders[i];
            if (border.getSelected() !== -1) { //visible
                var size = border._getAdjustedSize();
                if (sumWidth > width && adjustableWidth > 0
                    && border.getLocation().getOrientation() === Orientation_1.default.HORZ
                    && size > 0) {
                    border._setAdjustedSize(size - 1);
                    sumWidth--;
                    adjustableWidth--;
                }
                else if (sumHeight > height && adjustableHeight > 0
                    && border.getLocation().getOrientation() === Orientation_1.default.VERT
                    && size > 0) {
                    border._setAdjustedSize(size - 1);
                    sumHeight--;
                    adjustableHeight--;
                }
            }
            i = (i + 1) % showingBorders.length;
        }
        showingBorders.forEach(function (border) {
            outerInnerRects.outer = border._layoutBorderOuter(outerInnerRects.outer);
        });
        outerInnerRects.inner = outerInnerRects.outer;
        showingBorders.forEach(function (border) {
            outerInnerRects.inner = border._layoutBorderInner(outerInnerRects.inner);
        });
        return outerInnerRects;
    };
    /** @hidden @internal */
    BorderSet.prototype._findDropTargetNode = function (dragNode, x, y) {
        for (var i = 0; i < this._borders.length; i++) {
            var border = this._borders[i];
            if (border.isShowing()) {
                var dropInfo = border.canDrop(dragNode, x, y);
                if (dropInfo !== undefined) {
                    return dropInfo;
                }
            }
        }
        return undefined;
    };
    return BorderSet;
}());
exports.default = BorderSet;


/***/ }),

/***/ "./src/model/Model.ts":
/*!****************************!*\
  !*** ./src/model/Model.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RowNode_1 = __webpack_require__(/*! ./RowNode */ "./src/model/RowNode.ts");
var Actions_1 = __webpack_require__(/*! ./Actions */ "./src/model/Actions.ts");
var TabNode_1 = __webpack_require__(/*! ./TabNode */ "./src/model/TabNode.ts");
var TabSetNode_1 = __webpack_require__(/*! ./TabSetNode */ "./src/model/TabSetNode.ts");
var BorderSet_1 = __webpack_require__(/*! ./BorderSet */ "./src/model/BorderSet.ts");
var BorderNode_1 = __webpack_require__(/*! ./BorderNode */ "./src/model/BorderNode.ts");
var DockLocation_1 = __webpack_require__(/*! ../DockLocation */ "./src/DockLocation.ts");
var AttributeDefinitions_1 = __webpack_require__(/*! ../AttributeDefinitions */ "./src/AttributeDefinitions.ts");
var Attribute_1 = __webpack_require__(/*! ../Attribute */ "./src/Attribute.ts");
var Orientation_1 = __webpack_require__(/*! ../Orientation */ "./src/Orientation.ts");
var Rect_1 = __webpack_require__(/*! ../Rect */ "./src/Rect.ts");
/**
 * Class containing the Tree of Nodes used by the FlexLayout component
 */
var Model = /** @class */ (function () {
    /**
     * 'private' constructor. Use the static method Model.fromJson(json) to create a model
     *  @hidden @internal
     */
    function Model() {
        /** @hidden @internal */
        this._borderRects = { inner: Rect_1.default.empty(), outer: Rect_1.default.empty() };
        this._attributes = {};
        this._idMap = {};
        this._nextId = 0;
        this._borders = new BorderSet_1.default(this);
    }
    /** @hidden @internal */
    Model.prototype._setChangeListener = function (listener) {
        this._changeListener = listener;
    };
    /**
     * Get the currently active tabset node
     */
    Model.prototype.getActiveTabset = function () {
        return this._activeTabSet;
    };
    /** @hidden @internal */
    Model.prototype._setActiveTabset = function (tabsetNode) {
        this._activeTabSet = tabsetNode;
    };
    /**
     * Get the currently maximized tabset node
     */
    Model.prototype.getMaximizedTabset = function () {
        return this._maximizedTabSet;
    };
    /** @hidden @internal */
    Model.prototype._setMaximizedTabset = function (tabsetNode) {
        this._maximizedTabSet = tabsetNode;
    };
    /**
     * Gets the root RowNode of the model
     * @returns {RowNode}
     */
    Model.prototype.getRoot = function () {
        return this._root;
    };
    /**
     * Gets the
     * @returns {BorderSet|*}
     */
    Model.prototype.getBorderSet = function () {
        return this._borders;
    };
    /** @hidden @internal */
    Model.prototype._getOuterInnerRects = function () {
        return this._borderRects;
    };
    /**
     * Visits all the nodes in the model and calls the given function for each
     * @param fn a function that takes visited node and a integer level as parameters
     */
    Model.prototype.visitNodes = function (fn) {
        this._borders._forEachNode(fn);
        this._root._forEachNode(fn, 0);
    };
    /**
     * Gets a node by its id
     * @param id the id to find
     */
    Model.prototype.getNodeById = function (id) {
        return this._idMap[id];
    };
    /**
     * Update the node tree by performing the given action,
     * Actions should be generated via static methods on the Actions class
     * @param action the action to perform
     */
    Model.prototype.doAction = function (action) {
        //console.log(action);
        switch (action.type) {
            case Actions_1.default.ADD_NODE:
                {
                    var newNode = new TabNode_1.default(this, action.data["json"]);
                    var toNode = this._idMap[action.data["toNode"]];
                    if (toNode instanceof TabSetNode_1.default || toNode instanceof BorderNode_1.default || toNode instanceof RowNode_1.default) {
                        toNode.drop(newNode, DockLocation_1.default.getByName(action.data["location"]), action.data["index"]);
                    }
                    break;
                }
            case Actions_1.default.MOVE_NODE:
                {
                    var fromNode = this._idMap[action.data["fromNode"]];
                    if (fromNode instanceof TabNode_1.default || fromNode instanceof TabSetNode_1.default) {
                        var toNode = this._idMap[action.data["toNode"]];
                        if (toNode instanceof TabSetNode_1.default || toNode instanceof BorderNode_1.default || toNode instanceof RowNode_1.default) {
                            toNode.drop(fromNode, DockLocation_1.default.getByName(action.data["location"]), action.data["index"]);
                        }
                    }
                    break;
                }
            case Actions_1.default.DELETE_TAB:
                {
                    var node = this._idMap[action.data["node"]];
                    if (node instanceof TabNode_1.default) {
                        delete this._idMap[action.data["node"]];
                        node._delete();
                    }
                    break;
                }
            case Actions_1.default.RENAME_TAB:
                {
                    var node = this._idMap[action.data["node"]];
                    if (node instanceof TabNode_1.default) {
                        node._setName(action.data["text"]);
                    }
                    break;
                }
            case Actions_1.default.SELECT_TAB:
                {
                    var tabNode = this._idMap[action.data["tabNode"]];
                    if (tabNode instanceof TabNode_1.default) {
                        var parent_1 = tabNode.getParent();
                        var pos = parent_1.getChildren().indexOf(tabNode);
                        if (parent_1 instanceof BorderNode_1.default) {
                            if (parent_1.getSelected() === pos) {
                                parent_1._setSelected(-1);
                            }
                            else {
                                parent_1._setSelected(pos);
                            }
                        }
                        else if (parent_1 instanceof TabSetNode_1.default) {
                            if (parent_1.getSelected() !== pos) {
                                parent_1._setSelected(pos);
                            }
                            this._activeTabSet = parent_1;
                        }
                    }
                    break;
                }
            case Actions_1.default.SET_ACTIVE_TABSET:
                {
                    var tabsetNode = this._idMap[action.data["tabsetNode"]];
                    if (tabsetNode instanceof TabSetNode_1.default) {
                        this._activeTabSet = tabsetNode;
                    }
                    break;
                }
            case Actions_1.default.ADJUST_SPLIT:
                {
                    var node1 = this._idMap[action.data["node1"]];
                    var node2 = this._idMap[action.data["node2"]];
                    if ((node1 instanceof TabSetNode_1.default || node1 instanceof RowNode_1.default) &&
                        (node2 instanceof TabSetNode_1.default || node2 instanceof RowNode_1.default)) {
                        this._adjustSplitSide(node1, action.data["weight1"], action.data["pixelWidth1"]);
                        this._adjustSplitSide(node2, action.data["weight2"], action.data["pixelWidth2"]);
                    }
                    break;
                }
            case Actions_1.default.ADJUST_BORDER_SPLIT:
                {
                    var node = this._idMap[action.data["node"]];
                    if (node instanceof BorderNode_1.default) {
                        node._setSize(action.data["pos"]);
                    }
                    break;
                }
            case Actions_1.default.MAXIMIZE_TOGGLE:
                {
                    var node = this._idMap[action.data["node"]];
                    if (node instanceof TabSetNode_1.default) {
                        if (node === this._maximizedTabSet) {
                            this._maximizedTabSet = undefined;
                        }
                        else {
                            this._maximizedTabSet = node;
                            this._activeTabSet = node;
                        }
                    }
                    break;
                }
            case Actions_1.default.UPDATE_MODEL_ATTRIBUTES:
                {
                    this._updateAttrs(action.data["json"]);
                    break;
                }
            case Actions_1.default.UPDATE_NODE_ATTRIBUTES:
                {
                    var node = this._idMap[action.data["node"]];
                    node._updateAttrs(action.data["json"]);
                    break;
                }
        }
        this._updateIdMap();
        if (this._changeListener !== undefined) {
            this._changeListener(action);
        }
    };
    /** @hidden @internal */
    Model.prototype._updateIdMap = function () {
        var _this = this;
        // regenerate idMap to stop it building up
        this._idMap = {};
        this.visitNodes(function (node) { return _this._idMap[node.getId()] = node; });
        //console.log(JSON.stringify(Object.keys(this._idMap)));
    };
    /** @hidden @internal */
    Model.prototype._adjustSplitSide = function (node, weight, pixels) {
        node._setWeight(weight);
        if (node.getWidth() != undefined && node.getOrientation() === Orientation_1.default.VERT) {
            node._updateAttrs({ width: pixels });
        }
        else if (node.getHeight() != undefined && node.getOrientation() === Orientation_1.default.HORZ) {
            node._updateAttrs({ height: pixels });
        }
    };
    /**
     * Converts the model to a json object
     * @returns {*} json object that represents this model
     */
    Model.prototype.toJson = function () {
        var json = { global: {}, layout: {} };
        Model._attributeDefinitions.toJson(json.global, this._attributes);
        // save state of nodes
        this.visitNodes(function (node) {
            node._fireEvent("save", undefined);
        });
        json.borders = this._borders._toJson();
        json.layout = this._root._toJson();
        return json;
    };
    /**
     * Loads the model from the given json object
     * @param json the json model to load
     * @returns {Model} a new Model object
     */
    Model.fromJson = function (json) {
        var model = new Model();
        Model._attributeDefinitions.fromJson(json.global, model._attributes);
        if (json.borders) {
            model._borders = BorderSet_1.default._fromJson(json.borders, model);
        }
        model._root = RowNode_1.default._fromJson(json.layout, model);
        model._tidy(); // initial tidy of node tree
        return model;
    };
    Model.prototype.getSplitterSize = function () {
        return this._attributes["splitterSize"];
    };
    Model.prototype.isEnableEdgeDock = function () {
        return this._attributes["enableEdgeDock"];
    };
    /** @hidden @internal */
    Model.prototype._addNode = function (node) {
        var id = node.getId();
        if (this._idMap[id] !== undefined) {
            throw "Error: each node must have a unique id, duplicate id: " + node.getId();
        }
        if (node.getType() !== "splitter") {
            this._idMap[id] = node;
        }
    };
    /** @hidden @internal */
    Model.prototype._layout = function (rect) {
        //let start = Date.now();
        this._borderRects = this._borders._layoutBorder({ outer: rect, inner: rect });
        rect = this._borderRects.inner.removeInsets(this._getAttribute("marginInsets"));
        this._root._layout(rect);
        return rect;
        //console.log("layout time: " + (Date.now() - start));
    };
    /** @hidden @internal */
    Model.prototype._findDropTargetNode = function (dragNode, x, y) {
        var node = this._root._findDropTargetNode(dragNode, x, y);
        if (node === undefined) {
            node = this._borders._findDropTargetNode(dragNode, x, y);
        }
        return node;
    };
    /** @hidden @internal */
    Model.prototype._tidy = function () {
        //console.log("before _tidy", this.toString());
        this._root._tidy();
        //console.log("after _tidy", this.toString());
    };
    /** @hidden @internal */
    Model.prototype._updateAttrs = function (json) {
        Model._attributeDefinitions.update(json, this._attributes);
    };
    /** @hidden @internal */
    Model.prototype._nextUniqueId = function () {
        this._nextId++;
        while (this._idMap["#" + this._nextId] !== undefined) {
            this._nextId++;
        }
        return "#" + this._nextId;
    };
    /** @hidden @internal */
    Model.prototype._getAttribute = function (name) {
        return this._attributes[name];
    };
    /**
     * Sets a function to allow/deny dropping a node
     * @param onAllowDrop function that takes the drag node and DropInfo and returns true if the drop is allowed
     */
    Model.prototype.setOnAllowDrop = function (onAllowDrop) {
        this._onAllowDrop = onAllowDrop;
    };
    /** @hidden @internal */
    Model.prototype._getOnAllowDrop = function () {
        return this._onAllowDrop;
    };
    Model.prototype.toString = function () {
        return JSON.stringify(this.toJson());
    };
    /** @hidden @internal */
    Model._createAttributeDefinitions = function () {
        var attributeDefinitions = new AttributeDefinitions_1.default();
        // splitter
        attributeDefinitions.add("splitterSize", 8).setType(Attribute_1.default.INT).setFrom(1);
        attributeDefinitions.add("enableEdgeDock", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("marginInsets", { top: 0, right: 0, bottom: 0, left: 0 }).setType(Attribute_1.default.JSON);
        // tab
        attributeDefinitions.add("tabEnableClose", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabEnableDrag", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabEnableRename", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabClassName", undefined).setType(Attribute_1.default.STRING);
        attributeDefinitions.add("tabIcon", undefined).setType(Attribute_1.default.STRING);
        attributeDefinitions.add("tabEnableRenderOnDemand", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabDragSpeed", 0.3).setType(Attribute_1.default.NUMBER);
        // tabset
        attributeDefinitions.add("tabSetEnableDeleteWhenEmpty", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabSetEnableDrop", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabSetEnableDrag", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabSetEnableDivide", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabSetEnableMaximize", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabSetClassNameTabStrip", undefined).setType(Attribute_1.default.STRING);
        attributeDefinitions.add("tabSetClassNameHeader", undefined).setType(Attribute_1.default.STRING);
        attributeDefinitions.add("tabSetEnableTabStrip", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("tabSetHeaderHeight", 20).setType(Attribute_1.default.INT).setFrom(0);
        attributeDefinitions.add("tabSetTabStripHeight", 20).setType(Attribute_1.default.INT).setFrom(0);
        attributeDefinitions.add("tabSetMarginInsets", { top: 0, right: 0, bottom: 0, left: 0 }).setType(Attribute_1.default.JSON);
        attributeDefinitions.add("tabSetBorderInsets", { top: 0, right: 0, bottom: 0, left: 0 }).setType(Attribute_1.default.JSON);
        attributeDefinitions.add("borderBarSize", 25);
        attributeDefinitions.add("borderEnableDrop", true).setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.add("borderClassName", undefined).setType(Attribute_1.default.STRING);
        return attributeDefinitions;
    };
    /** @hidden @internal */
    Model._attributeDefinitions = Model._createAttributeDefinitions();
    return Model;
}());
exports.default = Model;


/***/ }),

/***/ "./src/model/Node.ts":
/*!***************************!*\
  !*** ./src/model/Node.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rect_1 = __webpack_require__(/*! ../Rect */ "./src/Rect.ts");
var Orientation_1 = __webpack_require__(/*! ../Orientation */ "./src/Orientation.ts");
var DockLocation_1 = __webpack_require__(/*! ../DockLocation */ "./src/DockLocation.ts");
var Node = /** @class */ (function () {
    /** @hidden @internal */
    function Node(model) {
        /** @hidden @internal */
        this._dirty = false;
        /** @hidden @internal */
        this._tempSize = 0;
        this._model = model;
        this._attributes = {};
        this._children = [];
        this._fixed = false;
        this._rect = Rect_1.default.empty();
        this._visible = false;
        this._listeners = {};
    }
    /** @hidden @internal */
    Node.prototype._getAttributeAsStringOrUndefined = function (attr) {
        var value = this._attributes[attr];
        if (value !== undefined) {
            return value;
        }
        return undefined;
    };
    /** @hidden @internal */
    Node.prototype._getAttributeAsNumberOrUndefined = function (attr) {
        var value = this._attributes[attr];
        if (value !== undefined) {
            return value;
        }
        return undefined;
    };
    Node.prototype.getId = function () {
        var id = this._attributes["id"];
        if (id !== undefined) {
            return id;
        }
        id = this._model._nextUniqueId();
        this._setId(id);
        return id;
    };
    Node.prototype.getModel = function () {
        return this._model;
    };
    Node.prototype.getType = function () {
        return this._attributes["type"];
    };
    Node.prototype.getParent = function () {
        return this._parent;
    };
    Node.prototype.getChildren = function () {
        return this._children;
    };
    Node.prototype.getRect = function () {
        return this._rect;
    };
    Node.prototype.isVisible = function () {
        return this._visible;
    };
    Node.prototype.getOrientation = function () {
        if (this._parent === undefined) {
            return Orientation_1.default.HORZ;
        }
        else {
            return Orientation_1.default.flip(this._parent.getOrientation());
        }
    };
    // event can be: resize, visibility, maximize (on tabset), close
    Node.prototype.setEventListener = function (event, callback) {
        this._listeners[event] = callback;
    };
    Node.prototype.removeEventListener = function (event) {
        delete this._listeners[event];
    };
    /** @hidden @internal */
    Node.prototype._setId = function (id) {
        this._attributes["id"] = id;
    };
    /** @hidden @internal */
    Node.prototype._fireEvent = function (event, params) {
        //console.log(this._type, " fireEvent " + event + " " + JSON.stringify(params));
        if (this._listeners[event] !== undefined) {
            this._listeners[event](params);
        }
    };
    /** @hidden @internal */
    Node.prototype._getAttr = function (name) {
        var val = this._attributes[name];
        if (val === undefined) {
            var modelName = this._getAttributeDefinitions().getModelName(name);
            if (modelName !== undefined) {
                val = this._model._getAttribute(modelName);
            }
        }
        //console.log(name + "=" + val);
        return val;
    };
    /** @hidden @internal */
    Node.prototype._forEachNode = function (fn, level) {
        fn(this, level);
        level++;
        this._children.forEach(function (node) {
            node._forEachNode(fn, level);
        });
    };
    /** @hidden @internal */
    Node.prototype._setVisible = function (visible) {
        if (visible !== this._visible) {
            this._fireEvent("visibility", { visible: visible });
            this._visible = visible;
        }
    };
    /** @hidden @internal */
    Node.prototype._getDrawChildren = function () {
        return this._children;
    };
    /** @hidden @internal */
    Node.prototype._setParent = function (parent) {
        this._parent = parent;
    };
    /** @hidden @internal */
    Node.prototype._setRect = function (rect) {
        this._rect = rect;
    };
    /** @hidden @internal */
    Node.prototype._setWeight = function (weight) {
        this._attributes["weight"] = weight;
    };
    /** @hidden @internal */
    Node.prototype._setSelected = function (index) {
        this._attributes["selected"] = index;
    };
    /** @hidden @internal */
    Node.prototype._isFixed = function () {
        return this._fixed;
    };
    /** @hidden @internal */
    Node.prototype._layout = function (rect) {
        this._rect = rect;
    };
    /** @hidden @internal */
    Node.prototype._findDropTargetNode = function (dragNode, x, y) {
        var rtn = undefined;
        if (this._rect.contains(x, y)) {
            rtn = this.canDrop(dragNode, x, y);
            if (rtn === undefined) {
                if (this._children.length !== 0) {
                    for (var i = 0; i < this._children.length; i++) {
                        var child = this._children[i];
                        rtn = child._findDropTargetNode(dragNode, x, y);
                        if (rtn !== undefined) {
                            break;
                        }
                    }
                }
            }
        }
        return rtn;
    };
    /** @hidden @internal */
    Node.prototype.canDrop = function (dragNode, x, y) {
        return undefined;
    };
    /** @hidden @internal */
    Node.prototype._canDockInto = function (dragNode, dropInfo) {
        if (dropInfo != undefined) {
            if (dropInfo.location === DockLocation_1.default.CENTER && dropInfo.node.isEnableDrop() === false) {
                return false;
            }
            // prevent named tabset docking into another tabset, since this would lose the header
            if (dropInfo.location === DockLocation_1.default.CENTER && dragNode.getType() === "tabset" && dragNode.getName() !== undefined) {
                return false;
            }
            if (dropInfo.location !== DockLocation_1.default.CENTER && dropInfo.node.isEnableDivide() === false) {
                return false;
            }
            // finally check model callback to check if drop allowed
            if (this._model._getOnAllowDrop()) {
                return this._model._getOnAllowDrop()(dragNode, dropInfo);
            }
        }
        return true;
    };
    /** @hidden @internal */
    Node.prototype._removeChild = function (childNode) {
        var pos = this._children.indexOf(childNode);
        if (pos !== -1) {
            this._children.splice(pos, 1);
        }
        this._dirty = true;
        return pos;
    };
    /** @hidden @internal */
    Node.prototype._addChild = function (childNode, pos) {
        if (pos != undefined) {
            this._children.splice(pos, 0, childNode);
        }
        else {
            this._children.push(childNode);
            pos = this._children.length - 1;
        }
        childNode._parent = this;
        this._dirty = true;
        return pos;
    };
    /** @hidden @internal */
    Node.prototype._removeAll = function () {
        this._children = [];
        this._dirty = true;
    };
    /** @hidden @internal */
    Node.prototype._styleWithPosition = function (style) {
        if (style == undefined) {
            style = {};
        }
        return this._rect.styleWithPosition(style);
    };
    /** @hidden @internal */
    Node.prototype._getTempSize = function () {
        return this._tempSize;
    };
    /** @hidden @internal */
    Node.prototype._setTempSize = function (value) {
        this._tempSize = value;
    };
    /** @hidden @internal */
    Node.prototype.isEnableDivide = function () {
        return true;
    };
    /** @hidden @internal */
    Node.prototype._toAttributeString = function () {
        return JSON.stringify(this._attributes, undefined, "\t");
    };
    return Node;
}());
exports.default = Node;


/***/ }),

/***/ "./src/model/RowNode.ts":
/*!******************************!*\
  !*** ./src/model/RowNode.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Rect_1 = __webpack_require__(/*! ../Rect */ "./src/Rect.ts");
var AttributeDefinitions_1 = __webpack_require__(/*! ../AttributeDefinitions */ "./src/AttributeDefinitions.ts");
var Orientation_1 = __webpack_require__(/*! ../Orientation */ "./src/Orientation.ts");
var DockLocation_1 = __webpack_require__(/*! ../DockLocation */ "./src/DockLocation.ts");
var SplitterNode_1 = __webpack_require__(/*! ./SplitterNode */ "./src/model/SplitterNode.ts");
var Node_1 = __webpack_require__(/*! ./Node */ "./src/model/Node.ts");
var TabSetNode_1 = __webpack_require__(/*! ./TabSetNode */ "./src/model/TabSetNode.ts");
var BorderNode_1 = __webpack_require__(/*! ./BorderNode */ "./src/model/BorderNode.ts");
var DropInfo_1 = __webpack_require__(/*! ./../DropInfo */ "./src/DropInfo.ts");
var RowNode = /** @class */ (function (_super) {
    __extends(RowNode, _super);
    /** @hidden @internal */
    function RowNode(model, json) {
        var _this = _super.call(this, model) || this;
        _this._dirty = true;
        _this._drawChildren = [];
        RowNode._attributeDefinitions.fromJson(json, _this._attributes);
        model._addNode(_this);
        return _this;
    }
    RowNode.prototype.getWeight = function () {
        return this._attributes["weight"];
    };
    RowNode.prototype.getWidth = function () {
        return this._getAttributeAsNumberOrUndefined("width");
    };
    RowNode.prototype.getHeight = function () {
        return this._getAttributeAsNumberOrUndefined("height");
    };
    /** @hidden @internal */
    RowNode.prototype._setWeight = function (weight) {
        this._attributes["weight"] = weight;
    };
    /** @hidden @internal */
    RowNode.prototype._layout = function (rect) {
        _super.prototype._layout.call(this, rect);
        var pixelSize = this._rect._getSize(this.getOrientation());
        var totalWeight = 0;
        var fixedPixels = 0;
        var prefPixels = 0;
        var totalPrefWeight = 0;
        var drawChildren = this._getDrawChildren();
        for (var i = 0; i < drawChildren.length; i++) {
            var child = drawChildren[i];
            var prefSize = child._getPrefSize(this.getOrientation());
            if (child._isFixed()) {
                if (prefSize !== undefined) {
                    fixedPixels += prefSize;
                }
            }
            else {
                if (prefSize === undefined) {
                    totalWeight += child.getWeight();
                }
                else {
                    prefPixels += prefSize;
                    totalPrefWeight += child.getWeight();
                }
            }
        }
        var resizePreferred = false;
        var availablePixels = pixelSize - fixedPixels - prefPixels;
        if (availablePixels < 0) {
            availablePixels = pixelSize - fixedPixels;
            resizePreferred = true;
            totalWeight += totalPrefWeight;
        }
        // assign actual pixel sizes
        var totalSizeGiven = 0;
        var variableSize = 0;
        for (var i = 0; i < drawChildren.length; i++) {
            var child = drawChildren[i];
            var prefSize = child._getPrefSize(this.getOrientation());
            if (child._isFixed()) {
                if (prefSize !== undefined) {
                    child._setTempSize(prefSize);
                }
            }
            else {
                if (prefSize == undefined || resizePreferred) {
                    if (totalWeight === 0) {
                        child._setTempSize(0);
                    }
                    else {
                        child._setTempSize(Math.floor(availablePixels * (child.getWeight() / totalWeight)));
                    }
                    variableSize += child._getTempSize();
                }
                else {
                    child._setTempSize(prefSize);
                }
            }
            totalSizeGiven += child._getTempSize();
        }
        // adjust sizes to exactly fit
        if (variableSize > 0) {
            while (totalSizeGiven < pixelSize) {
                for (var i = 0; i < drawChildren.length; i++) {
                    var child = drawChildren[i];
                    var prefSize = child._getPrefSize(this.getOrientation());
                    if (!child._isFixed() && (prefSize === undefined || resizePreferred) && totalSizeGiven < pixelSize) {
                        child._setTempSize(child._getTempSize() + 1);
                        totalSizeGiven++;
                    }
                }
            }
        }
        // layout children
        var p = 0;
        for (var i = 0; i < drawChildren.length; i++) {
            var child = drawChildren[i];
            if (this.getOrientation() === Orientation_1.default.HORZ) {
                child._layout(new Rect_1.default(this._rect.x + p, this._rect.y, child._getTempSize(), this._rect.height));
            }
            else {
                child._layout(new Rect_1.default(this._rect.x, this._rect.y + p, this._rect.width, child._getTempSize()));
            }
            p += child._getTempSize();
        }
        return true;
    };
    /** @hidden @internal */
    RowNode.prototype._getSplitterBounds = function (splitterNode) {
        var pBounds = [0, 0];
        var drawChildren = this._getDrawChildren();
        var p = drawChildren.indexOf(splitterNode);
        if (this.getOrientation() === Orientation_1.default.HORZ) {
            pBounds[0] = drawChildren[p - 1].getRect().x;
            pBounds[1] = drawChildren[p + 1].getRect().getRight() - splitterNode.getWidth();
        }
        else {
            pBounds[0] = drawChildren[p - 1].getRect().y;
            pBounds[1] = drawChildren[p + 1].getRect().getBottom() - splitterNode.getHeight();
        }
        return pBounds;
    };
    /** @hidden @internal */
    RowNode.prototype._calculateSplit = function (splitter, splitterPos) {
        var rtn = undefined;
        var drawChildren = this._getDrawChildren();
        var p = drawChildren.indexOf(splitter);
        var pBounds = this._getSplitterBounds(splitter);
        var weightedLength = drawChildren[p - 1].getWeight() + drawChildren[p + 1].getWeight();
        var pixelWidth1 = Math.max(0, splitterPos - pBounds[0]);
        var pixelWidth2 = Math.max(0, pBounds[1] - splitterPos);
        if (pixelWidth1 + pixelWidth2 > 0) {
            var weight1 = (pixelWidth1 * weightedLength) / (pixelWidth1 + pixelWidth2);
            var weight2 = (pixelWidth2 * weightedLength) / (pixelWidth1 + pixelWidth2);
            rtn = {
                node1Id: drawChildren[p - 1].getId(), weight1: weight1, pixelWidth1: pixelWidth1,
                node2Id: drawChildren[p + 1].getId(), weight2: weight2, pixelWidth2: pixelWidth2
            };
        }
        return rtn;
    };
    /** @hidden @internal */
    RowNode.prototype._getDrawChildren = function () {
        if (this._dirty) {
            this._drawChildren = [];
            for (var i = 0; i < this._children.length; i++) {
                var child = this._children[i];
                if (i !== 0) {
                    var newSplitter = new SplitterNode_1.default(this._model);
                    newSplitter._setParent(this);
                    this._drawChildren.push(newSplitter);
                }
                this._drawChildren.push(child);
            }
            this._dirty = false;
        }
        return this._drawChildren;
    };
    /** @hidden @internal */
    RowNode.prototype._tidy = function () {
        //console.log("a", this._model.toString());
        var i = 0;
        while (i < this._children.length) {
            var child = this._children[i];
            if (child instanceof RowNode) {
                child._tidy();
                var childChildren = child.getChildren();
                if (childChildren.length === 0) {
                    this._removeChild(child);
                }
                else if (childChildren.length === 1) {
                    // hoist child/children up to this level
                    var subchild = childChildren[0];
                    this._removeChild(child);
                    if (subchild instanceof RowNode) {
                        var subChildrenTotal = 0;
                        var subChildChildren = subchild.getChildren();
                        for (var j = 0; j < subChildChildren.length; j++) {
                            var subsubChild = subChildChildren[j];
                            subChildrenTotal += subsubChild.getWeight();
                        }
                        for (var j = 0; j < subChildChildren.length; j++) {
                            var subsubChild = subChildChildren[j];
                            subsubChild._setWeight(child.getWeight() * subsubChild.getWeight() / subChildrenTotal);
                            this._addChild(subsubChild, i + j);
                        }
                    }
                    else {
                        subchild._setWeight(child.getWeight());
                        this._addChild(subchild, i);
                    }
                }
                else {
                    i++;
                }
            }
            else if (child instanceof TabSetNode_1.default && child.getChildren().length === 0) {
                if (child.isEnableDeleteWhenEmpty()) {
                    this._removeChild(child);
                }
                else {
                    i++;
                }
            }
            else {
                i++;
            }
        }
        // add tabset into empty root
        if (this === this._model.getRoot() && this._children.length === 0) {
            var child = new TabSetNode_1.default(this._model, { type: "tabset" });
            this._addChild(child);
        }
        //console.log("b", this._model.toString());
    };
    /** @hidden @internal */
    RowNode.prototype.canDrop = function (dragNode, x, y) {
        var yy = y - this._rect.y;
        var xx = x - this._rect.x;
        var w = this._rect.width;
        var h = this._rect.height;
        var margin = 10; // height of edge rect
        var half = 50; // half width of edge rect
        var dropInfo = undefined;
        if (this._model.isEnableEdgeDock() && this._parent === undefined) { // _root row
            if (x < this._rect.x + margin && (yy > h / 2 - half && yy < h / 2 + half)) {
                var dockLocation = DockLocation_1.default.LEFT;
                var outlineRect = dockLocation.getDockRect(this._rect);
                outlineRect.width = outlineRect.width / 2;
                dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, -1, "flexlayout__outline_rect_edge");
            }
            else if (x > this._rect.getRight() - margin && (yy > h / 2 - half && yy < h / 2 + half)) {
                var dockLocation = DockLocation_1.default.RIGHT;
                var outlineRect = dockLocation.getDockRect(this._rect);
                outlineRect.width = outlineRect.width / 2;
                outlineRect.x += outlineRect.width;
                dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, -1, "flexlayout__outline_rect_edge");
            }
            else if (y < this._rect.y + margin && (xx > w / 2 - half && xx < w / 2 + half)) {
                var dockLocation = DockLocation_1.default.TOP;
                var outlineRect = dockLocation.getDockRect(this._rect);
                outlineRect.height = outlineRect.height / 2;
                dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, -1, "flexlayout__outline_rect_edge");
            }
            else if (y > this._rect.getBottom() - margin && (xx > w / 2 - half && xx < w / 2 + half)) {
                var dockLocation = DockLocation_1.default.BOTTOM;
                var outlineRect = dockLocation.getDockRect(this._rect);
                outlineRect.height = outlineRect.height / 2;
                outlineRect.y += outlineRect.height;
                dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, -1, "flexlayout__outline_rect_edge");
            }
            if (dropInfo !== undefined) {
                if (!dragNode._canDockInto(dragNode, dropInfo)) {
                    return undefined;
                }
            }
        }
        return dropInfo;
    };
    /** @hidden @internal */
    RowNode.prototype.drop = function (dragNode, location, index) {
        var dockLocation = location;
        var parent = dragNode.getParent();
        if (parent) {
            parent._removeChild(dragNode);
        }
        if (parent !== undefined && parent.getType() === TabSetNode_1.default.TYPE) {
            parent._setSelected(0);
        }
        if (parent !== undefined && parent.getType() === BorderNode_1.default.TYPE) {
            parent._setSelected(-1);
        }
        var tabSet = undefined;
        if (dragNode instanceof TabSetNode_1.default) {
            tabSet = dragNode;
        }
        else {
            tabSet = new TabSetNode_1.default(this._model, {});
            tabSet._addChild(dragNode);
        }
        var size = this._children.reduce(function (sum, child) {
            return sum + child.getWeight();
        }, 0);
        if (size === 0) {
            size = 100;
        }
        tabSet._setWeight(size / 3);
        if (dockLocation === DockLocation_1.default.LEFT) {
            this._addChild(tabSet, 0);
        }
        else if (dockLocation === DockLocation_1.default.RIGHT) {
            this._addChild(tabSet);
        }
        else if (dockLocation === DockLocation_1.default.TOP) {
            var vrow = new RowNode(this._model, {});
            var hrow_1 = new RowNode(this._model, {});
            hrow_1._setWeight(75);
            tabSet._setWeight(25);
            this._children.forEach(function (child) {
                hrow_1._addChild(child);
            });
            this._removeAll();
            vrow._addChild(tabSet);
            vrow._addChild(hrow_1);
            this._addChild(vrow);
        }
        else if (dockLocation === DockLocation_1.default.BOTTOM) {
            var vrow = new RowNode(this._model, {});
            var hrow_2 = new RowNode(this._model, {});
            hrow_2._setWeight(75);
            tabSet._setWeight(25);
            this._children.forEach(function (child) {
                hrow_2._addChild(child);
            });
            this._removeAll();
            vrow._addChild(hrow_2);
            vrow._addChild(tabSet);
            this._addChild(vrow);
        }
        this._model._setActiveTabset(tabSet);
        this._model._tidy();
    };
    /** @hidden @internal */
    RowNode.prototype._toJson = function () {
        var json = {};
        RowNode._attributeDefinitions.toJson(json, this._attributes);
        json.children = [];
        this._children.forEach(function (child) {
            json.children.push(child._toJson());
        });
        return json;
    };
    /** @hidden @internal */
    RowNode._fromJson = function (json, model) {
        var newLayoutNode = new RowNode(model, json);
        if (json.children != undefined) {
            for (var i = 0; i < json.children.length; i++) {
                var jsonChild = json.children[i];
                if (jsonChild.type === TabSetNode_1.default.TYPE) {
                    var child = TabSetNode_1.default._fromJson(jsonChild, model);
                    newLayoutNode._addChild(child);
                }
                else {
                    var child = RowNode._fromJson(jsonChild, model);
                    newLayoutNode._addChild(child);
                }
            }
        }
        return newLayoutNode;
    };
    RowNode.prototype.isEnableDrop = function () {
        return true;
    };
    /** @hidden @internal */
    RowNode.prototype._getPrefSize = function (orientation) {
        var prefSize = this.getWidth();
        if (orientation === Orientation_1.default.VERT) {
            prefSize = this.getHeight();
        }
        return prefSize;
    };
    /** @hidden @internal */
    RowNode.prototype._getAttributeDefinitions = function () {
        return RowNode._attributeDefinitions;
    };
    /** @hidden @internal */
    RowNode.prototype._updateAttrs = function (json) {
        RowNode._attributeDefinitions.update(json, this._attributes);
    };
    /** @hidden @internal */
    RowNode._createAttributeDefinitions = function () {
        var attributeDefinitions = new AttributeDefinitions_1.default();
        attributeDefinitions.add("type", RowNode.TYPE, true);
        attributeDefinitions.add("id", undefined);
        attributeDefinitions.add("weight", 100);
        attributeDefinitions.add("width", undefined);
        attributeDefinitions.add("height", undefined);
        return attributeDefinitions;
    };
    RowNode.TYPE = "row";
    /** @hidden @internal */
    RowNode._attributeDefinitions = RowNode._createAttributeDefinitions();
    return RowNode;
}(Node_1.default));
exports.default = RowNode;


/***/ }),

/***/ "./src/model/SplitterNode.ts":
/*!***********************************!*\
  !*** ./src/model/SplitterNode.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __webpack_require__(/*! ./Node */ "./src/model/Node.ts");
var AttributeDefinitions_1 = __webpack_require__(/*! ../AttributeDefinitions */ "./src/AttributeDefinitions.ts");
var SplitterNode = /** @class */ (function (_super) {
    __extends(SplitterNode, _super);
    /** @hidden @internal */
    function SplitterNode(model) {
        var _this = _super.call(this, model) || this;
        _this._fixed = true;
        _this._attributes["type"] = SplitterNode.TYPE;
        model._addNode(_this);
        return _this;
    }
    /** @hidden @internal */
    SplitterNode.prototype.getWidth = function () {
        return this._model.getSplitterSize();
    };
    /** @hidden @internal */
    SplitterNode.prototype.getHeight = function () {
        return this._model.getSplitterSize();
    };
    /** @hidden @internal */
    SplitterNode.prototype.getWeight = function () {
        return 0;
    };
    /** @hidden @internal */
    SplitterNode.prototype._setWeight = function (value) {
    };
    /** @hidden @internal */
    SplitterNode.prototype._getPrefSize = function (orientation) {
        return this._model.getSplitterSize();
    };
    /** @hidden @internal */
    SplitterNode.prototype._updateAttrs = function (json) {
    };
    /** @hidden @internal */
    SplitterNode.prototype._getAttributeDefinitions = function () {
        return new AttributeDefinitions_1.default();
    };
    /** @hidden @internal */
    SplitterNode.prototype._toJson = function () {
        return undefined;
    };
    SplitterNode.TYPE = "splitter";
    return SplitterNode;
}(Node_1.default));
exports.default = SplitterNode;


/***/ }),

/***/ "./src/model/TabNode.ts":
/*!******************************!*\
  !*** ./src/model/TabNode.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Node_1 = __webpack_require__(/*! ./Node */ "./src/model/Node.ts");
var AttributeDefinitions_1 = __webpack_require__(/*! ../AttributeDefinitions */ "./src/AttributeDefinitions.ts");
var Attribute_1 = __webpack_require__(/*! ../Attribute */ "./src/Attribute.ts");
var TabNode = /** @class */ (function (_super) {
    __extends(TabNode, _super);
    /** @hidden @internal */
    function TabNode(model, json) {
        var _this = _super.call(this, model) || this;
        _this._extra = {}; // extra data added to node not saved in json
        TabNode._attributeDefinitions.fromJson(json, _this._attributes);
        model._addNode(_this);
        return _this;
    }
    TabNode.prototype.getTabRect = function () {
        return this._tabRect;
    };
    /** @hidden @internal */
    TabNode.prototype._setTabRect = function (rect) {
        this._tabRect = rect;
    };
    TabNode.prototype.getName = function () {
        return this._getAttr("name");
    };
    TabNode.prototype.getComponent = function () {
        return this._getAttributeAsStringOrUndefined("component");
    };
    /**
     * Returns the config attribute that can be used to store node specific data that
     * WILL be saved to the json. The config attribute should be changed via the action Actions.updateNodeAttributes rather
     * than directly, for example:
     * this.state.model.doAction(
     *   FlexLayout.Actions.updateNodeAttributes(node.getId(), {config:myConfigObject}));
     */
    TabNode.prototype.getConfig = function () {
        return this._attributes["config"];
    };
    /**
     * Returns an object that can be used to store transient node specific data that will
     * NOT be saved in the json.
     */
    TabNode.prototype.getExtraData = function () {
        return this._extra;
    };
    TabNode.prototype.getIcon = function () {
        return this._getAttributeAsStringOrUndefined("icon");
    };
    TabNode.prototype.isEnableClose = function () {
        return this._getAttr("enableClose");
    };
    TabNode.prototype.isEnableDrag = function () {
        return this._getAttr("enableDrag");
    };
    TabNode.prototype.isEnableRename = function () {
        return this._getAttr("enableRename");
    };
    TabNode.prototype.getClassName = function () {
        return this._getAttributeAsStringOrUndefined("className");
    };
    TabNode.prototype.isEnableRenderOnDemand = function () {
        return this._getAttr("enableRenderOnDemand");
    };
    /** @hidden @internal */
    TabNode.prototype._setName = function (name) {
        this._attributes["name"] = name;
    };
    /** @hidden @internal */
    TabNode.prototype._layout = function (rect) {
        if (!rect.equals(this._rect)) {
            this._fireEvent("resize", { rect: rect });
        }
        this._rect = rect;
    };
    /** @hidden @internal */
    TabNode.prototype._delete = function () {
        this._parent._remove(this);
        this._fireEvent("close", {});
    };
    /** @hidden @internal */
    TabNode._fromJson = function (json, model) {
        var newLayoutNode = new TabNode(model, json);
        return newLayoutNode;
    };
    /** @hidden @internal */
    TabNode.prototype._toJson = function () {
        var json = {};
        TabNode._attributeDefinitions.toJson(json, this._attributes);
        return json;
    };
    /** @hidden @internal */
    TabNode.prototype._updateAttrs = function (json) {
        TabNode._attributeDefinitions.update(json, this._attributes);
    };
    /** @hidden @internal */
    TabNode.prototype._getAttributeDefinitions = function () {
        return TabNode._attributeDefinitions;
    };
    /** @hidden @internal */
    TabNode._createAttributeDefinitions = function () {
        var attributeDefinitions = new AttributeDefinitions_1.default();
        attributeDefinitions.add("type", TabNode.TYPE, true);
        attributeDefinitions.add("id", undefined).setType(Attribute_1.default.ID);
        attributeDefinitions.add("name", "[Unnamed Tab]").setType(Attribute_1.default.STRING);
        attributeDefinitions.add("component", undefined).setType(Attribute_1.default.STRING);
        attributeDefinitions.add("config", undefined).setType(Attribute_1.default.JSON);
        attributeDefinitions.addInherited("enableClose", "tabEnableClose").setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.addInherited("enableDrag", "tabEnableDrag").setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.addInherited("enableRename", "tabEnableRename").setType(Attribute_1.default.BOOLEAN);
        attributeDefinitions.addInherited("className", "tabClassName").setType(Attribute_1.default.STRING);
        attributeDefinitions.addInherited("icon", "tabIcon").setType(Attribute_1.default.STRING);
        attributeDefinitions.addInherited("enableRenderOnDemand", "tabEnableRenderOnDemand").setType(Attribute_1.default.BOOLEAN);
        return attributeDefinitions;
    };
    TabNode.TYPE = "tab";
    /** @hidden @internal */
    TabNode._attributeDefinitions = TabNode._createAttributeDefinitions();
    return TabNode;
}(Node_1.default));
exports.default = TabNode;


/***/ }),

/***/ "./src/model/TabSetNode.ts":
/*!*********************************!*\
  !*** ./src/model/TabSetNode.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Rect_1 = __webpack_require__(/*! ../Rect */ "./src/Rect.ts");
var AttributeDefinitions_1 = __webpack_require__(/*! ../AttributeDefinitions */ "./src/AttributeDefinitions.ts");
var Attribute_1 = __webpack_require__(/*! ../Attribute */ "./src/Attribute.ts");
var DockLocation_1 = __webpack_require__(/*! ../DockLocation */ "./src/DockLocation.ts");
var DropInfo_1 = __webpack_require__(/*! ./../DropInfo */ "./src/DropInfo.ts");
var Node_1 = __webpack_require__(/*! ./Node */ "./src/model/Node.ts");
var TabNode_1 = __webpack_require__(/*! ./TabNode */ "./src/model/TabNode.ts");
var RowNode_1 = __webpack_require__(/*! ./RowNode */ "./src/model/RowNode.ts");
var BorderNode_1 = __webpack_require__(/*! ./BorderNode */ "./src/model/BorderNode.ts");
var Orientation_1 = __webpack_require__(/*! ../Orientation */ "./src/Orientation.ts");
var TabSetNode = /** @class */ (function (_super) {
    __extends(TabSetNode, _super);
    /** @hidden @internal */
    function TabSetNode(model, json) {
        var _this = _super.call(this, model) || this;
        TabSetNode._attributeDefinitions.fromJson(json, _this._attributes);
        model._addNode(_this);
        return _this;
    }
    TabSetNode.prototype.getName = function () {
        return this._getAttributeAsStringOrUndefined("name");
    };
    TabSetNode.prototype.getSelected = function () {
        var selected = this._attributes["selected"];
        if (selected !== undefined) {
            return selected;
        }
        return -1;
    };
    TabSetNode.prototype.getSelectedNode = function () {
        var selected = this.getSelected();
        if (selected !== -1) {
            return this._children[selected];
        }
        return undefined;
    };
    TabSetNode.prototype.getWeight = function () {
        return this._attributes["weight"];
    };
    TabSetNode.prototype.getWidth = function () {
        return this._getAttributeAsNumberOrUndefined("width");
    };
    TabSetNode.prototype.getHeight = function () {
        return this._getAttributeAsNumberOrUndefined("height");
    };
    TabSetNode.prototype.isMaximized = function () {
        return this._model.getMaximizedTabset() === this;
    };
    TabSetNode.prototype.isActive = function () {
        return this._model.getActiveTabset() === this;
    };
    TabSetNode.prototype.isEnableDeleteWhenEmpty = function () {
        return this._getAttr("enableDeleteWhenEmpty");
    };
    TabSetNode.prototype.isEnableDrop = function () {
        return this._getAttr("enableDrop");
    };
    TabSetNode.prototype.isEnableDrag = function () {
        return this._getAttr("enableDrag");
    };
    TabSetNode.prototype.isEnableDivide = function () {
        return this._getAttr("enableDivide");
    };
    TabSetNode.prototype.isEnableMaximize = function () {
        return this._getAttr("enableMaximize");
    };
    TabSetNode.prototype.isEnableTabStrip = function () {
        return this._getAttr("enableTabStrip");
    };
    TabSetNode.prototype.getClassNameTabStrip = function () {
        return this._getAttributeAsStringOrUndefined("classNameTabStrip");
    };
    TabSetNode.prototype.getClassNameHeader = function () {
        return this._getAttributeAsStringOrUndefined("classNameHeader");
    };
    TabSetNode.prototype.getHeaderHeight = function () {
        return this._getAttr("headerHeight");
    };
    TabSetNode.prototype.getTabStripHeight = function () {
        return this._getAttr("tabStripHeight");
    };
    /** @hidden @internal */
    TabSetNode.prototype._setWeight = function (weight) {
        this._attributes["weight"] = weight;
    };
    /** @hidden @internal */
    TabSetNode.prototype._setSelected = function (index) {
        this._attributes["selected"] = index;
    };
    /** @hidden @internal */
    TabSetNode.prototype.canDrop = function (dragNode, x, y) {
        var dropInfo = undefined;
        if (dragNode === this) {
            var dockLocation = DockLocation_1.default.CENTER;
            var outlineRect = this._tabHeaderRect;
            dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, -1, "flexlayout__outline_rect");
        }
        else if (this._contentRect.contains(x, y)) {
            var dockLocation = DockLocation_1.default.getLocation(this._contentRect, x, y);
            var outlineRect = dockLocation.getDockRect(this._rect);
            dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, -1, "flexlayout__outline_rect");
        }
        else if (this._children.length > 0 && this._tabHeaderRect != undefined && this._tabHeaderRect.contains(x, y)) {
            var child = this._children[0];
            var r = child.getTabRect();
            var yy = r.y;
            var h = r.height;
            var p = this._tabHeaderRect.x;
            var childCenter = 0;
            for (var i = 0; i < this._children.length; i++) {
                child = this._children[i];
                r = child.getTabRect();
                childCenter = r.x + r.width / 2;
                if (x >= p && x < childCenter) {
                    var dockLocation = DockLocation_1.default.CENTER;
                    var outlineRect = new Rect_1.default(r.x - 2, yy, 3, h);
                    dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, i, "flexlayout__outline_rect");
                    break;
                }
                p = childCenter;
            }
            if (dropInfo == undefined) {
                var dockLocation = DockLocation_1.default.CENTER;
                var outlineRect = new Rect_1.default(r.getRight() - 2, yy, 3, h);
                dropInfo = new DropInfo_1.default(this, outlineRect, dockLocation, this._children.length, "flexlayout__outline_rect");
            }
        }
        if (!dragNode._canDockInto(dragNode, dropInfo)) {
            return undefined;
        }
        return dropInfo;
    };
    /** @hidden @internal */
    TabSetNode.prototype._layout = function (rect) {
        var _this = this;
        if (this.isMaximized()) {
            rect = this._model.getRoot().getRect();
        }
        rect = rect.removeInsets(this._getAttr("marginInsets"));
        this._rect = rect;
        rect = rect.removeInsets(this._getAttr("borderInsets"));
        var showHeader = (this.getName() !== undefined);
        var y = 0;
        if (showHeader) {
            y += this.getHeaderHeight();
        }
        if (this.isEnableTabStrip()) {
            this._tabHeaderRect = new Rect_1.default(rect.x, rect.y + y, rect.width, this.getTabStripHeight());
            y += this.getTabStripHeight();
        }
        this._contentRect = new Rect_1.default(rect.x, rect.y + y, rect.width, rect.height - y);
        this._children.forEach(function (child, i) {
            child._layout(_this._contentRect);
            child._setVisible(i === _this.getSelected());
        });
    };
    /** @hidden @internal */
    TabSetNode.prototype._remove = function (node) {
        this._removeChild(node);
        this._model._tidy();
        this._setSelected(Math.max(0, this.getSelected() - 1));
    };
    /** @hidden @internal */
    TabSetNode.prototype.drop = function (dragNode, location, index) {
        var _this = this;
        var dockLocation = location;
        if (this === dragNode) { // tabset drop into itself
            return; // dock back to itself
        }
        var dragParent = dragNode.getParent();
        var fromIndex = 0;
        if (dragParent !== undefined) {
            fromIndex = dragParent._removeChild(dragNode);
        }
        //console.log("removed child: " + fromIndex);
        // if dropping a tab back to same tabset and moving to forward position then reduce insertion index
        if (dragNode.getType() === TabNode_1.default.TYPE && dragParent === this && fromIndex < index && index > 0) {
            index--;
        }
        // for the tabset/border being removed from set the selected index
        if (dragParent !== undefined) {
            if (dragParent.getType() === TabSetNode.TYPE) {
                dragParent._setSelected(0);
            }
            else if (dragParent.getType() === BorderNode_1.default.TYPE) {
                if (dragParent.getSelected() !== -1) {
                    if (fromIndex === dragParent.getSelected() && dragParent.getChildren().length > 0) {
                        dragParent._setSelected(0);
                    }
                    else if (fromIndex < dragParent.getSelected()) {
                        dragParent._setSelected(dragParent.getSelected() - 1);
                    }
                    else if (fromIndex > dragParent.getSelected()) {
                        // leave selected index as is
                    }
                    else {
                        dragParent._setSelected(-1);
                    }
                }
            }
        }
        // simple_bundled dock to existing tabset
        if (dockLocation === DockLocation_1.default.CENTER) {
            var insertPos_1 = index;
            if (insertPos_1 === -1) {
                insertPos_1 = this._children.length;
            }
            if (dragNode.getType() === TabNode_1.default.TYPE) {
                this._addChild(dragNode, insertPos_1);
                this._setSelected(insertPos_1);
                //console.log("added child at : " + insertPos);
            }
            else {
                dragNode.getChildren().forEach(function (child, i) {
                    _this._addChild(child, insertPos_1);
                    //console.log("added child at : " + insertPos);
                    insertPos_1++;
                });
            }
            this._model._setActiveTabset(this);
        }
        else {
            var tabSet = void 0;
            if (dragNode instanceof TabNode_1.default) {
                // create new tabset parent
                //console.log("create a new tabset");
                tabSet = new TabSetNode(this._model, {});
                tabSet._addChild(dragNode);
                //console.log("added child at end");
                dragParent = tabSet;
            }
            else {
                tabSet = dragNode;
            }
            var parentRow = this._parent;
            var pos = parentRow.getChildren().indexOf(this);
            if (parentRow.getOrientation() === dockLocation._orientation) {
                tabSet._setWeight(this.getWeight() / 2);
                this._setWeight(this.getWeight() / 2);
                //console.log("added child 50% size at: " +  pos + dockLocation.indexPlus);
                parentRow._addChild(tabSet, pos + dockLocation._indexPlus);
            }
            else {
                // create a new row to host the new tabset (it will go in the opposite direction)
                //console.log("create a new row");
                var newRow = new RowNode_1.default(this._model, {});
                newRow._setWeight(this.getWeight());
                newRow._addChild(this);
                this._setWeight(50);
                tabSet._setWeight(50);
                //console.log("added child 50% size at: " +  dockLocation.indexPlus);
                newRow._addChild(tabSet, dockLocation._indexPlus);
                parentRow._removeChild(this);
                parentRow._addChild(newRow, pos);
            }
            this._model._setActiveTabset(tabSet);
        }
        this._model._tidy();
    };
    /** @hidden @internal */
    TabSetNode.prototype._toJson = function () {
        var json = {};
        TabSetNode._attributeDefinitions.toJson(json, this._attributes);
        json.children = this._children.map(function (child) { return child._toJson(); });
        if (this.isActive()) {
            json.active = true;
        }
        if (this.isMaximized()) {
            json.maximized = true;
        }
        return json;
    };
    /** @hidden @internal */
    TabSetNode.prototype._updateAttrs = function (json) {
        TabSetNode._attributeDefinitions.update(json, this._attributes);
    };
    /** @hidden @internal */
    TabSetNode._fromJson = function (json, model) {
        var newLayoutNode = new TabSetNode(model, json);
        if (json.children != undefined) {
            json.children.forEach(function (jsonChild) {
                var child = TabNode_1.default._fromJson(jsonChild, model);
                newLayoutNode._addChild(child);
            });
        }
        if (json.maximized && json.maximized === true) {
            model._setMaximizedTabset(newLayoutNode);
        }
        if (json.active && json.active === true) {
            model._setActiveTabset(newLayoutNode);
        }
        return newLayoutNode;
    };
    /** @hidden @internal */
    TabSetNode.prototype._getAttributeDefinitions = function () {
        return TabSetNode._attributeDefinitions;
    };
    /** @hidden @internal */
    TabSetNode.prototype._getPrefSize = function (orientation) {
        var prefSize = this.getWidth();
        if (orientation === Orientation_1.default.VERT) {
            prefSize = this.getHeight();
        }
        return prefSize;
    };
    /** @hidden @internal */
    TabSetNode._createAttributeDefinitions = function () {
        var attributeDefinitions = new AttributeDefinitions_1.default();
        attributeDefinitions.add("type", TabSetNode.TYPE, true);
        attributeDefinitions.add("id", undefined).setType(Attribute_1.default.ID);
        attributeDefinitions.add("weight", 100);
        attributeDefinitions.add("width", undefined);
        attributeDefinitions.add("height", undefined);
        attributeDefinitions.add("selected", 0);
        attributeDefinitions.add("name", undefined).setType(Attribute_1.default.STRING);
        attributeDefinitions.addInherited("enableDeleteWhenEmpty", "tabSetEnableDeleteWhenEmpty");
        attributeDefinitions.addInherited("enableDrop", "tabSetEnableDrop");
        attributeDefinitions.addInherited("enableDrag", "tabSetEnableDrag");
        attributeDefinitions.addInherited("enableDivide", "tabSetEnableDivide");
        attributeDefinitions.addInherited("enableMaximize", "tabSetEnableMaximize");
        attributeDefinitions.addInherited("classNameTabStrip", "tabSetClassNameTabStrip");
        attributeDefinitions.addInherited("classNameHeader", "tabSetClassNameHeader");
        attributeDefinitions.addInherited("enableTabStrip", "tabSetEnableTabStrip");
        attributeDefinitions.addInherited("borderInsets", "tabSetBorderInsets");
        attributeDefinitions.addInherited("marginInsets", "tabSetMarginInsets");
        attributeDefinitions.addInherited("headerHeight", "tabSetHeaderHeight");
        attributeDefinitions.addInherited("tabStripHeight", "tabSetTabStripHeight");
        return attributeDefinitions;
    };
    TabSetNode.TYPE = "tabset";
    /** @hidden @internal */
    TabSetNode._attributeDefinitions = TabSetNode._createAttributeDefinitions();
    return TabSetNode;
}(Node_1.default));
exports.default = TabSetNode;


/***/ })

/******/ });
//# sourceMappingURL=tests.js.map