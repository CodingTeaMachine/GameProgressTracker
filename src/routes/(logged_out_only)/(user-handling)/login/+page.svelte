<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { User2, SquareAsterisk } from 'lucide-svelte';

	import FormInput from '$/lib/components/input/FormTextInput.svelte';
	import login_image from '$assets/images/login_image.png';

	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	import { Pages } from '$types/enums/pages';
	import { getToastStore } from '@skeletonlabs/skeleton';

	export let data: PageData;
	export let form: ActionData;

	$: {
		if (form?.errorMessage) {
			openErrorToast(form.errorMessage);
		}
	}

	const { form: registerForm, errors } = superForm(data.form);
	const toastStore = getToastStore();

	function openErrorToast(message: string) {
		toastStore.trigger({ message, timeout: 3000, background: 'variant-filled-error' });
	}
</script>

<div class="flex flex-row justify-center h-[95%]">
	<img src={login_image} alt="login_image" class="rounded-l-[8px] border border-r-0 border-surface-50/10" />
	<div
		class="card flex w-1/4 items-center justify-center rounded-l-none border border-l-0 border-surface-50/10 px-10"
	>
		<div class="-mt-10 w-full">
			<div class="w-100 mb-5 text-center text-xl font-bold uppercase">Login</div>
			<form method="POST" class="mx-auto my-auto" use:enhance>
				<div class="flex flex-col gap-5">
					<FormInput
						bind:value={$registerForm.username}
						label="Username"
						type="text"
						name="username"
						placeholder="John Doe"
						prefixIcon={User2}
						errors={$errors.username}
					/>
					<FormInput
						bind:value={$registerForm.password}
						label="Password"
						type="password"
						name="password"
						placeholder="Password..."
						prefixIcon={SquareAsterisk}
						errors={$errors.password}
					/>
				</div>
				<button
					type="submit"
					class="variant-filled-secondary btn mt-5 inline-block w-full font-bold !text-surface-50"
				>
					Login
				</button>
			</form>

			<div class="mt-5 text-center text-sm">
				<div class="capitalize-first">Don't have an account?</div>
				<a href={Pages.REGISTER} class="capitalize-first inline-block text-primary-500 hover:underline">
					Register one now!
				</a>
			</div>
		</div>
	</div>
</div>
