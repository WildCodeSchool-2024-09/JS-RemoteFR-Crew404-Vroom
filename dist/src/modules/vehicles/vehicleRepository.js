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
var VehicleRepository = /** @class */ (function () {
    function VehicleRepository() {
    }
    // The C of CRUD - Create operation
    VehicleRepository.prototype.create = function (vehicle) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("INSERT INTO vehicle (type, status, energy, vehicle_picture, user_id, location, latitude, longitude, year, brand, model) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                            vehicle.type,
                            vehicle.status,
                            vehicle.energy,
                            vehicle.vehicle_picture,
                            vehicle.user_id,
                            vehicle.location,
                            vehicle.latitude,
                            vehicle.longitude,
                            vehicle.year,
                            vehicle.brand,
                            vehicle.model,
                        ])];
                    case 1:
                        result = (_a.sent())[0];
                        // Return the ID of the newly inserted vehicle
                        return [2 /*return*/, result.insertId];
                }
            });
        });
    };
    // The Rs of CRUD - Read operations
    VehicleRepository.prototype.read = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("SELECT v.*, u.username as owner_username \n      FROM vehicle v\n      JOIN user u ON v.user_id = u.id\n      WHERE v.id = ?", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        // Return the first row of the result, which represents the vehicle
                        return [2 /*return*/, rows[0]];
                }
            });
        });
    };
    VehicleRepository.prototype.readAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("\n      SELECT v.*, u.username as owner_username \n      FROM vehicle v\n      JOIN user u ON v.user_id = u.id\n    ")];
                    case 1:
                        rows = (_a.sent())[0];
                        // Return the array of vehicles
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    // The U of CRUD - Update operation
    VehicleRepository.prototype.update = function (id, vehicleUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var updateFields, updateValues, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateFields = Object.entries(vehicleUpdate)
                            .filter(function (_a) {
                            var key = _a[0], value = _a[1];
                            return value !== undefined && key !== "location";
                        })
                            .map(function (_a) {
                            var key = _a[0], _ = _a[1];
                            return "".concat(key, " = ?");
                        })
                            .join(", ");
                        updateValues = Object.entries(vehicleUpdate)
                            .filter(function (_a) {
                            var key = _a[0], value = _a[1];
                            return value !== undefined && key !== "location";
                        })
                            .map(function (_a) {
                            var _ = _a[0], value = _a[1];
                            return value;
                        });
                        if (vehicleUpdate.vehicle_picture !== undefined) {
                            updateFields += ", vehicle_picture = ?";
                            updateValues.push(vehicleUpdate.vehicle_picture);
                        }
                        updateValues.push(id);
                        return [4 /*yield*/, client_1.default.query("UPDATE vehicle SET ".concat(updateFields, " WHERE id = ?"), updateValues)];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.affectedRows > 0];
                }
            });
        });
    };
    // The D of CRUD - Delete operation
    VehicleRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("DELETE FROM vehicle WHERE id = ?", [id])];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result.affectedRows > 0];
                }
            });
        });
    };
    // Custom method to get an vehicle with the owner's username
    VehicleRepository.prototype.getVehicleWithOwner = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("\n      SELECT v.*, u.username as owner_username\n      FROM vehicle v\n      JOIN user u ON v.user_id = u.id\n      WHERE v.id = ?\n    ", [id])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows[0]];
                }
            });
        });
    };
    // Custom method to get all vehicles owned by a specific user
    VehicleRepository.prototype.readAllByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client_1.default.query("SELECT v.*, u.username as owner_username\n      FROM vehicle v\n      JOIN user u ON v.user_id = u.id\n      WHERE v.user_id = ?", [userId])];
                    case 1:
                        rows = (_a.sent())[0];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    return VehicleRepository;
}());
exports.default = new VehicleRepository();
