import type { Severity } from '@/Share/constants/enums/Severity';
import { reactive, toRefs } from 'vue'

const state = reactive({
	show: false,
    message : '',
    timeout: 3000,
	severity: "",

})

export default () => {

	const resetMessageState = () => {
		state.show = false;
        state.message = "";
	}

	const setMessage = (message: string, severity: Severity) => {
		state.message = message;
		state.severity = severity;
		state.show = true;
	}

	return {
		...toRefs(state),
		resetMessageState,
		setMessage
	}
}
