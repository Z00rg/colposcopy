import {DialogTrigger, ModalOverlayProps} from 'react-aria-components';
import {Modal} from './Modal';
import {Dialog} from './Dialog';
import {Button} from './Button';
import {JSX, ReactNode} from "react";

export type UiListButtonAtlasProps = {
    props?: JSX.IntrinsicAttributes & ModalOverlayProps;
    className?: string;
    children: ({ close }: { close: () => void }) => ReactNode;
    nameButton: string;
};

export function UiModal({props, className, children, nameButton, } : UiListButtonAtlasProps) {
    return (
        <div className={className}>
            <DialogTrigger>
                <Button variant="secondary">{nameButton}</Button>
                <Modal {...props}>
                    <Dialog>
                        {({ close }) => children({ close })}
                    </Dialog>
                </Modal>
            </DialogTrigger>
        </div>
    );
}
