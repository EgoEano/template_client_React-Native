import React, { createContext, useContext, useReducer, useRef } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ViewStyle,
    StyleProp,
    ScrollView,
} from 'react-native';

//#region Grid
export type GridColumnWeights = readonly number[];

export type GridRenderHeader = (widths: number[]) => React.ReactNode;
export type GridRenderFooter = (widths: number[]) => React.ReactNode;
export type GridRenderRow<T> = (
    row: T,
    index: number,
    widths: number[],
) => React.ReactNode;

export interface GridProps<T> {
    data: readonly T[];
    columns: GridColumnWeights;

    height?: number;

    renderHeader?: GridRenderHeader;
    renderRow: GridRenderRow<T>;
    renderFooter?: GridRenderFooter;

    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;

    isLoading?: boolean;
    emptyText?: string;
}

const style_inner_Grid = StyleSheet.create({
    root: {
        width: '100%',
        flexDirection: 'column',
    },
    header: {
        width: '100%',
    },
    body: {
        flexGrow: 1,
    },
    footer: {
        width: '100%',
    },
    cap: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function computeColumnPercents(weights: readonly number[]): number[] {
    const sum = weights.reduce((a, b) => a + b, 0);
    if (sum === 0) return weights.map(() => 0);
    return weights.map((w) => (w / sum) * 100);
}

export function Grid<T>({
    data,
    columns,
    height,

    renderHeader,
    renderRow,
    renderFooter,

    style,
    contentStyle,

    isLoading = false,
    emptyText = 'No data',
}: GridProps<T>) {
    const columnPercents = React.useMemo(
        () => computeColumnPercents(columns),
        [columns],
    );

    return (
        <View
            style={[
                style_inner_Grid.root,
                height != null && { height, maxHeight: height },
                style,
            ]}
        >
            {/* HEADER */}
            {renderHeader && (
                <View style={style_inner_Grid.header}>
                    {renderHeader(columnPercents)}
                </View>
            )}

            {/* BODY */}
            <ScrollView
                style={style_inner_Grid.body}
                contentContainerStyle={contentStyle}
            >
                {isLoading && (
                    <View style={style_inner_Grid.cap}>
                        <Text>Loading…</Text>
                    </View>
                )}

                {!isLoading && data.length === 0 && (
                    <View style={style_inner_Grid.cap}>
                        <Text>{emptyText}</Text>
                    </View>
                )}

                {!isLoading &&
                    data.map((row, index) =>
                        renderRow(row, index, columnPercents),
                    )}
            </ScrollView>

            {/* FOOTER */}
            {renderFooter && (
                <View style={style_inner_Grid.footer}>
                    {renderFooter(columnPercents)}
                </View>
            )}
        </View>
    );
}
//#endregion

//#region Form
type FormContextType = {
    values: Record<string, unknown>;
    errors: Record<string, boolean>;
    handleChange: (value: unknown, key: string) => void;
    handleSubmit: (options?: unknown) => void;
    handleCancel: (options?: unknown) => void;
};

type FormDataRule =
    | ((value: unknown, data: Record<string, unknown>) => boolean)
    | undefined;
type FormDataRules = Record<string, FormDataRule>;
interface FormProps {
    data?: Record<string, unknown>;
    dataRules?: FormDataRules;
    onSubmit?: (params: {
        data: Record<string, unknown>;
        options?: unknown;
        validation: { success: boolean; errors: Record<string, boolean> };
    }) => void;
    onCancel?: (params: { options?: unknown }) => void;
    onChange?: (params: {
        values: Record<string, unknown>;
        lastChangedKey: string | null;
    }) => unknown;
    isResetOnAction?: boolean;
    children?:
        | React.ReactNode
        | ((args: {
              values: Record<string, unknown>;
              errors: Record<string, boolean>;
              handleChange: (v: unknown, k: string) => void;
              handleSubmit: (options?: unknown) => void;
              handleCancel: (options?: unknown) => void;
          }) => React.ReactNode);
}

type FormAction =
    | {
          type: 'update';
          key: string;
          value: unknown;
      }
    | {
          type: 'set';
          values: Record<string, unknown>;
      };

type FormErrorAction =
    | {
          type: 'update';
          key: string;
          error: boolean;
      }
    | {
          type: 'set';
          errors: Record<string, boolean>;
      };

const formReducer = (state: Record<string, unknown>, action: FormAction) => {
    switch (action.type) {
        case 'update':
            return { ...state, [action.key]: action.value };
        case 'set':
            return { ...action.values };
        default:
            return state;
    }
};

const errorsReducer = (
    state: Record<string, boolean>,
    action: FormErrorAction,
) => {
    switch (action.type) {
        case 'update':
            if (!action.error) {
                const { [action.key]: _, ...rest } = state; // eslint-disable-line @typescript-eslint/no-unused-vars
                return rest;
            }
            return { ...state, [action.key]: true };
        case 'set':
            return { ...action.errors };
        default:
            return state;
    }
};

const FormContentContext = createContext<FormContextType | null>(null);
export const useFormContext = () => useContext(FormContentContext);

export function FormContent({
    data = {},
    dataRules = {},
    onSubmit,
    onCancel,
    onChange,
    isResetOnAction = true,
    children,
}: FormProps) {
    const [values, dispatch] = useReducer(formReducer, data);
    const [errors, dispatchErrors] = useReducer(errorsReducer, {});
    const lastChangedKey = useRef<string | null>(null);

    const handleChange = (value: unknown, key: string) => {
        if (!key) return;

        lastChangedKey.current = key;
        dispatch({ type: 'update', key, value });

        const rule = dataRules[key];
        const isValid = !rule || rule(value, { ...values, [key]: value });

        const isDifferentFromInitial = data[key] !== value;

        dispatchErrors({
            type: 'update',
            key,
            error: !isValid && isDifferentFromInitial,
        });
        onChange?.({
            values: { ...values, [key]: value },
            lastChangedKey: key,
        });
    };

    const validateData = (
        dat: Record<string, unknown>,
        rules: FormDataRules,
    ): {
        success: boolean;
        errors: Record<string, boolean>;
    } => {
        const errorsObj: Record<string, boolean> = {};

        Object.entries(rules).forEach(([k, rule]) => {
            const v = dat[k];

            if (rule && typeof rule === 'function' && !rule(v, dat)) {
                errorsObj[k] = true;
            }
        });
        dispatchErrors({ type: 'set', errors: errorsObj });

        return {
            success: Object.keys(errorsObj).length == 0,
            errors: errorsObj,
        };
    };

    const handleSubmit = (options: unknown) => {
        const validation = validateData(values, dataRules);
        onSubmit?.({
            data: values,
            options,
            validation,
        });
        if (validation.success && isResetOnAction) handleReset();
    };

    const handleCancel = (options: unknown) => {
        onCancel?.({ options });
        if (isResetOnAction) handleReset();
    };

    const handleReset = () => {
        dispatch({ type: 'set', values: data });
        dispatchErrors({ type: 'set', errors: {} });
    };

    return (
        <FormContentContext.Provider
            value={{ values, errors, handleChange, handleSubmit, handleCancel }}
        >
            {typeof children === 'function'
                ? children({
                      values,
                      errors,
                      handleChange,
                      handleSubmit,
                      handleCancel,
                  })
                : children}
        </FormContentContext.Provider>
    );
}

//#endregion
