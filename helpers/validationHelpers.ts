import { emailRegExp, inputNameRegExp } from '@/constants/regexp';

enum ValidateTextError {
    required = 'Заполните обязательное поле',
    maxLen = 'Превышено максимальное количество символов: ',
    minLen = 'Минимальное количество символов: ',
    phone = 'Введите корректный номер телефона',
    email = 'Введите корректный email',
    fileSize = 'Размер файла не должен быть 0 КБ и превышать 10 МБ',
    fileName = 'Имя не должно превышать 50 символов. Имя может включать в себя латиницу, кириллицу, -, пробел',
    fileExtension = 'Тип файла должен соответствовать: PNG, JPEG (JPG), TXT, DOC (DOCX), PDF',
    nameSymbol = 'Это поле может включать в себя латиницу, кириллицу, -, пробел',
}

export enum DefaultValidations {
    required,
    maxLen,
    minLen,
    phone,
    email,
    fileSize,
    fileName,
    fileExtension,
    nameSymbol,
}

export type IRule = {
    [key in keyof typeof DefaultValidations]: string | boolean | number;
};

export type IPartialOfDeaultValidation = Partial<{
    [key in keyof typeof DefaultValidations]: string;
}>;

export type IFormState = {
    [key: string]: {
        state: {
            errorsObject: IPartialOfDeaultValidation;
        };
        rules: Partial<IRule>;
    };
};

export type IFormFieldType = string | boolean | File | null;

type IValidationFunctionsReturns = { isValidStatus: boolean; stateInfo: string | number };
export type IValidationFunctions = {
    [key in keyof typeof DefaultValidations]: (...args: any[]) => IValidationFunctionsReturns;
};

const validationFunctions: IValidationFunctions = {
    required(value: string | boolean | File): IValidationFunctionsReturns {
        if (typeof value === 'boolean') {
            return { isValidStatus: value, stateInfo: '' };
        }
        return { isValidStatus: !!value, stateInfo: '' };
    },

    maxLen(value: string, maxLen: number): IValidationFunctionsReturns {
        return { isValidStatus: value.length <= maxLen, stateInfo: maxLen };
    },

    minLen(value: string, minLen: number): IValidationFunctionsReturns {
        return { isValidStatus: value.length > minLen, stateInfo: minLen };
    },

    email(value: string): IValidationFunctionsReturns {
        return {
            isValidStatus: value.length !== 0 && !!emailRegExp.test(String(value).toLowerCase()),
            stateInfo: '',
        };
    },

    nameSymbol(value: string): IValidationFunctionsReturns {
        return {
            isValidStatus: !value.length
                ? true
                : !!inputNameRegExp.test(String(value).toLowerCase()),
            stateInfo: '',
        };
    },

    phone(value: string): IValidationFunctionsReturns {
        return { isValidStatus: value.length !== 0 && value.length === 10, stateInfo: '' };
    },
    fileSize(file: File): IValidationFunctionsReturns {
        return { isValidStatus: file.size < 10000000 && file.size > 0, stateInfo: '' };
    },
    fileName(file: File): IValidationFunctionsReturns {
        return { isValidStatus: file.name.length <= 50, stateInfo: '' };
    },
    fileExtension(file: File): IValidationFunctionsReturns {
        const ValidExtension = ['png', 'jpeg', 'jpg', 'txt', 'doc', 'docx', 'pdf'];
        const extension: string = file.name.split('.').pop()?.toLowerCase() || '';

        return { isValidStatus: ValidExtension.includes(extension), stateInfo: '' };
    },
};

const validationFunctionsForString: Partial<IValidationFunctions> = {
    required: validationFunctions.required,
    phone: validationFunctions.phone,
    email: validationFunctions.email,
    maxLen: validationFunctions.maxLen,
    minLen: validationFunctions.minLen,
    nameSymbol: validationFunctions.nameSymbol,
};

const validationFunctionsForBoolean: Partial<IValidationFunctions> = {
    required: validationFunctions.required,
};

const validationFunctionsForFile: Partial<IValidationFunctions> = {
    required: validationFunctions.required,
    fileSize: validationFunctions.fileSize,
    fileName: validationFunctions.fileName,
    fileExtension: validationFunctions.fileExtension,
};

export function testField<T extends IFormFieldType>(
    field: T,
    rule: Partial<IRule>,
): IPartialOfDeaultValidation {
    const errorsObject: IPartialOfDeaultValidation = {};
    let validationMethods: Partial<IValidationFunctions>;

    if (typeof field === 'boolean') validationMethods = validationFunctionsForBoolean;
    else if (typeof field === 'string') validationMethods = validationFunctionsForString;
    else if (field instanceof File) validationMethods = validationFunctionsForFile;
    else {
        console.error('uncorrect validation type');
        return errorsObject;
    }

    for (let item in rule) {
        if (validationMethods[item])
            // @ts-ignore
            errorsObject[item] = validationMethods[item](field, rule[item]).isValidStatus
                ? errorsObject[item]
                : // @ts-ignore
                  ValidateTextError[item] + validationMethods[item](field, rule[item]).stateInfo;
    }

    return errorsObject;
}

export interface IValidatableComponent {
    form: { [key: string]: IFormFieldType };
    rules: IFormState;
}

export const validateForm = (validatable: IValidatableComponent) => {
    let isValid = true;

    Object.entries(validatable.form).forEach(entry => {
        const [key, value] = [entry[0], entry[1]];

        if (!validatable.rules[key]) return;

        validatable.rules[key].state.errorsObject = testField(value, validatable.rules[key].rules);

        if (Object.values(validatable.rules[key].state.errorsObject).join('')) isValid = false;
    });

    return isValid;
};
