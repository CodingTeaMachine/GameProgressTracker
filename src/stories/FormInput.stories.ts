import FormInput from "$/lib/components/input/FormTextInput.svelte";
import type { Meta, StoryObj } from "@storybook/svelte";
import { User2 } from "lucide-svelte";

const meta = {
	title: 	'Form/FormInput',
	component: FormInput,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<FormInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
	args: {
		type: 'text',
		label: 'Username',
		placeholder: 'Username...',
		icon: User2
	}
};
