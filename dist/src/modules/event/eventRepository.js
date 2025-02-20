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
var EventRepository = /** @class */ (function () {
    function EventRepository() {
    }
    // The C of CRUD - Create operation
    EventRepository.prototype.create = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("INSERT INTO event (title, type, event_picture, date_start, date_end, location, address, description, link, user_id) VALUES (?, ?, ?, ?, ?, POINT(?, ?), ?, ?, ?, ?)", [
                            event.title,
                            event.type,
                            event.event_picture,
                            event.date_start,
                            event.date_end,
                            event.location.x,
                            event.location.y,
                            event.address,
                            event.description,
                            event.link,
                            event.user_id,
                        ])];
                    case 1:
                        result = (_a.sent())[0];
                        // Return the ID of the newly inserted event
                        return [2 /*return*/, result.insertId];
                }
            });
        });
    };
    // The Rs of CRUD - Read operations
    EventRepository.prototype.read = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("SELECT e.*, u.username as creator_username\n       FROM event e\n       JOIN user u ON e.user_id = u.id\n       WHERE e.id = ?", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        // Return the first row of the result, which represents the event
                        return [2 /*return*/, rows[0]];
                }
            });
        });
    };
    EventRepository.prototype.readAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("\n      SELECT e.*, u.username as creator_username\n      FROM event e\n      JOIN user u ON e.user_id = u.id\n    ")];
                    case 1:
                        rows = (_a.sent())[0];
                        // Return the array of events with the creator's username
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    //   The U of CRUD - Update operation
    EventRepository.prototype.update = function (id, eventUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var updateFields, updateValues, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateFields = Object.entries(eventUpdate)
                            .filter(function (_a) {
                            var key = _a[0], value = _a[1];
                            return value !== undefined && key !== "location";
                        })
                            .map(function (_a) {
                            var key = _a[0], _ = _a[1];
                            return "".concat(key, " = ?");
                        })
                            .join(", ");
                        updateValues = Object.entries(eventUpdate)
                            .filter(function (_a) {
                            var key = _a[0], value = _a[1];
                            return value !== undefined && key !== "location";
                        })
                            .map(function (_a) {
                            var _ = _a[0], value = _a[1];
                            return value;
                        });
                        // Update the location field if it is provided
                        if (eventUpdate.location) {
                            updateFields += ", location = ST_GeomFromText(?)";
                            updateValues.push("POINT(".concat(eventUpdate.location.x, " ").concat(eventUpdate.location.y, ")"));
                        }
                        if (eventUpdate.event_picture !== undefined) {
                            updateFields += ", event_picture = ?";
                            updateValues.push(eventUpdate.event_picture);
                        }
                        updateValues.push(id);
                        return [4 /*yield*/, client_1.default.query("UPDATE event SET ".concat(updateFields, " WHERE id = ?"), updateValues)];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.affectedRows > 0];
                }
            });
        });
    };
    // The D of CRUD - Delete operation
    EventRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("DELETE FROM event WHERE id = ?", [id])];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.affectedRows > 0];
                }
            });
        });
    };
    // Custom method to get an event with the creator's username
    EventRepository.prototype.getEventWithCreator = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("\n      SELECT e.*, u.username as creator_username\n      FROM event e\n      JOIN user u ON e.user_id = u.id\n      WHERE e.id = ?\n    ", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows[0]];
                }
            });
        });
    };
    // Custom method to get all events created by a specific user
    EventRepository.prototype.readAllByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("SELECT e.*, u.username as creator_username\n      FROM event e\n      JOIN user u ON e.user_id = u.id\n      WHERE e.user_id = ?", [userId])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    return EventRepository;
}());
exports.default = new EventRepository();
