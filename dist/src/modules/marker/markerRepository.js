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
var client_1 = __importDefault(require("../../../database/client"));
var MarkerRepository = /** @class */ (function () {
    function MarkerRepository() {
    }
    MarkerRepository.prototype.createMarker = function (marker) {
        return __awaiter(this, void 0, void 0, function () {
            var query, values, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      INSERT INTO marker (position, label, details, user_id)\n      VALUES (ST_GeomFromText(?), ?, ?, ?)\n    ";
                        values = [
                            "POINT(".concat(marker.lat, " ").concat(marker.lng, ")"),
                            marker.label || null,
                            marker.details ? JSON.stringify(marker.details) : null, // Ensure details is a valid JSON string
                            marker.user_id,
                        ];
                        return [4 /*yield*/, client_1.default.query(query, values)];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.insertId]; // Return the ID of the newly created marker
                }
            });
        });
    };
    MarkerRepository.prototype.getMarkers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      SELECT id, ST_X(position) AS lat, ST_Y(position) AS lng, label, details, user_id\n      FROM marker\n    ";
                        return [4 /*yield*/, client_1.default.query(query)];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows.map(function (row) {
                                // Ensure details is already an object
                                var details = row.details && typeof row.details === "object" ? row.details : null;
                                return {
                                    id: row.id,
                                    lat: row.lat,
                                    lng: row.lng,
                                    label: row.label,
                                    details: details,
                                    user_id: row.user_id,
                                };
                            })];
                }
            });
        });
    };
    MarkerRepository.prototype.getMarkerById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      SELECT id, ST_X(position) AS lat, ST_Y(position) AS lng, label, details, user_id\n      FROM marker\n      WHERE id = ?\n    ";
                        return [4 /*yield*/, client_1.default.query(query, [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        if (rows.length === 0)
                            return [2 /*return*/, null];
                        row = rows[0];
                        return [2 /*return*/, {
                                id: row.id,
                                lat: row.lat,
                                lng: row.lng,
                                label: row.label,
                                details: row.details,
                                user_id: row.user_id,
                            }];
                }
            });
        });
    };
    /**
     * Get the marker created by the current user
     */
    MarkerRepository.prototype.getMyMarker = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n\t\t\tSELECT marker.id, ST_X(marker.position) AS lat, ST_Y(marker.position) AS lng, marker.label, marker.details, marker.user_id, user.username, user.email\n\t\t\tFROM marker\n\t\t\tJOIN user ON marker.user_id = user.id\n\t\t\tWHERE user_id = ?\n\t\t\n\t\t";
                        return [4 /*yield*/, client_1.default.query(query, [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        /**
                         * Return all markers created by the user
                         */
                        return [2 /*return*/, rows.map(function (row) {
                                var details = row.details && typeof row.details === "object" ? row.details : null;
                                return {
                                    id: row.id,
                                    lat: row.lat,
                                    lng: row.lng,
                                    label: row.label,
                                    details: details,
                                    user_id: row.user_id,
                                    username: row.username,
                                    email: row.email,
                                };
                            })];
                }
            });
        });
    };
    MarkerRepository.prototype.updateMarker = function (marker) {
        return __awaiter(this, void 0, void 0, function () {
            var query, values, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      UPDATE marker\n      SET position = ST_GeomFromText(?), label = ?, details = ?, user_id = ?\n      WHERE id = ?\n    ";
                        values = [
                            "POINT(".concat(marker.lat, " ").concat(marker.lng, ")"),
                            marker.label || null,
                            marker.details ? JSON.stringify(marker.details) : null,
                            marker.user_id,
                            marker.id,
                        ];
                        return [4 /*yield*/, client_1.default.query(query, values)];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.affectedRows > 0];
                }
            });
        });
    };
    MarkerRepository.prototype.deleteMarker = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "DELETE FROM marker WHERE id = ?";
                        return [4 /*yield*/, client_1.default.query(query, [id])];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.affectedRows > 0];
                }
            });
        });
    };
    MarkerRepository.prototype.searchMarkers = function (query, criterion, types) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, params, typeList, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.info("Received Parameters in searchMarkers:", {
                            query: query,
                            criterion: criterion,
                            types: types,
                        });
                        sql = "\n      SELECT id, ST_X(position) AS lat, ST_Y(position) AS lng, label, details, user_id\n      FROM marker\n      WHERE 1=1\n    ";
                        params = [];
                        // Filter by types (e.g., car, motorcycle, event)
                        if (types) {
                            typeList = types.split(",");
                            sql += " AND JSON_UNQUOTE(JSON_EXTRACT(details, '$.eventType')) IN (".concat(typeList
                                .map(function () { return "?"; })
                                .join(","), ")");
                            params.push.apply(params, typeList);
                        }
                        // Search based on the selected criterion (only if query is provided and not empty)
                        if (query && query.trim() !== "" && criterion) {
                            // Validate criterion based on types
                            if ((types === null || types === void 0 ? void 0 : types.includes("event")) && criterion !== "eventCategory") {
                                throw new Error("Invalid criterion for event type");
                            }
                            if (((types === null || types === void 0 ? void 0 : types.includes("car")) || (types === null || types === void 0 ? void 0 : types.includes("motorcycle"))) &&
                                !["brand", "model", "year"].includes(criterion)) {
                                throw new Error("Invalid criterion for car or motorcycle type");
                            }
                            switch (criterion) {
                                case "brand":
                                    sql +=
                                        " AND JSON_EXTRACT(details, '$.brand') IS NOT NULL AND JSON_UNQUOTE(JSON_EXTRACT(details, '$.brand')) LIKE ?";
                                    params.push("%".concat(query, "%"));
                                    break;
                                case "model":
                                    sql +=
                                        " AND JSON_EXTRACT(details, '$.model') IS NOT NULL AND JSON_UNQUOTE(JSON_EXTRACT(details, '$.model')) LIKE ?";
                                    params.push("%".concat(query, "%"));
                                    break;
                                case "year":
                                    sql +=
                                        " AND JSON_EXTRACT(details, '$.year') IS NOT NULL AND JSON_EXTRACT(details, '$.year') = ?";
                                    params.push(Number(query));
                                    break;
                                case "eventCategory":
                                    sql +=
                                        " AND JSON_EXTRACT(details, '$.eventCategory') IS NOT NULL AND JSON_UNQUOTE(JSON_EXTRACT(details, '$.eventCategory')) LIKE ?";
                                    params.push("%".concat(query, "%"));
                                    break;
                                default:
                                    // Fallback to searching the label
                                    sql += " AND label LIKE ?";
                                    params.push("%".concat(query, "%"));
                                    break;
                            }
                        }
                        console.info("Generated SQL Query:", sql);
                        console.info("Query Parameters:", params);
                        return [4 /*yield*/, client_1.default.query(sql, params)];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows.map(function (row) {
                                return {
                                    id: row.id,
                                    lat: row.lat,
                                    lng: row.lng,
                                    label: row.label,
                                    details: row.details,
                                    user_id: row.user_id,
                                };
                            })];
                }
            });
        });
    };
    return MarkerRepository;
}());
exports.default = new MarkerRepository();
