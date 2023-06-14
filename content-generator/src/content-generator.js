"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentGenerator = void 0;
var beautiful_dom_1 = require("beautiful-dom");
var categoryNames_1 = require("./data/categoryNames");
var lorem_ipsum_1 = require("lorem-ipsum");
var ContentGenerator = /** @class */ (function () {
    function ContentGenerator(productsCount) {
        if (productsCount === void 0) { productsCount = 10; }
        this.productsCount = 0;
        this.categories = [];
        this.products = [];
        this.images = [];
        this.productsCount = productsCount;
    }
    ContentGenerator.prototype.fillCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var index, descriptionResponse, category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.categories = [];
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < categoryNames_1.categoryNames.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, fetch("https://fish-text.ru/get?number=2")];
                    case 2: return [4 /*yield*/, (_a.sent()).json()];
                    case 3:
                        descriptionResponse = _a.sent();
                        category = {
                            description: descriptionResponse.text,
                            name: categoryNames_1.categoryNames[index]
                        };
                        console.log(category);
                        this.categories.push(category);
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ContentGenerator.prototype.fillProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var maxCost, minCost, index, descriptionResponse, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.products = [];
                        return [4 /*yield*/, this.fillCategories()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getImagesFromWebTemplate()];
                    case 2:
                        _a.sent();
                        maxCost = 3000;
                        minCost = 1000;
                        index = 0;
                        _a.label = 3;
                    case 3:
                        if (!(index < this.productsCount)) return [3 /*break*/, 7];
                        return [4 /*yield*/, fetch("https://fish-text.ru/get?number=2")];
                    case 4: return [4 /*yield*/, (_a.sent()).json()];
                    case 5:
                        descriptionResponse = _a.sent();
                        product = {
                            title: (0, lorem_ipsum_1.loremIpsum)({
                                count: 2,
                                format: "plain",
                                suffix: ""
                            }),
                            cost: Math.floor(Math.random() * (maxCost - minCost + 1)) + minCost,
                            description: descriptionResponse.text,
                            category: this.categories[Math.floor(Math.random() * (this.categories.length + 1))],
                            image: this.images[Math.floor(Math.random() * (this.images.length + 1))]
                        };
                        console.log(product);
                        this.products.push(product);
                        _a.label = 6;
                    case 6:
                        index++;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ContentGenerator.prototype.getImagesFromWebTemplate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, document, imageWrappers, index, imageAttribute, image;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.images = [];
                        return [4 /*yield*/, fetch("https://ld-wt73.template-help.com/tf/beans/coffe/catalog.html")];
                    case 1: return [4 /*yield*/, (_a.sent()).text()];
                    case 2:
                        response = _a.sent();
                        document = new beautiful_dom_1.default(response);
                        imageWrappers = document.getElementsByClassName("product-img-wrap");
                        for (index = 0; index < imageWrappers.length; index++) {
                            imageAttribute = imageWrappers[index].getElementsByTagName("a")[0].getElementsByTagName("img")[0];
                            image = "https://ld-wt73.template-help.com/tf/beans/coffe/".concat(imageAttribute.getAttribute("src"));
                            console.log(image);
                            this.images.push(image);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ContentGenerator;
}());
exports.ContentGenerator = ContentGenerator;
