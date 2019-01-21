import * as fs from "fs";
import * as path from "path";

export class Util {

    public static async getErrorByLocale(model: string, errorType: string) {
        if (!fs.existsSync(`locale/pt-Br/errors/${model}.json`)) return Util.getUnexpectedError(model, errorType);
        let errorObj = await require(path.resolve(`locale/pt-Br/errors/${model}`));
        return errorObj[errorType] ? errorObj[errorType] : Util.getUnexpectedError(model, errorType);
    }

    public static getUnexpectedError(model: string, errorType: string) {
        return {
            title: "Unexpected error",
            description: `Não foi encontrada uma resposta para o error \"${errorType}\" no modelo \"${model}\"`,
            buttons: [
                {
                    label: "Reportar erro",
                    method: "sendError"
                }
            ],
            type: "unexpectedError"
        }
    }

    public static async getDbErrors(model, errors: object) {
        let ret = {};
        for (let err in errors) {
            ret[err] = await Util.getErrorByLocale(model, errors[err].message);
        }
        return ret;
    }
}