import { randomUUID } from "$lib/client/randomGenerators";
import type { getToastStore } from "@skeletonlabs/skeleton";


function openToast(toastStore: ReturnType<typeof getToastStore>, message: string, timeout: number = 3000, variant: 'error' | 'success', timer: boolean = false): Promise<void> {
	const background = ({error: 'variant-filled-error', success: 'variant-filled-success'} as const)[variant];

	const toastClass = 'toast-' + randomUUID();

	toastStore.trigger({ message, timeout, background, classes: toastClass });

	if(timer) {
		addTimerDisplayToToast(toastClass, message, timeout);
	}

	return new Promise(resolve => {
		setTimeout(() => resolve(), timeout);
	});

}

export function openErrorToast(toastStore: ReturnType<typeof getToastStore>, message: string, timeout: number = 3000, timer: boolean = false): Promise<void> {
	return openToast(toastStore, message, timeout, 'error', timer);
}

export function openSuccessToast(toastStore: ReturnType<typeof getToastStore>, message: string, timeout: number = 3000, timer: boolean = false): Promise<void> {
	return openToast(toastStore, message, timeout, 'success', timer);
}

export function openErrorToastWithTimer(toastStore: ReturnType<typeof getToastStore>, message: string, timeout: number = 3000): Promise<void> {
	return openErrorToast(toastStore, message, timeout, true);
}

export function openSuccessToastWithTimer(toastStore: ReturnType<typeof getToastStore>, message: string, timeout: number = 3000): Promise<void> {
	return openSuccessToast(toastStore, message, timeout, true);
}

function addTimerDisplayToToast(toastClass: string, message: string, timeout: number) {
	setTimeout(() => {
		const currentToast = document.getElementsByClassName(toastClass)[0];
		const textArea = currentToast.getElementsByClassName('text-base')[0];

		//Adds a little countdown circle to the toast
		textArea.innerHTML =
			`<div class="base-text flex flex-row gap-2">
					<div id="countdown" style="--countdown-timer: ${(timeout - 200) / 1000}s">
						<svg>
							<circle r="9" cx="12" cy="12"></circle>
						</svg>
					</div>
					${message}
				</div>`;
	}, 10);
}
