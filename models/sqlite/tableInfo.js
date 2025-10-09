import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./goals.db');

function inspeccionarTabla(nombreTabla) {
    // 1. Estructura de columnas
    db.all(`PRAGMA table_info(${nombreTabla});`, (err, columnas) => {
        if (err) return console.error("Error en table_info:", err);
        console.log("📦 Estructura de columnas:");
        console.table(columnas);

        // 2. Claves foráneas
        db.all(`PRAGMA foreign_key_list(${nombreTabla});`, (err, claves) => {
            if (err) return console.error("Error en foreign_key_list:", err);
            console.log("🔗 Claves foráneas:");
            console.table(claves);

            // 3. SQL original de creación
            db.get(`SELECT sql FROM sqlite_master WHERE type='table' AND name=?`, [nombreTabla], (err, row) => {
                if (err) return console.error("Error en sqlite_master:", err);
                console.log("🛠️ SQL de creación:");
                console.log(row?.sql || "No se encontró la tabla.");
                
                db.close();
            });
        });
    });
}

// Ejecutar inspección
inspeccionarTabla("goals");