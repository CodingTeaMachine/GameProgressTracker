<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { User2, SquareAsterisk, AtSign } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { getToastStore } from '@skeletonlabs/skeleton';

	import FormInput from '$/lib/components/input/FormTextInput.svelte';
	import login_image from '$assets/images/login_image.png';

	import type { ActionData, PageData } from './$types';

	import { Pages } from '$types/enums/pages';

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

<img src={login_image} alt="login_image" class="rounded-l-[8px] border border-r-0 border-surface-50/10" />
<div class="card flex w-1/4 items-center justify-center rounded-l-none border border-l-0 border-surface-50/10 px-10">
	<div class="-mt-10 w-full">
		<div class="w-100 mb-5 text-center text-xl font-bold uppercase">Register</div>
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
					bind:value={$registerForm.email}
					label="E-Mail"
					type="text"
					name="email"
					placeholder="John@doe.com"
					prefixIcon={AtSign}
					errors={$errors.email}
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
				<FormInput
					bind:value={$registerForm.confirmPassword}
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					placeholder="Password..."
					prefixIcon={SquareAsterisk}
					errors={$errors.confirmPassword}
				/>
			</div>
			<button type="submit" class="btn !text-surface-50 font-bold variant-filled-secondary mt-5 inline-block w-full"> Register </button>
		</form>

		<div class="mt-5 text-center text-sm">
			<div class="capitalize-first">Already have an account?</div>
			<a href={Pages.LOGIN} class="capitalize-first inline-block text-primary-500 hover:underline"> Log in! </a>
		</div>
	</div>
</div>
