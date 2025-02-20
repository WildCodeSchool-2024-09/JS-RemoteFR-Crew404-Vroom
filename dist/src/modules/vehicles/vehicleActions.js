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
var markerRepository_1 = __importDefault(require("../marker/markerRepository"));
// Import access to data
var vehicleRepository_1 = __importDefault(require("./vehicleRepository"));
// The B of BREAD - Browse (Read All) operation
var browse = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicles, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, vehicleRepository_1.default.readAll()];
            case 1:
                vehicles = _a.sent();
                // Respond with the vehicles in JSON format
                res.json(vehicles);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                // Pass any errors to the error-handling middleware
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// The R of BREAD - Read operation
var read = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicleId, vehicle, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                vehicleId = Number(req.params.id);
                return [4 /*yield*/, vehicleRepository_1.default.getVehicleWithOwner(vehicleId)];
            case 1:
                vehicle = _a.sent();
                // If the vehicle is not found, respond with HTTP 404 (Not Found)
                // Otherwise, respond with the vehicle in JSON format
                if (vehicle == null) {
                    res.sendStatus(404);
                }
                else {
                    res.json(vehicle);
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                // Pass any errors to the error-handling middleware
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// The E of BREAD - Edit (Update) operation
var editVehicle = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicleId, updatedVehicle, result, updatedVehicle_1, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                vehicleId = Number.parseInt(req.params.id, 10);
                updatedVehicle = {
                    vehicle_picture: req.body.vehicle_picture,
                    energy: req.body.energy,
                    status: req.body.status,
                    type: req.body.type,
                    location: req.body.location,
                    user_id: req.body.user_id,
                    year: req.body.year,
                    brand: req.body.brand,
                    model: req.body.model,
                };
                return [4 /*yield*/, vehicleRepository_1.default.update(vehicleId, updatedVehicle)];
            case 1:
                result = _a.sent();
                if (!result) return [3 /*break*/, 3];
                return [4 /*yield*/, vehicleRepository_1.default.read(vehicleId)];
            case 2:
                updatedVehicle_1 = _a.sent();
                res.status(200).json({
                    message: "Véhicule mis à jour avec succès",
                    vehicle: updatedVehicle_1,
                });
                return [3 /*break*/, 4];
            case 3:
                res.status(404).json({ message: "Véhicule non trouvé" });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// The A of BREAD - Add (Create) operation
var add = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newVehicle, marker, insertId, createdVehicle, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                newVehicle = {
                    vehicle_picture: req.body.vehicle_picture,
                    energy: req.body.energy,
                    status: req.body.status,
                    type: req.body.type,
                    location: req.body.location,
                    latitude: req.body.coord[1],
                    longitude: req.body.coord[0],
                    user_id: req.user.id,
                    year: req.body.year,
                    brand: req.body.brand,
                    model: req.body.model,
                    isMap: req.body.isMap,
                };
                if (!!newVehicle.isMap) return [3 /*break*/, 2];
                marker = {
                    lat: req.body.coord[1],
                    lng: req.body.coord[0],
                    label: "Type: ".concat(req.body.type, ", Date: ").concat(req.body.date_start, " to ").concat(req.body.date_end),
                    details: req.body.details,
                    user_id: req.user.id,
                };
                return [4 /*yield*/, markerRepository_1.default.createMarker(marker)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                console.info(newVehicle);
                return [4 /*yield*/, vehicleRepository_1.default.create(newVehicle)];
            case 3:
                insertId = _a.sent();
                return [4 /*yield*/, vehicleRepository_1.default.getVehicleWithOwner(insertId)];
            case 4:
                createdVehicle = _a.sent();
                // Respond with HTTP 201 (Created) and the ID of the newly inserted vehicle
                res.status(201).json({
                    message: "Véhicule créé avec succès! 🚗",
                    vehicle: createdVehicle,
                });
                return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                // Pass any errors to the error-handling middleware
                next(err_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// The D of BREAD - Delete operation
var fs = require("node:fs/promises");
var path = require("node:path");
var deleteVehicle = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicleId, vehicle, imagePath, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                vehicleId = Number.parseInt(req.params.id, 10);
                return [4 /*yield*/, vehicleRepository_1.default.read(vehicleId)];
            case 1:
                vehicle = _a.sent();
                if (!vehicle) return [3 /*break*/, 5];
                if (!vehicle.vehicle_picture) return [3 /*break*/, 3];
                imagePath = path.join(__dirname, "..", "..", "..", "uploads", "vehicles", path.basename(vehicle.vehicle_picture));
                return [4 /*yield*/, fs.unlink(imagePath).catch(function (err) {
                        console.error("Erreur lors de la suppression de l'image:", err);
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, vehicleRepository_1.default.delete(vehicleId)];
            case 4:
                result = _a.sent();
                if (result) {
                    res
                        .status(200)
                        .json({ message: "Véhicule et image associée supprimé 💥" });
                }
                else {
                    res.status(404).json({ message: "Véhicule non trouvé 👀" });
                }
                return [3 /*break*/, 6];
            case 5:
                res.status(404).json({ message: "Véhicule non trouvé 👀" });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
// Récupère les véhicules de l'utilisateur connecté
var readUserVehicles = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, vehicles, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                return [4 /*yield*/, vehicleRepository_1.default.readAllByUserId(userId)];
            case 1:
                vehicles = _a.sent();
                res.json(vehicles);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Action pour l'upload d'image
var uploadVehicleImage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicleId, vehicle, oldImagePath, imagePath, result, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                vehicleId = Number(req.params.id);
                // Vérifie si un fichier a été uploadé
                if (!req.file) {
                    res.status(400).json({ message: "Aucun fichier n'a été uploadé." });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, vehicleRepository_1.default.read(vehicleId)];
            case 1:
                vehicle = _a.sent();
                if (!(vehicle === null || vehicle === void 0 ? void 0 : vehicle.vehicle_picture)) return [3 /*break*/, 3];
                oldImagePath = path.join(__dirname, "..", "..", "..", "uploads", "vehicles", path.basename(vehicle.vehicle_picture));
                return [4 /*yield*/, fs.unlink(oldImagePath).catch(function (err) {
                        console.error("Erreur lors de la suppression de l'ancienne image:", err);
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                imagePath = "/uploads/vehicles/".concat(req.file.filename);
                return [4 /*yield*/, vehicleRepository_1.default.update(vehicleId, {
                        vehicle_picture: imagePath,
                    })];
            case 4:
                result = _a.sent();
                if (result) {
                    res.status(200).json({
                        message: "Image uploadée avec succès",
                        vehicle_picture: imagePath,
                    });
                }
                else {
                    res.status(404).json({ message: "Véhicule non trouvé" });
                }
                return [3 /*break*/, 6];
            case 5:
                err_7 = _a.sent();
                next(err_7);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
//Action pour la suppression de l'image
var deleteVehiclePicture = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var vehicleId, vehicle, imagePath, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                vehicleId = Number(req.params.id);
                return [4 /*yield*/, vehicleRepository_1.default.read(vehicleId)];
            case 1:
                vehicle = _a.sent();
                if (!(vehicle === null || vehicle === void 0 ? void 0 : vehicle.vehicle_picture)) return [3 /*break*/, 4];
                imagePath = path.join(__dirname, "..", "..", "..", "uploads", "vehicles", path.basename(vehicle.vehicle_picture));
                // Supprime le fichier physiquement
                return [4 /*yield*/, fs.unlink(imagePath).catch(function (err) {
                        console.error("Erreur lors de la suppression du fichier:", err);
                    })];
            case 2:
                // Supprime le fichier physiquement
                _a.sent();
                // Met à jour le véhicule pour supprimer la référence à l'image
                return [4 /*yield*/, vehicleRepository_1.default.update(vehicleId, { vehicle_picture: null })];
            case 3:
                // Met à jour le véhicule pour supprimer la référence à l'image
                _a.sent();
                res.status(200).json({ message: "Image supprimée avec succès" });
                return [3 /*break*/, 5];
            case 4:
                res.status(404).json({ message: "Véhicule ou image non trouvé" });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_8 = _a.sent();
                next(err_8);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    browse: browse,
    read: read,
    editVehicle: editVehicle,
    add: add,
    deleteVehicle: deleteVehicle,
    readUserVehicles: readUserVehicles,
    uploadVehicleImage: uploadVehicleImage,
    deleteVehiclePicture: deleteVehiclePicture,
};
