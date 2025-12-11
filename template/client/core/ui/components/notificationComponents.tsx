import { Text, Button, View, ModalCard, Card } from "./interfaceComponents";
import React, { useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useStyleContext } from "../../services/providers/styleProvider";

import type { NotifyItem, DialogItem } from "../../types/notificationTypes";

export function NotifyView({
    queue,
    timeout,
    handleClose
}: {
    queue: NotifyItem[];
    timeout: number;
    handleClose: (id: string) => void;
}) {
    const { theme } = useStyleContext();

    const styles = useMemo(() => StyleSheet.create({
        notifyWrapper: {
            position: 'absolute',
            alignItems: 'flex-start',
            left: 10,
            bottom: 10,
            maxWidth: 500,
        },
    }), [theme]);

    return (
        <View
            isScrollable={false}
            isAllowHorizontalScroll={false}
            showsVerticalScrollIndicator={false}
            style={styles.notifyWrapper}
        >
            {queue.map(item => (
                <NotifyCard
                    key={item.id}
                    item={item}
                    timeout={item?.timeout ?? timeout}
                    handleClose={handleClose}
                />
            ))}
        </View>
    );
}

export function NotifyCard({
    item,
    timeout,
    handleClose,
}: {
    item: NotifyItem;
    timeout: number;
    handleClose: (id: string) => void;
}) {
    const { id, message, header } = item;
    const { theme } = useStyleContext();

    const styles = useMemo(() => StyleSheet.create({
        notifyCard: {
            paddingVertical: theme?.tokens.sizes.spacing.sm ?? 8,
            paddingHorizontal: theme?.tokens.sizes.spacing.md ?? 16,
            shadowColor: '#000', // Fallback as shadow token might not exist
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        }
    }), [theme]);

    useEffect(() => {
        const tm = setTimeout(() => {
            handleClose(id);
        }, timeout * 1000);

        return () => clearTimeout(tm);
    }, []);

    return (
        <Card
            style={{
                card: styles.notifyCard
            }}
        >
            {header && <Text>{header}</Text>}
            <Text>{message}</Text>
        </Card>
    );
}

export function DialogView({
    item,
    handleClose,
}: {
    item: DialogItem;
    handleClose: () => void;
    confirmText?: string;
    cancelText?: string;
}) {
    if (!item) return null;

    const { header, message, actions, resolve } = item;
    const { theme } = useStyleContext();

    const styles = useMemo(() => StyleSheet.create({
        confirmModal: {
            minWidth: 200,
            maxWidth: '100%',
            paddingVertical: 25,
            paddingHorizontal: 10,
        },
        confirmTextArea: {
            maxWidth: '90%',
            gap: 10,
            marginBottom: 30,
        },
        confirmButtonArea: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
        },
        confirmButton: {
            paddingVertical: theme?.tokens.sizes.spacing.xs ?? 5,
            paddingHorizontal: theme?.tokens.sizes.spacing.md ?? 15,
        },
    }), [theme]);

    const handleAction = async (resolveValue: boolean, action?: () => void) => {
        handleClose();
        action?.();
        resolve(resolveValue);
    };

    return (
        <ModalCard
            isShow={true}
            setIsShow={() => null}
            isHasCross={false}
            closable={false}
            style={{
                card: styles.confirmModal
            }}
        >
            <View style={styles.confirmTextArea}>
                {header && <Text
                    colorVariant={'secondary'}
                    variant={'subtitle'}
                >{header}</Text>}
                <Text colorVariant={'secondary'}>{message}</Text>
            </View>
            <View style={styles.confirmButtonArea}>
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        title={action.text}
                        style={{
                            button: styles.confirmButton
                        }}
                        onPress={() => handleAction(action.isResolve, action.action)}
                    />
                ))}
            </View>
        </ModalCard>
    );
}