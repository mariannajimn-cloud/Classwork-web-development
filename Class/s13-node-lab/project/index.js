// index.js - Student Starter Skeleton
// TODO 1: Import built-in Node modules (os, fs/promises, path)
import os from 'os';
import fs from 'fs-extra';
// conts os = require('os');
// TODO 2: Import third-party NPM packages (chalk)
import chalk from 'chalk';

async function generateTelemetryReport() {
    console.log("Initializing Node.js Telemetry Engine...");

    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
        const platform = os.platform();
        const freeMemMB = (os.freemem() / (1024 * 1024)).toFixed(0);
        const uptimeHours = (os.uptime() / 3600).toFixed(2);    // Returns the system uptime in number of seconds.
        const totalMemMB = (os.totalmem() / (1024 * 1024)).toFixed(0);  // Returns the total amount of system memory in bytes as an integer.
        const cpuModel = os.cpus()[0].model;
        const usedMemMB = (totalMemMB - freeMemMB).toFixed(0);


        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        // TODO: Print a colorful status report to the terminal using chalk colors
        console.log("==========================================");
        console.log("         SYSTEM & ENV TELEMETRY           ");
        console.log("==========================================");
        // Print Platform, Free Memory, and Uptime with custom colors
        console.log(`${chalk.bold("OS Platform: ")}      ${chalk.yellow(platform)}`);
        console.log(`${chalk.bold("Free memory: ")}      ${chalk.yellow(freeMemMB)}`);
        console.log(`${chalk.bold("Total memory: ")}      ${chalk.yellow(totalMemMB)}`);
        console.log(`${chalk.bold("Used memory: ")}      ${chalk.yellow(usedMemMB)}`);
        console.log(`${chalk.bold("CPU Model: ")}      ${chalk.yellow(cpuModel)}`);
        console.log(`${chalk.bold("Uptime: ")}      ${chalk.yellow(uptimeHours)}`);


        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
        // ==========================================
        const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | FREEMEM: ${freeMemMB}MB`;
        
        // TODO: Append logEntry to 'telemetry.log' using fs.appendFile()
        console.log("Writing log entry to disk...");

        console.log("Telemetry audit completed successfully!");

    } catch (error) {
        console.error("Telemetry report generation failed:", error.message);
    }
}

// Execute engine
generateTelemetryReport();
