const fs = require("fs");


function getResourceFileDir(filePath) {
    const parts = __dirname.replace(/\\/g, "/").replace(/\/\//g, "/").split("/");
    parts.pop();
    filePath = filePath.replace("../", "");
    parts.push(filePath);
    return parts.join("/")
}
class FileUtil {
    logDir = getResourceFileDir("../log/console.log");
    logHtmlDir = getResourceFileDir("../log/console.html");
    declaration = getResourceFileDir("../data/declaration.txt");
    readDeclaration() {
        return this.readFile(this.declaration)
    }
    readDataFile(name) {
        return this.readFile(getResourceFileDir(`../data/${name}`))
    }
    readJson(path) {
        return JSON.parse(fs.readFileSync(path));
    }
    readFile(path) {
        return fs.readFileSync(path).toString("utf-8").split("\n");
    }

    clearLog() {
        fs.writeFileSync(this.logDir, "");
    }
    writeLog(line) {
        if (!line) {
            fs.appendFileSync(this.logDir, line + "\n");
        } else if (typeof line == "string") {
            fs.appendFileSync(this.logDir, line + "\n");
        } else if (typeof line == "object") {
            fs.appendFileSync(this.logDir, JSON.stringify(line, null, 4) + "\n");
        } else {
            fs.appendFileSync(this.logDir, line + "\n");
        }
    }

    writeFile(path, v) {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, "");
        }
        fs.appendFileSync(path, v);
    }

    clearLogHtml() {
        fs.writeFileSync(this.logDir, "");
    }
    writeLogHtml(line) {
        fs.appendFileSync(this.logHtmlDir, line + "\n");
    }
    deleteFile(path) {
        if (!fs.existsSync(path)) {
            return;
        }
        fs.rmSync(path);
    }
}
module.exports = new FileUtil();
