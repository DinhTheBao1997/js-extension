class Common {
    uppercaseAlphas = Array.from({ length: 26 }, (_, i) =>
        String.fromCodePoint(i + "A".codePointAt(0))
    );

    isEmpty(v) {
        return v === undefined || v === null || v === "";
    }

    isBlank(v) {
        return v === undefined || v === null || v.toString().trim() === "";
    }

    toLowerCamelCase(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/\s+/g, "");
    }

    toUpperCamelCase(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => word.toUpperCase())
            .replace(/\s+/g, "");
    }

    toLowerSnakeCase(str) {
        const value = str
            .split(" ")
            .filter((x) => x)
            .join("_");
        return value.toLowerCase();
    }

    toUpperSnakeCase(str) {
        const value = str
            .split(" ")
            .filter((x) => x)
            .join("_");
        return value.toUpperCase();
    }

    numberToColumnName(n) {
        var ordA = "a".charCodeAt(0);
        var ordZ = "z".charCodeAt(0);
        var len = ordZ - ordA + 1;
        var s = "";
        while (n >= 0) {
            s = String.fromCharCode((n % len) + ordA) + s;
            n = Math.floor(n / len) - 1;
        }
        return s.toUpperCase();
    }

    /**
     * @param {string} value
     * @param {string} search
     * @param {string} replacement
     * @returns
     */
    replaceAll(value, search, replacement) {
        if (this.isEmpty(value)) return "";
        return value.split(search).join(replacement);
    }

    divmodExcel(n) {
        const a = Math.floor(n / 26);
        const b = n % 26;

        return b === 0 ? [a - 1, b + 26] : [a, b];
    }

    /**
     * @param {number} n
     * @returns
     */
    toExcelCol(n) {
        const chars = [];
        let d;
        while (n > 0) {
            [n, d] = this.divmodExcel(n);
            chars.unshift(this.uppercaseAlphas[d - 1]);
        }
        return chars.join("");
    }
    replaceTab(value) {
        return value.replace(new RegExp("    ", "g"), "\t");
    }

    parse_query_string(query) {
        const vars = query.split("&");
        const query_string = {};
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split("=");
            const key = decodeURIComponent(pair.shift());
            const value = decodeURIComponent(pair.join("="));
            if (typeof query_string[key] === "undefined") {
                query_string[key] = value;
            } else if (typeof query_string[key] === "string") {
                var arr = [query_string[key], value];
                query_string[key] = arr;
            } else {
                query_string[key].push(value);
            }
        }
        return query_string;
    }
}
module.exports = new Common();
