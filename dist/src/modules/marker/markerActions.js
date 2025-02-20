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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var markerRepository_1 = __importDefault(require("./markerRepository"));
// The B of BREAD - Browse (Read All) operation
var browse = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var markers, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, markerRepository_1.default.getMarkers()];
            case 1:
                markers = _a.sent();
                res.json(markers); // No return statement
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var read = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var markerId, marker, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.info("req.params.id:", req.params.id); // Vérifier la valeur de req.params.id
                markerId = Number(req.params.id);
                if (Number.isNaN(markerId)) {
                    res.status(400).json({ error: "Invalid marker ID" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, markerRepository_1.default.getMarkerById(markerId)];
            case 1:
                marker = _a.sent();
                if (marker == null) {
                    res.status(404).json({ error: "Item not found" }); // Correction : pas de `sendStatus`
                }
                else {
                    res.json(marker);
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var readUserMarker = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var marker, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.info("req.user:", req.user); // Vérifier la valeur de req.user
                if (!req.user || typeof req.user.id !== "number") {
                    res.status(400).json({ error: "User ID is missing or invalid" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, markerRepository_1.default.getMyMarker(req.user.id)];
            case 1:
                marker = _a.sent();
                if (marker == null) {
                    res.status(404).json({ error: "Item not found" }); // Correction : pas de `sendStatus`
                }
                else {
                    res.json(marker);
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var add = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newMarker, insertId, createdMarker, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.info("req.user:", req.user); // Vérifier si req.user est défini
                if (!req.user || typeof req.user.id !== "number") {
                    res.status(400).json({ error: "User ID is missing or invalid" });
                    return [2 /*return*/];
                }
                newMarker = {
                    lat: req.body.lat,
                    lng: req.body.lng,
                    label: req.body.label,
                    details: req.body.details,
                    user_id: req.user.id,
                };
                console.info("newMarker:", newMarker); // Vérifier la structure de newMarker
                return [4 /*yield*/, markerRepository_1.default.createMarker(newMarker)];
            case 1:
                insertId = _a.sent();
                return [4 /*yield*/, markerRepository_1.default.getMarkerById(insertId)];
            case 2:
                createdMarker = _a.sent();
                if (!createdMarker) {
                    throw new Error("Failed to fetch the newly created marker");
                }
                res.status(201).json(createdMarker);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error("Error in add marker:", err_4);
                next(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// The E of BREAD - Edit operation
var edit = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var markerId, updatedMarker, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                markerId = Number(req.params.id);
                if (Number.isNaN(markerId)) {
                    res.status(400).json({ error: "Invalid marker ID" }); // No return statement
                    return [2 /*return*/]; // Use return to exit the function
                }
                updatedMarker = {
                    id: markerId,
                    lat: req.body.lat,
                    lng: req.body.lng,
                    label: req.body.label,
                    details: req.body.details,
                    user_id: req.body.userId,
                };
                return [4 /*yield*/, markerRepository_1.default.updateMarker(updatedMarker)];
            case 1:
                result = _a.sent();
                if (result) {
                    res.status(200).json({ message: "Marker updated successfully 🎉" }); // No return statement
                }
                else {
                    res.status(404).json({ message: "Marker not found 👀" }); // No return statement
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// The D of BREAD - Delete operation
var remove = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var markerId, result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                markerId = Number(req.params.id);
                if (Number.isNaN(markerId)) {
                    res.status(400).json({ error: "Invalid marker ID" }); // No return statement
                    return [2 /*return*/]; // Use return to exit the function
                }
                return [4 /*yield*/, markerRepository_1.default.deleteMarker(markerId)];
            case 1:
                result = _a.sent();
                if (result) {
                    res.status(200).json({ message: "Marker deleted successfully 💥" }); // No return statement
                }
                else {
                    res.status(404).json({ message: "Marker not found 👀" }); // No return statement
                }
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var search = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, criterion, types, markers, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                query = typeof req.query.query === "string" ? req.query.query : undefined;
                criterion = typeof req.query.criterion === "string" ? req.query.criterion : undefined;
                types = typeof req.query.types === "string" ? req.query.types : undefined;
                // Log the extracted parameters for debugging
                console.info("Extracted parameters:", { query: query, criterion: criterion, types: types });
                // Ensure the query is a non-empty string
                if (!query || query.trim() === "") {
                    res.status(400).json({ error: "Invalid query parameter" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, markerRepository_1.default.searchMarkers(query, criterion, types)];
            case 1:
                markers = _a.sent();
                res.json(markers);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                console.error("Failed to search markers:", err_7);
                next(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = { browse: browse, read: read, readUserMarker: readUserMarker, add: add, edit: edit, remove: remove, search: search };
