import React, { useState } from 'react';
import {
    Pressable as RNPressable,
    Text as RNText,
    StyleSheet,
    View as RNView,
    ScrollView as RNScrollView,
    TextInput as RNTextInput,
    Platform,
} from 'react-native';

import type { Dispatch, SetStateAction } from 'react';
import type {
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
    StyleProp,
    TextProps as RNTextProps,
} from 'react-native';

import { useStyleContext } from '../../services/providers/styleProvider';

//#region Atoms
//#region Button
type Props_ButtonStyleGroup = {
    button?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
    pressed?: StyleProp<ViewStyle>;
    disabled?: StyleProp<ViewStyle>;
};
type Props_Button = {
    title?: string;
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    android_ripple?: {
        color?: string;
        borderless?: boolean;
        radius?: number;
        foreground?: boolean;
    };
    variant?: 'primary' | 'secondary' | 'success' | 'error' | 'disabled';
    style?: Props_ButtonStyleGroup;
    textStyle?: StyleProp<TextStyle>;
    children?: React.ReactNode;
};
const style_inner_Button = StyleSheet.create({
    button: {
        backgroundColor: '#1e90ff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressed: {
        opacity: 0.6,
        transform: [{ scale: 0.97 }],
    },
    disabled: {
        opacity: 0.4,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});
export function Button({
    title,
    onPress,
    onLongPress,
    disabled = false,
    android_ripple,
    style = {},
    variant = 'primary',
    children,
}: Props_Button) {
    const { theme } = useStyleContext();

    return (
        <RNPressable
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
            android_ripple={android_ripple}
            style={({ pressed }) => [
                style_inner_Button.button,
                pressed && style_inner_Button.pressed,
                disabled && style_inner_Button.disabled,

                theme?.components.button[variant]?.container ?? {},
                disabled && theme?.components.button.disabled.container,

                style?.button,
                pressed && style?.pressed,
                disabled && style?.disabled,
            ]}
        >
            {children ?? (
                <RNText
                    style={[
                        style_inner_Button.text,
                        theme?.components.button[variant]?.text ?? {},
                        style?.text,
                    ]}
                >
                    {title ?? ''}
                </RNText>
            )}
        </RNPressable>
    );
}

//#endregion

//#region Text
// type TextStyleGroup = {
//     title?: StyleProp<TextStyle>;
//     body?: StyleProp<TextStyle>;
//     label?: StyleProp<TextStyle>;
// };
type TextProps = RNTextProps & {
    variant?: 'title' | 'subtitle' | 'body' | 'label';
    colorVariant?: 'main' | 'primary' | 'secondary' | 'success' | 'error';
    style?: StyleProp<TextStyle>;
};

export function Text({
    variant = 'body',
    colorVariant = 'main',
    style,
    children,
    ...props
}: TextProps) {
    const { theme } = useStyleContext();

    const baseStyle = theme?.components?.text?.[variant] ?? {};
    const color =
        theme?.semantics.colors.text[colorVariant] ??
        theme?.semantics.colors.text.main;

    return (
        <RNText style={[baseStyle, color && { color }, style]} {...props}>
            {children}
        </RNText>
    );
}

//#endregion

//#region Input:string
{
    /* <Input value={"value"} onChange={onChange} style={style}/> */
}
type Props_InputGroup = {
    container?: StyleProp<TextStyle>;
    placeholder?: StyleProp<TextStyle>;
    focused?: StyleProp<ViewStyle>;
    error?: StyleProp<ViewStyle>;
};

type InputProps = {
    type?: 'text' | 'number';
    secureEntry?: boolean;
    value: string;
    name?: string;
    placeholder?: string;
    onChange?: (val: string | number, name?: string | null) => void;
    onFocus?: (...args: unknown[]) => void;
    onBlur?: (...args: unknown[]) => void;
    error?: boolean;
    variant?:
    | 'main'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'disabled';
    style?: Props_InputGroup;
};
const style_inner_Input = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export function Input({
    type = 'text',
    secureEntry = false,
    value,
    name,
    placeholder = '',
    onChange,
    onFocus,
    onBlur,
    error = false,
    style = {},
    variant = 'main',
    ...props
}: InputProps) {
    const { theme } = useStyleContext();
    const [focused, setFocused] = useState(false);

    const handleChange = (val: string) => {
        switch (type) {
            case 'text':
                onChange?.(val, name ?? null);
                break;
            case 'number':
                if (!isNaN(Number(val))) onChange?.(Number(val), name ?? null);
                break;
        }
    };

    const handleBlur = (...args: unknown[]) => {
        setFocused(false);
        onBlur?.(...args);
    };

    const handleFocus = (...args: unknown[]) => {
        setFocused(true);
        onFocus?.(...args);
    };

    const base = theme?.components.input;
    const color =
        theme?.semantics.colors.text[variant] ??
        theme?.semantics.colors.text.main;

    return (
        <RNTextInput
            value={secureEntry ? '•'.repeat(value.length) : value}
            onChangeText={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={base?.placeholder.color}
            style={[
                style_inner_Input.container,
                base?.container,

                focused && base?.focusedBorder,
                error && base?.errorBorder,

                { color },

                style?.container,
                focused && style?.focused,
                error && style?.error,
            ]}
            {...props}
        />
    );
}
//#endregion

//#endregion

//#region Moleculas
//#region Modal
{
    /* 
    <Modal
        isShow={isShow} 
        setIsShow={setIsShow}
        closable={closable}
    >
        content
    </Modal> 
*/
}
type ModalProps = {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
    closable?: boolean;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
};
const style_inner_Modal = StyleSheet.create({
    main: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000cf',
        zIndex: 1000,
    },
    content: {
        minHeight: 0,
        maxHeight: '100%',
    },
});
export function Modal({
    isShow,
    setIsShow,
    closable = true,
    children,
    style = {},
}: ModalProps) {
    const { theme } = useStyleContext();

    const toggleShow = () => {
        if (closable) setIsShow?.((s) => !s);
    };

    if (!isShow) return null;

    return (
        <RNPressable
            onPress={toggleShow}
            style={[
                style_inner_Modal.main,
                theme?.components.modal?.overlay,
                style,
            ]}
        >
            <RNPressable style={[style_inner_Modal.content]} onPress={() => { }}>
                {children}
            </RNPressable>
        </RNPressable>
    );
}
//#endregion

//#region ModalCard
{
    /* 
    <ModalCard 
        isShow={isShow} 
        setIsShow={setIsShow}
    >
        children
    </ModalCard> 
*/
}
type ModalCardProps = {
    isShow: boolean;
    setIsShow: Dispatch<SetStateAction<boolean>>;
    isHasCross?: boolean;
    isScrollable?: boolean;
    closable?: boolean;
    children: React.ReactNode;
    style?: ModalCard_StyleGroupProps;
};
type ModalCard_StyleGroupProps = {
    modal?: ViewStyle;
    wrapper?: ViewStyle;
    card?: ViewStyle;
    content?: ViewStyle;
};
const style_inner_ModalCard = StyleSheet.create({
    wrapper: {
        position: 'relative',
        maxWidth: '100%',
        maxHeight: '100%',
        flex: Platform.OS === 'web' ? 1 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: -32,
        right: 10,
        backgroundColor: 'transparent',
        borderColor: '#00000000',
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 20,
    },
    card: {
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
export function ModalCard({
    isShow,
    setIsShow,
    isHasCross = true,
    isScrollable = false,
    closable = true,
    children,
    style,
}: ModalCardProps) {
    const { theme } = useStyleContext();

    return (
        <Modal
            isShow={isShow}
            setIsShow={setIsShow}
            closable={closable}
            style={[style?.modal]}
        >
            <View style={[style_inner_ModalCard.wrapper, style?.wrapper]}>
                {isHasCross && (
                    <RNPressable
                        style={style_inner_ModalCard.closeButton}
                        onPress={() => setIsShow(false)}
                        hitSlop={10}
                    >
                        <RNText style={style_inner_ModalCard.closeButtonText}>
                            ⛌
                        </RNText>
                    </RNPressable>
                )}
                <Card
                    isScrollable={isScrollable}
                    isAllowHorizontalScroll={false}
                    showsVerticalScrollIndicator={false}
                    style={{
                        card: [
                            style_inner_ModalCard.card,
                            theme?.components.card.container,
                            style?.card,
                        ],
                        content: style?.content ?? {},
                    }}
                >
                    {children}
                </Card>
            </View>
        </Modal>
    );
}
//#endregion

//#region View
{
    /* 
    <View
        isScrollable={isScrollable}
        isAllowHorizontalScroll={isAllowHorizontalScroll}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        style={style}
    ></View> 
*/
}
type ViewProps = React.ComponentProps<typeof RNView> & {
    isScrollable?: boolean;
    isAllowHorizontalScroll?: boolean;
    showsVerticalScrollIndicator?: boolean;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
};
const style_inner_View = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
export function View({
    isScrollable = false,
    isAllowHorizontalScroll = false,
    showsVerticalScrollIndicator = true,
    style = {},
    children,
    ...props
}: ViewProps) {
    return isScrollable ? (
        <RNScrollView
            style={[style_inner_View.container]}
            contentContainerStyle={[style_inner_View.main, style]}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            bounces={true}
            horizontal={isAllowHorizontalScroll}
            {...props}
        >
            {children}
        </RNScrollView>
    ) : (
        <RNView style={[style_inner_View.main, style]} {...props}>
            {children}
        </RNView>
    );
}
//#endregion

//#region Card
type Card_StyleGroupProps = {
    card?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
};
type CardProps = {
    isScrollable?: boolean;
    isAllowHorizontalScroll?: boolean;
    showsVerticalScrollIndicator?: boolean;
    style?: Card_StyleGroupProps;
    children: React.ReactNode;
};
const style_inner_Card = StyleSheet.create({
    card: {
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    content: {
        width: '100%',
    },
});
export function Card({
    isScrollable = false,
    isAllowHorizontalScroll = false,
    showsVerticalScrollIndicator = true,
    style = {},
    children,
    ...props
}: CardProps) {
    const { theme } = useStyleContext();

    const cardTheme = theme?.components.card;

    return (
        <View
            isScrollable={isScrollable}
            isAllowHorizontalScroll={isAllowHorizontalScroll}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            style={[style_inner_Card.card, cardTheme?.container, style?.card]}
            {...props}
        >
            <View
                style={[
                    style_inner_Card.content,
                    cardTheme?.content,
                    style?.content,
                ]}
            >
                {children}
            </View>
        </View>
    );
}
//#endregion

//#endregion
