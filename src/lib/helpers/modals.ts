import type {ModalSettings, ModalStore} from '@skeletonlabs/skeleton';

export class Modals {

	private static __modalStore: ModalStore;

	public static confirm(title:string = 'Confirm', body:string = ''): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			const modal: ModalSettings = {
				type: 'confirm',
				title,
				body,
				response: (result: boolean) => result ? resolve(result) : reject(result),
			};
			this.__modalStore.trigger(modal);
		});
	}

	public static setModalStore(modalStore: ModalStore) {
		this.__modalStore = modalStore;
	}

}
